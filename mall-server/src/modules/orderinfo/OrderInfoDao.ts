import { sequelize } from "../BaseDao";
import { OrderDetail, Orderinfo } from "./entity";

class OrdAndOrDetailDao {
  static ordAndOrDetailDao: OrdAndOrDetailDao = new OrdAndOrDetailDao();

  async addOrderInfo(ordinfo: Orderinfo): Promise<[any, any]> {
    const ordSql = `insert into orderinfo(ordertime,customerid,orderstatus) values('${ordinfo.ordertime}',${ordinfo.customerid},${ordinfo.orderstatus})`;
    return await sequelize.query(ordSql);
  }
  async addOrderDetail(orddetail: OrderDetail): Promise<[any, any]> {
    const ordDetailSql = `insert into orderdetail(bookname,bookprice,bookpicname,purcharsenum,orderid) values('${orddetail.bookname}',${orddetail.bookprice},'${orddetail.bookpicname}',${orddetail.purcharsenum},${orddetail.orderid})`;
    return await sequelize.query(ordDetailSql);
  }
  async getOrderInfoByCustomerId(customerid: number): Promise<[any, any]> {
    const ordSql = `select oi.orderid,oi.ordertime,oi.customerid,oi.orderstatus, odi.bookname,odi.bookpicname,odi.orderdetailid,odi.purcharsenum from orderinfo oi inner join orderdetail odi where customerid=${customerid}`;
    return await sequelize.query(ordSql);
  }
}

export default OrdAndOrDetailDao.ordAndOrDetailDao;
