import { combine } from "../../../modules/commontypes";
import shopCartDao from "../dao/ShopCartDao";
import { ShopCartRaw, ShopCartRaw_ } from "../raw";
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
  async addOrSubtrBookToShopCart(shopCart: ShopCartRaw_) {
    // 增加或者减少购物车图书数量
    await shopCartDao.addOrSubtrBookToShopCart(shopCart);
    return shopCart;
  }
  async deOneBookFrmSc(shopcartid: number) {
    // 删除一条数据
    return await shopCartDao.deOneBookFrmSc(shopcartid);
  }
}

export default ShopCartService.shopCartService;
