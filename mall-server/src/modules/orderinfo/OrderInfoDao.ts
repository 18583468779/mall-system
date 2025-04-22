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
  async getOrderInfoByCustomerId(
    customerid: number,
    status?: 0 | 1 | 2 | 4   // 改为可选参数
  ): Promise<any[]> {
    // 动态构建WHERE条件
    let whereClause = "oi.customerid = :customerid";
    const replacements: any = { customerid };
      console.log('**************************status************************************', status)
    if (status != 4) {
      whereClause += " AND oi.orderstatus = :status";
      replacements.status = status;
    }
  
    const ordSql = `
      SELECT 
        oi.orderid,
        oi.ordertime,
        oi.customerid,
        oi.orderstatus,
        odi.bookname,
        odi.bookprice,
        odi.bookpicname,
        odi.orderdetailid,
        odi.purcharsenum
      FROM orderinfo oi
      INNER JOIN orderdetail odi 
        ON oi.orderid = odi.orderid
      WHERE ${whereClause}
      ORDER BY oi.ordertime DESC`;
  
    return await sequelize.query(ordSql, {
      replacements,
    });
  }
  
}

export default OrdAndOrDetailDao.ordAndOrDetailDao;
