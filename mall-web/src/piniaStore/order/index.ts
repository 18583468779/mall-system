import { defineStore } from "pinia";
import { OrderDetail, Orderinfo } from "./state";
import orderApi from "../../api/OrderApi";
import storage from "../../utils/goodStorageUtil";
export default defineStore("order", {
  state: () => ({
    initState: [] as Orderinfo[],
  }),
  getters: {
    getOrderList: (state): Orderinfo[] => {
      return state.initState.length > 0
        ? state.initState
        : storage.get("orderInfo");
    },
  },
  actions: {
    async submitOrder(orderDetail: Orderinfo) {
      const res = await orderApi.submitOrder(orderDetail);
      return res;
    },
    async getOrderInfoByCustomerId(customerid: number,status?:0 | 1 | 2 | 4 ) {
      const res: any = await orderApi.getOrderInfoByCustomerid(customerid, status);
      if (res.code === 200) {
        this.initState = res.data;
        storage.set("orderInfo", res.data);
      }
    },
  },
});
