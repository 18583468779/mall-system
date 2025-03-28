import { addEntryToArr } from "../commontypes";
import shopCartDao from "../shopcart/dao/ShopCartDao";
import { Orderinfo } from "./entity";
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
}

export default OrderInfoDetailService.orderInfoDetailService;
