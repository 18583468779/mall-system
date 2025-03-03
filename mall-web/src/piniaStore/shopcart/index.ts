import goodStorage from "good-storage";
import { defineStore } from "pinia";
import { initShopcart, ShopCart } from "./state";
import request from "../../utils/axiosUtil";
import shopCartApi from "../../api/ShopApi";
import { AxiosResponse } from "axios";

export default defineStore("shopCart", {
  state: () => {
    return {
      shopCartList: initShopcart,
    };
  },
  getters: {
    getShopCartList(state) {
      // 获取购物车列表
      return state.shopCartList.length > 0
        ? state.shopCartList
        : goodStorage.get("shopCartList");
    },
  },
  actions: {
    async findCurUseShopCartList(userid: number) {
      // 获取购物车列表
      const res: AxiosResponse<ShopCart[]> = await shopCartApi.getShopCartList(
        userid
      );
      this.shopCartList = res.data;
      goodStorage.set("shopCartList", res.data);
    },
  },
});
