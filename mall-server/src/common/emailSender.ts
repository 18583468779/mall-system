/**
 *  邮箱登录实现
 *
 */
import nodemailer from "nodemailer";
import config from "../config/config";
import redisUtil from "../common/RedisUtil";
// 邮箱客户端配置
export const transporter = nodemailer.createTransport({
  service: config.email.service, // 使用内置传输发送邮件
  port: config.email.port, // SMTP 端口
  secure: config.email.secure, // 使用了 SSL
  auth: {
    user: config.email.user, // 用来发送邮件的邮箱账户
    pass: config.email.pass, // QQ开启 IMAP/SMTP服务后获取的授权码
  },
});

class EmailService {
  /**
   * @description: 发送验证码
   * @param {string} email 邮箱地址
   * @return code 验证码
   */

  static async sendVerifyCode(email: string): Promise<string> {
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0"); // 生成6位随机验证码
    const mailOptions = {
      from: `代码小库 <${config.email.user}>`, // 发送方邮箱地址
      to: email, // 接收方邮箱地址
      subject: "登录验证码", // 邮件主题
      text: `您的登录验证码是：${code},有效期10分钟`, // 邮件内容
    };
    await redisUtil.set(email, code); // 将验证码存入Redis，有效期为10分钟
    await transporter.sendMail(mailOptions); // 发送邮件
    return code;
  }
  /**
   * @description: 验证验证码是否正确
   * @param {string} email 邮箱地址
   * @param {string} code 验证码
   * @return {Promise<boolean>} 是否验证通过
   */
  static async verifyCode(email: string, code: string): Promise<boolean> {
    const redisCode = await redisUtil.get(email); // 从Redis中获取验证码
    return redisCode === code;
  }
}

export default EmailService;
