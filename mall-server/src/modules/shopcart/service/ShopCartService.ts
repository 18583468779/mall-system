import shopCartDao from "../dao/ShopCartDao";
class ShopCartService {
  static shopCartService: ShopCartService = new ShopCartService();
  async findCurUseShopCartList(userid: number) {
    return await shopCartDao.findCurUseShopCartList(userid);
  }
}

export default ShopCartService.shopCartService;
