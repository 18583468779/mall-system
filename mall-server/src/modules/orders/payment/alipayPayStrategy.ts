// src/common/payment/AlipayPayStrategy.ts
import { AlipaySdk } from "alipay-sdk";
import { Context } from "koa";
import {
  IPaymentStrategy,
  PaymentResult,
  QueryResult,
} from "./paymentStrategy";
import { ALI_PAY_CONFIG } from "../../../config/alipayConfig";

export class AlipayPayStrategy {
  private sdk: AlipaySdk;

  constructor() {
    let params: any = {
      appId: ALI_PAY_CONFIG.appid,
      privateKey: ALI_PAY_CONFIG.privateKey,
      alipayPublicCertPath: ALI_PAY_CONFIG.alipayPublicCertPath,
      appCertPath: ALI_PAY_CONFIG.appCertPath,
      alipayRootCertPath: ALI_PAY_CONFIG.alipayRootCertPath,
      gateway: ALI_PAY_CONFIG.gateway,
      signType: "RSA2",
      charset: "utf-8",
      version: "1.0",
      timeout: 5000,
      camelcase: true,
    };
    this.sdk = new AlipaySdk(params);
  }

  async createPayment(order: any): Promise<PaymentResult> {
    try {
      const bizContent = {
        subject: order.description,
        out_trade_no: order.outTradeNo,
        total_amount: (order.totalFee / 100).toFixed(2),
        product_code: "FAST_INSTANT_TRADE_PAY",
        notify_url: ALI_PAY_CONFIG.notifyUrl,
      };

      const result = await this.sdk.pageExec("alipay.trade.page.pay", {
        bizContent,
        method: "POST",
      });

      return {
        pageUrl: result as string,
        outTradeNo: order.outTradeNo,
      };
    } catch (error) {
      console.error("支付宝支付创建失败:", error);
      throw new Error("支付宝支付创建失败");
    }
  }

  getNotifyMiddleware() {
    return async (ctx: Context, next: () => Promise<any>) => {
      try {
        const verified = this.sdk.checkNotifySign({
          params: ctx.request.body,
          method: "POST",
          charset: "utf-8",
        });

        if (!verified) {
          ctx.status = 403;
          ctx.body = { code: "SIGNATURE_INVALID", message: "签名验证失败" };
          return;
        }

        ctx.state.paymentData = ctx.request.body;
        await next();
      } catch (error) {
        console.error("支付宝回调验证失败:", error);
        ctx.status = 500;
        ctx.body = { code: "SYSTEM_ERROR", message: "系统异常" };
      }
    };
  }

  async queryOrder(outTradeNo: string): Promise<QueryResult> {
    try {
      const result = await this.sdk.exec("alipay.trade.query", {
        bizContent: { out_trade_no: outTradeNo },
      });

      return {
        paid: result.trade_status === "TRADE_SUCCESS",
        status: result.trade_status,
        data: result,
      };
    } catch (error) {
      console.error("支付宝订单查询失败:", error);
      throw new Error("支付宝订单查询失败");
    }
  }
}
