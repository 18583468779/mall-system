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
  private async emailLogin(email: string, code: string): Promise<Userinfo> {
    // 验证邮箱验证码
    const isValid = await EmailService.verifyCode(email, code);
    if (!isValid) throw new Error("验证码错误或已过期");

    // 查询现有用户
    let user: any = await findOneUser({ email });

    // 用户不存在时自动注册
    if (!user) {
      user = (await createUser({
        email,
        valid: 1, // 默认激活账户
        username: this.generateDefaultUsername(email), // 自动生成用户名
      })) as Userinfo;
    }

    return user;
  }

  // 生成默认用户名
  private generateDefaultUsername(email: string): string {
    return email.split("@")[0] + "_" + Math.random().toString(36).substr(2, 4);
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
