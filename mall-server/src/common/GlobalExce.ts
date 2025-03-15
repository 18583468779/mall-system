/**
 * 全局异常处理
 */
import Koa, { Context } from "koa";
import { fail } from "./ResResult";
const globalException = async (ctx: Context, next: Koa.Next) => {
  // try {
  //   if (ctx.request.url.indexOf('login') === -1) {
  //     const token = ctx.request.headers.authorization?.split(' ')[1] as string
  //     verifyToken(token)
  //   }
  //   await next()
  // } catch (err: any) {
  //   switch (err.name) {
  //     case 'JsonWebTokenError':
  //       ctx.body = fail(`这是不合格的 token`)
  //       break
  //     case 'TokenExpiredError':
  //       ctx.body = fail(`已经过期的 token`)
  //       break
  //     default:
  //       ctx.body = fail('服务器错误' + err.message)
  //   }
  // }

  await next().catch((err) => {
    if (err.status === 401) {
      ctx.body = fail(`这是不合法的或者过期的token`, err.status);
    } else {
      console.log("err", err);
      ctx.body = fail(`服务器错误${err}`);
    }
  });
};
export default globalException;
