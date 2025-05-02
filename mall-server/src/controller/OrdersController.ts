import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { use } from "../decorator/commondecorator";
import { Context } from "koa";
import ordersDao from "../modules/orders/dao";
@Controller("/ordersmodule")
class OrdersController {
  // 创建订单
  @post("/createNativeOrderDao")
  async createNativeOrderDao(ctx: Context) {
    const res = ctx.request.body;
    let userId = ctx.state.user.userid;
    ctx.body = success(await ordersDao.createNativeOrderDao(userId, res));
  }
  // 支付回调
  @post("/wechat/notify")
  @use(ordersDao.wechatNotifyMiddleware()) // 使用中间件
  async wechatNotify(ctx: Context) {
    const res = ctx.request.body;

    ctx.body = success(111);
  }
  // 查询是否支付成功
  @post("/queryWechatPayment")
  async queryWechatPayment(ctx: Context) {
    const { orderNo } = ctx.request.body;
    ctx.body = success(await ordersDao.queryWechatPayment(orderNo));
  }
}
