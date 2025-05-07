import fs from "fs";
import path from "path";

const certDir = path.join(__dirname, "../certs/alipay");

const isDev = process.env.NODE_ENV === "dev";

export const ALI_PAY_CONFIG = {
  appid: "2021005145697672",
  alipayPublicKey: fs.readFileSync(
    path.join(certDir, "alipayPublicKey.pem"),
    "ascii"
  ),
  privateKey: fs.readFileSync(path.join(certDir, "privatekey.pem"), "ascii"), // 关键修复点
  gateway: "https://openapi.alipay.com/gateway.do",
  notify_url: isDev
    ? "http://6e034ea4.r39.cpolar.top/dang/ordersmodule/alipay/notify"
    : "https://www.diamaxiaoku.com/dang/ordersmodule/alipay/notify", // 支付回调地址 本地内网穿透
};
