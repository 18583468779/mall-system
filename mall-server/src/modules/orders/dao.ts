import { createNativeOrder } from "./service";

class OrdersDao {
  static ordersDao: OrdersDao = new OrdersDao();
  async createNativeOrderDao(amount: number, description: string) {
    // 模拟创建订单逻辑
    return await createNativeOrder(amount, description);
  }
}

export default OrdersDao.ordersDao;
