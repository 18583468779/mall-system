import { WX_PAY_CONFIG } from "../../config/wxConfig";
import WxPay from "wechatpay-node-v3"; // 引入微信支付库
import OrdersModel from "../decormodel/orders";
import { Context, Middleware } from "koa";
import { sequelize } from "../BaseDao";

export enum ChannelType {
  wechat = "wechat",
  alipay = "alipay",
}
export enum StatusType {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SUCCESS = "SUCCESS",
  CLOSED = "CLOSED",
  REFUNDED = "REFUNDED",
}
class OrdersService {
  static ordersService: OrdersService = new OrdersService();
  pay: WxPay;
  constructor() {
    // 初始化微信支付实例
    this.pay = new WxPay({
      appid: WX_PAY_CONFIG.appid,
      mchid: WX_PAY_CONFIG.mchid,
      serial_no: WX_PAY_CONFIG.serial_no,
      publicKey: WX_PAY_CONFIG.publicKey, // 可选（回调验证用）
      privateKey: WX_PAY_CONFIG.privateKey,
      key: WX_PAY_CONFIG.apiV3Key, // APIv3密钥
    });
  }
  async createPayment(
    userId: number,
    productInfo: {
      type: "vip" | "file" | "bundle";
      amount: number;
      originalAmount?: number;
      isbn?: number;
      description: string;
    },
    channel: ChannelType
  ) {
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

    const result: any = await this.pay.transactions_native(params);
    return {
      code_url: result.data.code_url,
      out_trade_no: params.out_trade_no,
    };
  }
  // 自定义回调中间件
  wechatNotifyMiddleware(): Middleware {
    return async (ctx: Context, next: () => Promise<any>) => {
      try {
        // 1. 获取微信回调头信息
        const headers = ctx.headers;
        const signature = headers["wechatpay-signature"] as string;
        const timestamp = headers["wechatpay-timestamp"] as string;
        const nonce = headers["wechatpay-nonce"] as string;
        const serial = headers["wechatpay-serial"] as string;

        // 2. 获取原始请求体
        const rawBody = ctx.request.body;

        // 3. 验证签名
        const isValid = await this.pay.verifySign({
          timestamp,
          nonce,
          body: rawBody,
          serial,
          signature,
          apiSecret: WX_PAY_CONFIG.apiV3Key,
        });

        if (!isValid) {
          ctx.status = 403;
          ctx.body = { code: "SIGNATURE_INVALID" };
          return;
        }

        // 4. 解密数据
        const encryptedData = ctx.request.body;
        const decrypted = this.pay.decipher_gcm<any>(
          encryptedData.resource.ciphertext,
          encryptedData.resource.associated_data,
          encryptedData.resource.nonce,
          WX_PAY_CONFIG.apiV3Key
        );

        // 5. 处理业务逻辑
        ctx.state.wechatData = decrypted; // 将解密数据存入上下文
        await this.handlePaymentNotify(decrypted);

        // 6. 返回成功响应
        ctx.status = 200;
        ctx.body = { code: "SUCCESS" };
      } catch (err) {
        console.error("回调处理失败:", err);
        ctx.status = 500;
        ctx.body = { code: "SYSTEM_ERROR" };
      }
      await next();
    };
  }
  private async handlePaymentNotify(data: any) {
    const outTradeNo = data.out_trade_no;
    console.log("收到支付通知:", data);

    // 事务处理
    const transaction = await sequelize.transaction();
    try {
      const order = await OrdersModel.findOne({
        where: { outTradeNo },
        lock: true,
        transaction,
      });

      if (!order) {
        console.error("订单不存在:", outTradeNo);
        return;
      }

      if (order.status === "closed") {
        console.log("订单已处理过:", outTradeNo);
        return;
      }
      let param = {
        status: data.trade_state,
        paymentData: data,
        paidAt: new Date(data.success_time),
      };
      await order.update(param, { transaction });

      await transaction.commit();
      console.log("订单状态更新成功:", outTradeNo);
    } catch (err) {
      await transaction.rollback();
      console.error("订单更新失败:", err);
      throw err;
    }
  }
  async queryWechatPayment(orderNo: string) {
    try {
      const result = await this.pay.query({ out_trade_no: orderNo });
      return this.parsePaymentStatus(result);
    } catch (error) {
      console.error("微信支付查询失败:", error);
      throw new Error("支付状态查询失败");
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
  private async createAlipayPayment(order: any) {
    // 调用支付宝接口
  }
}
export default OrdersService.ordersService;
// 获取客户端IP（示例实现）
function getClientIp(): string {
  // 实际项目中应从请求上下文中获取
  return "127.0.0.1";
}
