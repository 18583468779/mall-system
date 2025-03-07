import { ShopCartType } from "../piniaStore/shopcart/state";
import request from "../utils/axiosUtil";

class ShopCartApi {
  static shopCartApi: ShopCartApi = new ShopCartApi();
  async getShopCartList(userid: number) {
    // 根据用户id查询购物车
    return await request.get(
      `/shopcartmodule/findCurUseShopCartList/${userid}`,
      false
    );
  }
  addBookToShopCart(shopCart: ShopCartType) {
    // 添加图书到购物车
    return request.post("/shopcartmodule/addBookToShopCart", false, shopCart);
  }
  addOrSubtrBookToShopCart(shopCart: ShopCartType) {
    // 增加或者减少购物车图书数量
    return request.post(
      "/shopcartmodule/addOrSubtrBookToShopCart",
      false,
      shopCart
    );
  }
  delBookFrmSc(shopcartid: number) {
    // 删除购物车
    return request.get(`/shopcartmodule/deOneBookFrmSc/${shopcartid}`, false);
  }
}

export default ShopCartApi.shopCartApi;
