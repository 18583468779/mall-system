import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import shopCartService from "../modules/shopcart/service/ShopCartService";
import { ShopCartRaw } from "../modules/shopcart/row";

@Controller("/shopcartmodule")
class ShopCartController {
  @get("/findCurUseShopCartList/:userid") // 根据用户id查询购物车
  async findCurUseShopCartList(ctx: Context) {
    const { userid } = ctx.params;
    ctx.body = success(await shopCartService.findCurUseShopCartList(userid));
  }
  @post("/addBookToShopCart") // 新增购物车
  async addBookToShopCart(ctx: Context) {
    const shopCartRaw = ctx.request.body;
    const dbshopCart = await shopCartService.addBookToShopCart(shopCartRaw);
    ctx.body = success(dbshopCart);
  }
}
