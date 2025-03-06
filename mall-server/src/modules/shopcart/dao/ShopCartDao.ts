import { sequelize } from "../../../modules/BaseDao";
import ShopcartModel from "../../../modules/decormodel/shopcart";
import { ShopCartRaw, ShopCartRaw_ } from "../raw";
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
  async addBookToShopCart(shopCart: ShopCartRaw): Promise<[any, any]> {
    // 添加图书到购物车
    const sql = `insert into shopcart (bookisbn,bookname,bookpicname,bookprice,userid,purcharsenum) values 
    ('${shopCart.bookisbn}','${shopCart.bookname}','${shopCart.bookpicname}',${shopCart.bookprice},${shopCart.userid},${shopCart.purcharsenum})`;

    return await sequelize.query(sql);
  }
  async addOrSubtrBookToShopCart(shopCart: ShopCartRaw_): Promise<[any, any]> {
    // 增加或者减少购物车图书数量
    const sql = `update shopcart set purcharsenum=${shopCart.purcharsenum} where shopcartid=${shopCart.shopcartid}`;
    return await sequelize.query(sql);
  }
  async deOneBookFrmSc(shopcartid: number) {
    // 删除购物车的一条数据
    return await ShopcartModel.destroy({
      where: {
        shopcartid,
      },
    });
  }
}

export default ShopCartDao.shopCartDao;
