import jwt from "jsonwebtoken";
import { findOneUser, Userinfo, createUser, updateUser } from "../dao/UserDao";
import EmailService from "../../../common/emailSender";
class UserService {
  private static instance: UserService;
  constructor() {
    if (UserService.instance) {
      throw new Error("Cannot create multiple instances of UserService.");
    }
  }
  public static getInstance() {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }
  async login(credentials: {
    type: "account" | "email" | "phone" | "weixin";
    identifier: string; // 用户名、邮箱、手机号或微信openid
    password?: string; // 密码（仅当type为password时需要）
    code?: string; // 验证码（仅当type为email或phone时需要）
    wxCode?: string; // 微信code（仅当type为weixin时需要）
  }) {
    let user: Userinfo | null = null;

    switch (credentials.type) {
      case "account":
        user = await this.passwordLogin(
          credentials.identifier,
          credentials.password!
        );
        break;
      case "email":
        user = await this.emailLogin(credentials.identifier, credentials.code!);
        break;

      default:
        throw new Error("不支持的登录类型");
    }
    if (!user) throw new Error("用户不存在"); // 用户不存在，抛出异常
    if (!user.valid) throw new Error("账户已被禁用"); // 用户未激活，抛出异常
    this.createJWTToken(user);
    return user;
  }
  // 密码登录
  private async passwordLogin(username: string, password: string) {
    return (await findOneUser({
      username,
      password,
    })) as unknown as Promise<Userinfo>;
  }
  // 邮箱登录
  private async emailLogin(email: string, code: string) {
    const isValid = await EmailService.verifyCode(email, code); // 验证验证码是否正确
    if (!isValid) throw new Error("验证码错误或已过期"); // 验证码错误，抛出异常

    const user = (await findOneUser({ email })) as unknown as Promise<Userinfo>; // 根据邮箱查找用户
    if (!user) throw new Error("用户不存在"); // 用户不存在，抛出异常
    return user;
  }
  // 发送验证码
  async sendVerificationCode(email: string) {
    const code = await EmailService.sendVerifyCode(email); // 发送验证码
    return code; // 返回验证码
  }

  createJWTToken(userInfo: Userinfo) {
    const token = jwt.sign({ data: userInfo }, "aiaiai123456X", {
      expiresIn: "30h",
      header: { alg: "HS256", typ: "JWT" },
    });
    userInfo.token = token;
  }
}
export default UserService.getInstance();
