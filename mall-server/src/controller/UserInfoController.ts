import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import userService from "../modules/userinfo/service/userInfoService";

@Controller("/userinfomodule")
class UserInfoController {
  @post("/login")
  async login(ctx: Context) {
    const { username, password } = ctx.request.body;
    const res = await userService.login(username, password);
    ctx.body = success(res);
  }
}
