import { Context } from "koa";
import Router from "koa-router";

const router = new Router();
router.prefix("/usermodule");

router.get("/findUserinfo/:username", async (ctx: Context) => {
  const { username } = ctx.params;
  ctx.body = `欢迎!${username}`;
});

router.post("/addUser", async (ctx: Context) => {
  const user = ctx.request.body;
  ctx.body = `欢迎!${user.username}`;
});
export default router;
