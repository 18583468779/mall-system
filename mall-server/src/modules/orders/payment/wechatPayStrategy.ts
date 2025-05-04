// src/common/payment/WechatPayStrategy.ts
import WxPay from "wechatpay-node-v3";
import { Context, Middleware } from "koa";
import ordersService from "../service";
import { WX_PAY_CONFIG } from "../../../config/wxConfig";

class WechatPayStrategy {
  static wechatPayStrategy: WechatPayStrategy = new WechatPayStrategy();
  pay: WxPay;

  constructor() {
    this.pay = new WxPay({
      appid: WX_PAY_CONFIG.appid,
      mchid: WX_PAY_CONFIG.mchid,
      serial_no: WX_PAY_CONFIG.serial_no,
      publicKey: WX_PAY_CONFIG.publicKey,
      privateKey: WX_PAY_CONFIG.privateKey,
      key: WX_PAY_CONFIG.apiV3Key,
    });
  }

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
        await ordersService.handlePaymentNotify(decrypted);

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
}

export default WechatPayStrategy.wechatPayStrategy;
