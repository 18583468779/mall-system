// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import ctgyDao from "../modules/ctgy/dao/CtgyDao";
import ctgyService from "../modules/ctgy/service/CtgyService";

@Controller("/ctgymodule")
class CtgyController {
  @get("/test")
  async test(ctx: Context) {
    ctx.body = success("测试成功");
  }
  @get("/findSecThrdCtgys/:firstctgyid")
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params;
    ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid));
  }
  @get("/findAllCtgys")
  async findAllCtgys(ctx: Context) {
    ctx.body = success(await ctgyDao.findAllCtgys());
  }
  @get("/findSecCtgys")
  async findSecCtgys(ctx: Context) {
    const data = success(await ctgyDao.findSecCtgys());
    ctx.body = data;
  }
  @post("/addCtgys")
  async addCtgys(ctx: Context) {
    const { type, name, id } = ctx.request.body;
    const data = success(await ctgyDao.addCtgys(type, name, id));
    ctx.body = data;
  }
  @post("/deleteCtgys")
  async deleteCtgys(ctx: Context) {
    const { type, id } = ctx.request.body;
    const data = success(await ctgyDao.deleteCtgys(type, id));
    ctx.body = data;
  }
  @get("/findFirstCtgys")
  async findFirstCtgys(ctx: Context) {
    const data = success(await ctgyService.findFirstCtgys());
    ctx.body = data;
  }
}
