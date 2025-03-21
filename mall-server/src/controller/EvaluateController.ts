// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import EvaluateDao from "../modules/evaluate/dao/EvaluateDao";

@Controller("/evaluatemodule")
class EvaluateController {
  @get("/findEvaluateReplyList/:isbn")
  async findEvaluateReplyList(ctx: Context) {
    const { isbn } = ctx.params;
    ctx.body = success(await EvaluateDao.findEvaluateReplyList(isbn));
  }
}
