// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import BookletDao from "../modules/booklet/dao/BookletDao";

@Controller("/bookletmodule")
class BookletController {
  @get("/getBookletAndContent/:id")
  async getBookletAndContentById(ctx: Context) {
    const { id } = ctx.params;
    const res = success(await BookletDao.getBookletAndContentById(id));
    ctx.body = res;
  }
  @post("/addBooklet")
  async addBooklet(ctx: Context) {
    const data = ctx.request.body;
    data.userid = ctx.state.user.userid;
    const res = success(await BookletDao.addBooklet(data));
    ctx.body = res;
  }
  @get("/getBookletList")
  async getBookletList(ctx: Context) {
    const res = success(await BookletDao.getBooklets());
    ctx.body = res;
  }
  @post("/updateBooklet")
  async updateBooklet(ctx: Context) {
    const { id, ...data } = ctx.request.body;
    const res = success(await BookletDao.updateBooklet(id, data));
    ctx.body = res;
  }
  @post("/deleteBooklet")
  async deleteBooklet(ctx: Context) {
    const { id } = ctx.request.body;
    const res = success(await BookletDao.deleteBooklet(id));
    ctx.body = res;
  }
}
