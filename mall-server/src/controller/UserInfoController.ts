import { fail, success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import userService from "../modules/userinfo/service/userInfoService";

@Controller("/userinfomodule")
class UserInfoController {
  @post("/login")
  async login(ctx: Context) {
    const { username, password } = ctx.request.body;
    const userInfo = await userService.login(username, password);
    if (userInfo) {
      ctx.body = success(userInfo);
    } else {
      ctx.body = fail("用户名或者密码不正确，请检查后再重新登录");
    }
  }
}
