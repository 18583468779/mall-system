// ts 装饰器重构koa路由中的方法装饰器

import { get, post } from "../decorator/requestmethoddecorator";
import { Context } from "koa";

class CtgyController {
  @get("/findSecThrdCtgys/:firstctgyid")
  async findSecThrdCtgys(ctx: Context) {}
  @post("/1111/:firstctgyid")
  async findSecThrdCtgys2(ctx: Context) {}
}
