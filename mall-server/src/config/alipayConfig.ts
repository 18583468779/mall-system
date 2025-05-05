import fs from "fs";
import path from "path";

const certDir = path.join(__dirname, "../certs/alipay");

// 验证文件是否存在
const checkFileExists = (filePath: string, fileName: string) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`证书文件 ${fileName} 缺失！路径：${filePath}`);
  }
};

// 支付宝证书路径检查
const privateKeyPath = path.join(certDir, "privatekey.pem");
const alipayRootCertPath = path.join(certDir, "alipayRootCert.crt");
const alipayPublicCertPath = path.join(certDir, "alipayCertPublicKey_RSA2.crt");
const appCertPath = path.join(certDir, "appCertPublicKey.crt");

checkFileExists(privateKeyPath, "privatekey.pem");
checkFileExists(alipayRootCertPath, "alipayRootCert.crt");
checkFileExists(alipayPublicCertPath, "alipayCertPublicKey_RSA2.crt");
checkFileExists(appCertPath, "appCertPublicKey.crt");

export const ALI_PAY_CONFIG = {
  appid: "2021005145697672",
  privateKey: privateKeyPath, // ✅ 传递路径字符串
  alipayRootCertPath: alipayRootCertPath, // ✅ 路径
  alipayPublicCertPath: alipayPublicCertPath, // ✅ 路径
  appCertPath: appCertPath, // ✅ 路径
  notifyUrl: "http://350fb10a.r39.cpolar.top/dang/ordersmodule/alipay/notify",
  gateway: "https://openapi.alipay.com/gateway.do",
};
