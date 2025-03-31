import { fail, success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import userService from "../modules/userinfo/service/userInfoService";

@Controller("/userinfomodule")
class UserInfoController {
  @post("/login")
  async login(ctx: Context) {
    const credentials = ctx.request.body;
    const userInfo = await userService.login(credentials);
    if (userInfo) {
      ctx.body = success(userInfo);
    } else {
      ctx.body = fail("用户名或者密码不正确，请检查后再重新登录");
    }
  }
  // 发送邮箱验证码
  @post("/sendVerificationCode")
  async sendVerificationCode(ctx: Context) {
    const email = ctx.request.body;
    const code = await userService.sendVerificationCode(email);
    ctx.body = success(code);
  }
}
