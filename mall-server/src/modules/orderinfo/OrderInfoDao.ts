import { sequelize } from "../BaseDao";
import { OrderDetail, Orderinfo } from "./entity";

class OrdAndOrDetailDao {
  static ordAndOrDetailDao: OrdAndOrDetailDao = new OrdAndOrDetailDao();

  async addOrderInfo(ordinfo: Orderinfo): Promise<[any, any]> {
    const ordSql = `insert into ordinfo(ordertime,customerid,orderstatus) values('${ordinfo.ordertime}',${ordinfo.customerid},${ordinfo.orderstatus})`;
    return await sequelize.query(ordSql);
  }
  async addOrderDetail(orddetail: OrderDetail): Promise<[any, any]> {
    const ordDetailSql = `insert into orderdetail(bookname,bookprice,bookpicname,purcharsenum,orderid) values('${orddetail.bookname}',${orddetail.bookprice},'${orddetail.bookpicname}',${orddetail.purcharsenum},${orddetail.orderid})`;
    return await sequelize.query(ordDetailSql);
  }
}

export default OrdAndOrDetailDao.ordAndOrDetailDao;
