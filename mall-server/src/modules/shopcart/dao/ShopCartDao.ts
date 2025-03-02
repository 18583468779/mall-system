import ShopcartModel from "../../../modules/decormodel/shopcart";
class ShopCartDao {
  static shopCartDao: ShopCartDao = new ShopCartDao();
  async findCurUseShopCartList(userid: number) {
    // 根据用户id查询购物车信息
    return await ShopcartModel.findAll({
      raw: true,
      where: {
        userid,
      },
    });
  }
}

export default ShopCartDao.shopCartDao;
