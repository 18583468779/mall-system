import { WX_PAY_CONFIG } from "../../config/wxConfig";
import WxPay from "wechatpay-node-v3"; // 引入微信支付库
import OrdersModel from "../decormodel/orders";

export enum ChannelType {
  wechat = "wechat",
  alipay = "alipay",
}

class OrdersService {
  static ordersService: OrdersService = new OrdersService();
  pay: any;
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
      status: "pending",
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
      out_trade_no: `ORDER_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 8)}`,
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
  wechatNotifyMiddleware() {
    return this.pay.notifyMiddleware().on("error", (err: any) => {
      console.error("微信回调中间件错误:", err);
    });
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
