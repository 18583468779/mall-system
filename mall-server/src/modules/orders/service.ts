import { WX_PAY_CONFIG } from "../../config/wxConfig";
import OrdersModel from "../decormodel/orders";
import { Middleware } from "koa";
import { sequelize } from "../BaseDao";
import UserinfoModel from "../../modules/decormodel/Userinfo";
import RoleModel from "../decormodel/role";
import { Op } from "sequelize";
import {
  ChannelType,
  ProductInfo,
  StatusType,
} from "./payment/paymentStrategy";
import wechatPayStrategy from "./payment/wechatPayStrategy";
import { AlipayPayStrategy } from "./payment/alipayPayStrategy";

class OrdersService {
  static ordersService: OrdersService = new OrdersService();

  constructor() {}
  async createPayment(
    userId: number,
    productInfo: ProductInfo,
    channel: ChannelType
  ) {
    // 创建订单后设置30分钟过期
    const TIMEOUT_MINUTES = 30;
    // 1. 基础校验
    if (productInfo.amount <= 0) {
      throw new Error("支付金额必须大于0");
    }

    let params: any = {
      userId,
      productType: productInfo.type,
      totalFee: productInfo.amount,
      originalFee: productInfo.originalAmount || productInfo.amount,
      currency: "CNY",
      status: StatusType.PENDING,
      paymentChannel: channel,
      description: productInfo.description,
      isbn: productInfo.isbn || null,
      paymentData: {},
      outTradeNo: this.generateOutTradeNo(),
      expireTime: new Date(Date.now() + TIMEOUT_MINUTES * 60 * 1000),
    };
    // 2. 创建本地订单
    const order = await OrdersModel.create(params);
    const orderData = order.get({ plain: true }); // 获取原始数据
    // 3. 调用支付平台接口
    try {
      const paymentResult: any = await this.createChannelPayment(
        orderData,
        channel
      );

      // 4. 更新支付信息
      await order.update({
        paymentData: paymentResult,
        outTradeNo: paymentResult.out_trade_no,
      });
      // 添加定时任务扫描过期订单
      setInterval(async () => {
        await order.update(
          { status: StatusType.CLOSED },
          {
            where: {
              status: StatusType.PENDING,
            },
          }
        );
      }, 5 * 60 * 1000); // 每5分钟检查一次
      return {
        qrcodeUrl: paymentResult.code_url,
        outTradeNo: orderData.outTradeNo,
      };
    } catch (error) {
      // 支付失败时更新订单状态
      await order.update({ status: "closed" });
      throw error;
    }
  }
  private generateOutTradeNo(): string {
    // 生成订单号的逻辑
    return `ORD${Date.now()}${Math.random()
      .toString(36)
      .substr(2, 6)
      .toUpperCase()}`;
  }
  private async createChannelPayment(order: OrdersModel, channel: ChannelType) {
    // 根据支付渠道创建支付对象
    switch (channel) {
      case ChannelType.wechat:
        return this.createWechatPayment(order);
      case ChannelType.alipay:
        return this.createAlipayPayment(order);
      default:
        throw new Error("暂不支持的支付渠道");
    }
  }
  private async createWechatPayment(order: any) {
    // 调用微信支付接口
    const params = {
      description: order.description,
      out_trade_no: order.outTradeNo,
      notify_url: WX_PAY_CONFIG.notify_url,
      amount: {
        total: order.totalFee,
        currency: "CNY" as const,
      },
      scene_info: {
        payer_client_ip: getClientIp(), // 需要实现获取客户端IP的逻辑
      },
    };

    const result: any = await wechatPayStrategy.pay.transactions_native(params);
    return {
      code_url: result.data.code_url,
      out_trade_no: params.out_trade_no,
    };
  }
  // 自定义微信回调中间件
  wechatNotifyMiddleware(): Middleware {
    return wechatPayStrategy.wechatNotifyMiddleware();
  }
  alipayNotifyMiddleware(): Middleware {
    return new AlipayPayStrategy().getNotifyMiddleware();
  }
  public async handlePaymentNotify(data: any) {
    console.log("开始处理回调，订单号:", data.out_trade_no);
    console.log("回调数据:", JSON.stringify(data, null, 2));
    const transaction = await sequelize.transaction();
    try {
      const order = await OrdersModel.findOne({
        where: { outTradeNo: data.out_trade_no },
        lock: transaction.LOCK.UPDATE,
        transaction,
        include: [
          {
            model: UserinfoModel,
            attributes: ["userid", "roleId"],
          },
        ],
      });
      if (!order) {
        throw new Error("订单不存在");
      }
      let orderData = order.get({ plain: true }); // 获取原始数据
      // 幂等性检查：已处理订单直接返回
      if (
        [StatusType.SUCCESS, StatusType.REFUNDED].includes(
          orderData.status as any
        )
      ) {
        await transaction.commit();
        console.log("事务提交成功，订单状态:", order.status);
        // 提交后二次验证
        const updatedUser = await UserinfoModel.findByPk(orderData.userId);
        console.log("用户最新角色:", updatedUser?.roleId);
        return;
      }

      // 状态转换安全处理
      const statusMap: Record<string, StatusType> = {
        SUCCESS: StatusType.SUCCESS,
        REFUND: StatusType.REFUNDED,
        CLOSED: StatusType.CLOSED,
      };

      await order.update(
        {
          status: statusMap[data.trade_state] || StatusType.CLOSED,
          paymentData: data,
        },
        { transaction }
      );
      // 3.vip套餐处理
      console.log(
        "order.statusorder.statusorder.status",
        orderData.status,
        orderData.productType
      );
      if (data.trade_state === "SUCCESS" && orderData.productType === "vip") {
        console.log("满足VIP升级条件，开始处理");
        await this.upgradeToVip(orderData.userId, transaction);
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      console.error("事务处理失败:", err);
    }
  }

  async queryWechatPayment(orderNo: string) {
    try {
      // 先查询本地数据库
      const order = await OrdersModel.findOne({
        where: { outTradeNo: orderNo },
      });

      if (!order) {
        return { paid: false, status: "NOT_FOUND" };
      }

      // 如果本地已标记成功直接返回
      if (order.status === StatusType.SUCCESS) {
        return { paid: true, status: order.status };
      }

      // 调用微信接口查询真实状态
      const result = await wechatPayStrategy.pay.query({
        out_trade_no: orderNo,
      });
      const paymentStatus = this.parsePaymentStatus(result);
      // 同步状态到本地
      if (paymentStatus.paid && order.status !== StatusType.SUCCESS) {
        await order.update({
          status: StatusType.SUCCESS,
          paymentData: result,
        });
        // TODO: 支付成功，用户角色设置为VIP
      }

      return paymentStatus;
    } catch (error: any) {
      // 微信订单不存在时关闭本地订单
      if (error.response?.status === 404) {
        await this.closeExpiredOrder(orderNo);
        return { paid: false, status: "CLOSED" };
      }
      throw error;
    }
  }

  private parsePaymentStatus(result: any) {
    const tradeState = result.trade_state || "UNKNOWN";
    const successStates = ["SUCCESS", "ACCEPT"];

    return {
      paid: successStates.includes(tradeState),
      status: tradeState,
      detail: result,
    };
  }
  async closeExpiredOrder(orderNo: string) {
    const transaction = await sequelize.transaction();
    try {
      const order = await OrdersModel.findOne({
        where: { outTradeNo: orderNo },
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (order && order.status === StatusType.PENDING) {
        await order.update({ status: StatusType.CLOSED }, { transaction });
      }

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  private async upgradeToVip(userId: number, transaction: any) {
    const user = await UserinfoModel.findByPk(userId, {
      transaction,
      raw: true,
      lock: transaction.LOCK.UPDATE, // 添加行级锁
    });

    if (!user) throw new Error(`用户 ${userId} 不存在`);

    const vipRole = await RoleModel.findOne({
      where: { permissions: 2 },
      raw: true,
      transaction,
    });

    if (!vipRole) throw new Error("VIP角色未配置");
    console.log("当前用户角色:", user.roleId, "目标角色:", vipRole?.roleId);

    // 角色已匹配时跳过更新
    if (user.roleId === vipRole?.roleId) {
      console.log(`用户 ${userId} 已是VIP，无需更新`);
      return;
    }

    const [affected] = await UserinfoModel.update(
      { roleId: vipRole.roleId },
      {
        where: {
          userid: userId,
          roleId: { [Op.ne]: vipRole.roleId }, // 仅更新非VIP用户
        },
        transaction,
      }
    );

    if (affected === 0) {
      console.error("更新失败，可能原因：", {
        userIdExists: !!user,
        currentRole: user.roleId,
        targetRole: vipRole.roleId,
      });
      throw new Error("更新条件不满足");
    }
  }

  private async createAlipayPayment(order: any) {
    const alipayStrategy = new AlipayPayStrategy();
    return alipayStrategy.createPayment({
      outTradeNo: order.outTradeNo,
      description: order.description,
      totalFee: order.totalFee,
    });
  }
}
export default OrdersService.ordersService;
// 获取客户端IP（示例实现）
function getClientIp(): string {
  // 实际项目中应从请求上下文中获取
  return "127.0.0.1";
}
