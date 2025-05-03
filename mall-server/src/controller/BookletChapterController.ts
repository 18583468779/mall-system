// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import BookletChapterDao from "../modules/booklet/dao/BookletChapterDao";

@Controller("/bookletchaptermodule")
class BookletController {
  @post("/addBookletChapter")
  async addBookletChapter(ctx: Context) {
    const data = ctx.request.body;
    const res = success(await BookletChapterDao.addBookletChapter(data));
    ctx.body = res;
  }
  @get("/getBookletsChapter")
  async getBookletsChapter(ctx: Context) {
    const res = success(await BookletChapterDao.getBookletsChapter());
    ctx.body = res;
  }
  @post("/updateBookletChapter")
  async updateBookletChapter(ctx: Context) {
    const { id, ...data } = ctx.request.body;
    const res = success(await BookletChapterDao.updateBookletChapter(id, data));
    ctx.body = res;
  }
  @post("/deleteBookletChapter")
  async deleteBookletChapter(ctx: Context) {
    const { id } = ctx.request.body;
    const res = success(await BookletChapterDao.deleteBookletChapter(id));
    ctx.body = res;
  }
}
