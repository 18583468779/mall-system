import { success } from "../common/ResResult";
import {
  addUser,
  findAllUser,
  findByLike,
  findByProps,
  findByUsmAndPsw,
  Userinfo,
} from "../dao/UserDaoDefine";
import { Context } from "koa";
import Router from "koa-router";

const router = new Router();
router.prefix("/usermodule");

router.get("/findUserinfo/:username", async (ctx: Context) => {
  const { username } = ctx.params;
  ctx.body = `欢迎!${username}`;
});

router.post("/addUser", async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body;
  const dbUserinfo = await addUser(userinfo);
  ctx.body = success(dbUserinfo);
});

router.get("/findAllUser", async (ctx: Context) => {
  // 查询所有用户
  const dbAllUser = await findAllUser();
  ctx.body = success(dbAllUser);
});

router.get("/findByProps", async (ctx: Context) => {
  //只查询用户名和密码字段
  const dbAllUser = await findByProps();
  ctx.body = success(dbAllUser);
});

router.post("/findByUsmAndPsw", async (ctx: Context) => {
  const { username, password } = ctx.request.body;
  const dbUserOne = await findByUsmAndPsw(username, password);
  ctx.body = success(dbUserOne);
});

router.get("/findByLike", async (ctx: Context) => {
  // 模糊查询
  const dbAllUser = await findByLike();
  ctx.body = success(dbAllUser);
});
module.exports = router;
