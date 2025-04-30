import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import ordersDao from "../modules/orders/dao";
@Controller("/ordersmodule")
class OrdersController {
  @post("/createNativeOrderDao")
  async createNativeOrderDao(ctx: Context) {
    const res = ctx.request.body;
    let userId = ctx.state.user.userid;
    ctx.body = success(
      await ordersDao.createNativeOrderDao(userId,res)
    );
  }
}
