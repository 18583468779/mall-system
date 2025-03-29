import { addEntryToArr } from "../commontypes";
import shopCartDao from "../shopcart/dao/ShopCartDao";
import { OrderDetail, Orderinfo, TransformedOrder } from "./entity";
import ordAndOrDetailDao from "./OrderInfoDao";

class OrderInfoDetailService {
  static orderInfoDetailService: OrderInfoDetailService =
    new OrderInfoDetailService();
  async submitOrder(orderInfoDetail: Orderinfo) {
    // 1. 保存订单信息
    const orderinfo: Orderinfo = {
      ordertime: orderInfoDetail.ordertime,
      customerid: orderInfoDetail.customerid,
      orderstatus: 1,
    };
    const dbOrderid: number = (
      await ordAndOrDetailDao.addOrderInfo(orderinfo)
    )[0];
    orderInfoDetail.orderid = dbOrderid;
    // 2.拼接订单id+订单详情信息
    const orderDetailLst = orderInfoDetail.orderDetailList!;
    const lastOrderDetailList = addEntryToArr(
      orderDetailLst,
      "orderid",
      dbOrderid
    );
    // 3.保存订单详情信息
    let dbOrderDetailId: number;
    for (let orderDetail of lastOrderDetailList) {
      dbOrderDetailId = (
        await ordAndOrDetailDao.addOrderDetail(orderDetail)
      )[0];
      orderDetail.orderdetailid = dbOrderDetailId;
      // 4.删除购物车信息
      await shopCartDao.deOneBookFrmSc(orderDetail.shopcartid!);
    }
    orderInfoDetail.orderDetailList = lastOrderDetailList;
    return orderInfoDetail;
  }
  async getOrderInfoByCustomerid(customerid: number) {
    const [orderInfoList] = await ordAndOrDetailDao.getOrderInfoByCustomerId(
      customerid
    );
    return transformOrders(orderInfoList);
  }
}
// 转换函数
function transformOrders(
  orders: (OrderDetail & Orderinfo)[]
): TransformedOrder[] {
  return orders.reduce(
    (acc: TransformedOrder[], current: OrderDetail & Orderinfo) => {
      // 查找已存在的订单
      const existingOrder = acc.find(
        (order) => order.orderid === current.orderid
      );

      if (existingOrder) {
        // 如果订单已存在，添加商品到 items 数组
        existingOrder.orderDetailList.push({
          bookname: current.bookname,
          bookpicname: current.bookpicname,
          purcharsenum: current.purcharsenum,
          bookprice: current.bookprice,
          orderdetailid: current.orderdetailid!,
          orderid: current.orderid!,
        });
      } else {
        // 如果订单不存在，创建新订单结构
        acc.push({
          orderid: current.orderid!,
          ordertime: current.ordertime,
          customerid: current.customerid,
          orderstatus: current.orderstatus,
          orderDetailList: [
            {
              bookname: current.bookname,
              bookprice: current.bookprice,
              bookpicname: current.bookpicname,
              purcharsenum: current.purcharsenum,
              orderdetailid: current.orderdetailid!,
              orderid: current.orderid!,
            },
          ],
        });
      }

      return acc;
    },
    []
  );
}
export default OrderInfoDetailService.orderInfoDetailService;
