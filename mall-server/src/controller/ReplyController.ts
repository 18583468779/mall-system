// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import ReplyDao from "../modules/reply/ReplyDao";

@Controller("/replymodule")
class ReplyController {
  @post("/addReply")
  async addReply(ctx: Context) {
    const reply = ctx.request.body;
    ctx.body = success(await ReplyDao.addReply(reply));
  }
}
