import { success } from "../common/ResResult";
import { findAllUser, Userinfo } from "../modules/userinfo/dao/UserDao";
import { Context } from "koa";
import Router from "koa-router";

const router = new Router();
router.prefix("/usermodule");

router.get("/findUserinfo/:username", async (ctx: Context) => {
  const { username } = ctx.params;
  ctx.body = `欢迎!${username}`;
});

router.get("/findAllUser", async (ctx: Context) => {
  // 查询所有用户
  const dbAllUser = await findAllUser();
  ctx.body = success(dbAllUser);
});

module.exports = router;
