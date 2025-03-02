import { success } from "../common/ResResult";
import { get } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import shopCartService from "../modules/shopcart/service/ShopCartService";

@Controller("/shopcartmodule")
class ShopCartController {
  @get("/findCurUseShopCartList/:userid") // 根据用户id查询购物车
  async findCurUseShopCartList(ctx: Context) {
    const { userid } = ctx.params;
    ctx.body = success(await shopCartService.findCurUseShopCartList(userid));
  }
}
