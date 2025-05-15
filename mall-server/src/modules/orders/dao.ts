import { AlipayPayStrategy } from "./payment/alipayPayStrategy";
import OrdersService from "./service";

class OrdersDao {
  static ordersDao: OrdersDao = new OrdersDao();
  async createNativeOrderDao(userId: number, order: any) {
    return await OrdersService.createPayment(userId, order, order.channel);
  }
  async queryOrderDao(userId: number) {
    return await OrdersService.queryOrder(userId);
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
  alipayNotifyMiddleware() {
    return OrdersService.alipayNotifyMiddleware();
  }
  async queryAlipayPayment(orderNo: string) {
    const alipayStrategy = new AlipayPayStrategy();
    return alipayStrategy.queryOrder(orderNo);
  }
}

export default OrdersDao.ordersDao;
