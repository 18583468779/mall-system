import { Orderinfo } from "../piniaStore/order/state";
import request from "../utils/axiosUtil";

class OrderAPI {
  static api: OrderAPI = new OrderAPI();
  async submitOrder(orderDetail: Orderinfo) {
    return await request.post("/ordermodule/submitOrder", false, orderDetail);
  }
  async getOrderInfoByCustomerid(customerid: number) {
    return await request.get(
      `/ordermodule/getOrderInfoByCustomerid/${customerid}`,
      false
    );
  }
}
export default OrderAPI.api;
