// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import BookletContentDao from "../modules/booklet/dao/BookletContentDao";

@Controller("/bookletcontentmodule")
class BookletContentController {
  @post("/addBookletContent")
  async addBookletContent(ctx: Context) {
    const data = ctx.request.body;
    const res = success(await BookletContentDao.addBookletContent(data));
    ctx.body = res;
  }
  @get("/getBookletContent")
  async getBookletContent(ctx: Context) {
    const res = success(await BookletContentDao.getBookletContent());
    ctx.body = res;
  }
  @post("/updateBookletContent")
  async updateBookletContent(ctx: Context) {
    const { id, ...data } = ctx.request.body;
    const res = success(await BookletContentDao.updateBookletContent(id, data));
    ctx.body = res;
  }
  @post("/deleteBookletContent")
  async deleteBookletContent(ctx: Context) {
    const { id } = ctx.request.body;
    const res = success(await BookletContentDao.deleteBookletContent(id));
    ctx.body = res;
  }
}
