import fs from "fs";
import path from "path";

const certDir = path.join(__dirname, "../certs/alipay");

export const ALI_PAY_CONFIG = {
  appid: "2021005145697672",
  alipayPublicKey: fs.readFileSync(
    path.join(certDir, "alipayPublicKey.pem"),
    "ascii"
  ),
  privateKey: fs.readFileSync(path.join(certDir, "privatekey.pem"), "ascii"), // 关键修复点
  gateway: "https://openapi.alipay.com/gateway.do",
  notifyUrl: "http://350fb10a.r39.cpolar.top/dang/ordersmodule/alipay/notify",
};
