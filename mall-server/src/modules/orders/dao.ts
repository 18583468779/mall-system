import OrdersService, { ChannelType } from "./service";

class OrdersDao {
  static ordersDao: OrdersDao = new OrdersDao();
  async createNativeOrderDao(userId: number, order: any) {
    return await OrdersService.createPayment(userId, order, order.channel);
  }
  async queryWechatPayment(orderNo: string) {
    return await OrdersService.queryWechatPayment(orderNo);
  }
  // 获取微信支付回调中间件
  wechatNotifyMiddleware() {
    return OrdersService.wechatNotifyMiddleware();
  }
  closeExpiredOrder(orderNo: string) {
    return OrdersService.closeExpiredOrder(orderNo);
  }
}

export default OrdersDao.ordersDao;
