import { WX_PAY_CONFIG } from "../../config/wxConfig";
import WxPay from "wechatpay-node-v3"; // 引入微信支付库

const pay = new WxPay({
  appid: WX_PAY_CONFIG.appid,
  mchid: WX_PAY_CONFIG.mchid,
  serial_no: WX_PAY_CONFIG.serial_no,
  publicKey: WX_PAY_CONFIG.publicKey, // 可选（回调验证用）
  privateKey: WX_PAY_CONFIG.privateKey,
  key: WX_PAY_CONFIG.apiV3Key, // APIv3密钥
});

export const createNativeOrder = async (
  amount: number,
  description: string
) => {
  const params = {
    description,
    out_trade_no: `ORDER_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 8)}`,
    notify_url: WX_PAY_CONFIG.notify_url,
    amount: {
      total: amount,
      currency: "CNY" as const,
    },
    scene_info: {
      payer_client_ip: getClientIp(), // 需要实现获取客户端IP的逻辑
    },
  };

  const result: any = await pay.transactions_native(params);
  return {
    code_url: result.data.code_url,
    out_trade_no: params.out_trade_no,
  };
};

// 获取客户端IP（示例实现）
function getClientIp(): string {
  // 实际项目中应从请求上下文中获取
  return "127.0.0.1";
}
