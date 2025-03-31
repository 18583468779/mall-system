/**
 *  @description: 发送短信
 */
import redisUtil from "../common/RedisUtil";

abstract class SmsService {
  /**
   * 发送短信验证码（需具体服务商实现）
   * @abstract
   */
  abstract sendSMS(phone: string): Promise<string>;

  /**
   * 通用验证码验证方法
   * @param phone 手机号
   * @param code 验证码
   * @returns 验证结果
   */
  static async verifyCode(phone: string, code: string): Promise<boolean> {
    const storedCode = await redisUtil.get(`code:phone:${phone}`);
    return storedCode === code;
  }
}
