import Koa from "koa";
import body from "koa-body";
import json from "koa-json";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.prefix("/dang");
app.use(json());
app.use(body());

router.get("/test", async (ctx: Koa.Context, next: Koa.Next) => {
  ctx.body = "第一个请求test";
});

app.use(router.routes());

app.listen(3002, () => {
  console.log("服务已启动，监听3002端口");
});
