// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import ctgyDao from "../modules/ctgy/dao/CtgyDao";

@Controller("/ctgymodule")
class CtgyController {
  @get("/findSecThrdCtgys/:firstctgyid")
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params;
    ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid));
  }
}
