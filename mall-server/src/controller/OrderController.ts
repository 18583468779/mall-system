import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import orderInfoDetailService from "../modules/orderinfo/OrderInfoService";
@Controller("/ordermodule")
class OrderController {
  @post("/submitOrder")
  async submitOrder(ctx: Context) {
    const res = ctx.request.body;
    ctx.body = success(await orderInfoDetailService.submitOrder(res));
  }
}
