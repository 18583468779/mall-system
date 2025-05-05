import { Context } from "koa";

export interface IPaymentStrategy {
  createPayment(order: any): Promise<PaymentResult>;
  getNotifyMiddleware(ctx: Context): Promise<NotifyResult>;
  queryOrder(outTradeNo: string): Promise<QueryResult>;
}

export type PaymentResult = {
  codeUrl?: string;
  pageUrl?: string;
  code_url?: string;
  outTradeNo: string;
};

export type NotifyResult = {
  success: boolean;
  outTradeNo: string;
  totalAmount: number;
};

export type QueryResult = {
  paid: boolean;
  status: string;
  data?: any;
};

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

export type ProductInfo = {
  type: "vip" | "file" | "bundle";
  amount: number;
  originalAmount?: number;
  isbn?: number;
  description: string;
};

export type OrderEntity = {
  outTradeNo: string;
  totalFee: number;
  description: string;
  userId: number;
  productType: string;
};
