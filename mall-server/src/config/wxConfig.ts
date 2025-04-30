import fs from "fs";
import path from "path";

// 获取证书绝对路径
const certDir = path.join(__dirname, "../certs"); // 根据实际位置调整层级

export const WX_PAY_CONFIG = {
  appid: "wxe9d6a19d79282c9b", // 小程序的appid
  mchid: "1715657600", // 商户号
  apiV3Key: "k4iBbH2ehGer0yngDNdCR6ifrNEv4uzF", // API V3密钥
  serial_no: "4379F439E1526A347DF8EA92DB2BA4ABDBB6B2B6", // 证书序列号
  privateKey: fs.readFileSync(path.join(certDir, "apiclient_key.pem")), // 私钥文件路径
  publicKey: fs.readFileSync(path.join(certDir, "pub_key.pem")), // 公钥文件路径
  // notify_url: "https://www.diamaxiaoku.com/wechat/notify", // 支付回调地址
  notify_url: "http://a7fb2f3.r39.cpolar.top/dang/ordersmodule/wechat/notify", // 支付回调地址 本地内网穿透
};
