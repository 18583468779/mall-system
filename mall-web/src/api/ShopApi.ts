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
}

export default ShopCartApi.shopCartApi;
