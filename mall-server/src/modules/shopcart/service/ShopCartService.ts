import { combine } from "../../../modules/commontypes";
import shopCartDao from "../dao/ShopCartDao";
import { ShopCartRaw } from "../row";
class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService();
  async findCurUseShopCartList(userid: number) {
    // 获取购物车列表
    return await shopCartDao.findCurUseShopCartList(userid);
  }
  async addBookToShopCart(shopCart: ShopCartRaw) {
    // 新增购物车
    const result = await shopCartDao.addBookToShopCart(shopCart);
    return combine({ shopcartid: result[0] }, shopCart);
  }
}

export default ShopCartService.shopCartService;
