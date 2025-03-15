/**
 * 全局异常处理
 */
import Koa, { Context } from "koa";
import { fail } from "./ResResult";
import { verifyToken } from "../controller/BaseController";
const globalException = async (ctx: Context, next: Koa.Next) => {
  console.log("进入到通用异常");
  try {
    if (ctx.url.indexOf("login") === -1) {
      const token = ctx.headers.authorization?.split(" ")[1] as string;
      verifyToken(token);
    }
    await next();
  } catch (err: any) {
    const errrslt = err as { message: string };
    switch (err.name) {
      case "JsonWebTokenError":
        ctx.body = fail("这是个非法的token", true);
        break;
      case "TokenExpiredError":
        ctx.body = fail("已经过期的token", true);
        break;
      default:
        ctx.body = fail(`服务器错误：${errrslt.message}`);
    }
  }
};
export default globalException;
