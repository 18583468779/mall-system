import fs from "fs";
import path from "path";

// 获取证书绝对路径
const certDir = path.join(__dirname, "../certs/alipay"); // 根据实际位置调整层级

export const ALI_PAY_CONFIG = {
  appid: "2021005145697672", // 小程序的appid
  privateKey: fs.readFileSync(path.join(certDir, "private-key.pem"), "ascii"), // 私钥文件路径
  // 传入支付宝根证书、支付宝公钥证书和应用公钥证书。
  alipayRootCertPath: fs.readFileSync(path.join(certDir, "alipayRootCert.crt")),
  alipayPublicCertPath: fs.readFileSync(
    path.join(certDir, "alipayCertPublicKey_RSA2.crt")
  ),
  appCertPath: fs.readFileSync(path.join(certDir, "appCertPublicKey.crt")),
};
