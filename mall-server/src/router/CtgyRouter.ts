import { success } from "../common/ResResult";
import ctgyDao from "..//modules/ctgy/dao/CtgyDao";
import { Context } from "koa";
import Router from "koa-router";

const router = new Router();
router.prefix("/ctgymodule");

router.get("/findSecThrdCtgys/:firstctgyid", async (ctx: Context) => {
  const { firstctgyid } = ctx.params;
  ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid));
});

module.exports = router;
