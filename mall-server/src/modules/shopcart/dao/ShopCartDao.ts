import { sequelize } from "../../../modules/BaseDao";
import ShopcartModel from "../../../modules/decormodel/shopcart";
import { ShopCartRaw } from "../row";
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
}

export default ShopCartDao.shopCartDao;
