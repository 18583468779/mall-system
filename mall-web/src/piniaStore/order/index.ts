import { defineStore } from "pinia";
import { Orderinfo } from "./state";
import orderApi from "../../api/OrderApi";
export default defineStore("order", {
  state: () => ({
    initState: [] as Orderinfo[],
  }),
  getters: {
    getOrderList: (state) => {
      return state.initState.length > 0 ? state.initState : [];
    },
  },
  actions: {
    async submitOrder(orderDetail: Orderinfo) {
      const res = await orderApi.submitOrder(orderDetail);
      return res;
    },
    async getOrderInfoByCustomerId(customerid: number) {
      const res = await orderApi.getOrderInfoByCustomerid(customerid);
      console.log(res);
    },
  },
});
