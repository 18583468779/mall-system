import OrdersService, { ChannelType } from "./service";

class OrdersDao {
  static ordersDao: OrdersDao = new OrdersDao();
  async createNativeOrderDao(userId: number, order: any) {
    return await OrdersService.createPayment(userId, order, order.channel);
  }
}

export default OrdersDao.ordersDao;
