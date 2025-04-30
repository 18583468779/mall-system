import OrdersService, { ChannelType } from "./service";

class OrdersDao {
  static ordersDao: OrdersDao = new OrdersDao();
  async createNativeOrderDao(userId: number, order: any) {
    return await OrdersService.createPayment(userId, order, order.channel);
  }
  async queryWechatPayment(orderNo: string) {
    return await OrdersService.queryWechatPayment(orderNo);
  }
}

export default OrdersDao.ordersDao;
