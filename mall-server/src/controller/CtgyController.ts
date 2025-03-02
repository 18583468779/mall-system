// ts 装饰器重构koa路由中的方法装饰器

import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import ctgyDao from "../modules/ctgy/dao/CtgyDao";
import redisConf, { RedisClient } from "../config/RedisConfig";

@Controller("/ctgymodule")
class CtgyController {
  @get("/testRedis")
  async testRedis(ctx: Context) {
    const redisClient: RedisClient = redisConf.redisServerConf();
    // 普通字符串存取
    redisClient.set("food", "caomei");
    ctx.body = await redisClient.get("food");
  }

  @get("/findSecThrdCtgys/:firstctgyid")
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params;
    ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid));
  }
  @get("/findFirstCtgys")
  async findFirstCtgys(ctx: Context) {
    const data = success(await ctgyDao.findFirstCtgys());
    ctx.body = data;
  }
}
