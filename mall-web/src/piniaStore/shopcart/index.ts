import goodStorage from "good-storage";
import { defineStore } from "pinia";
import { initShopcart, ShopCartType } from "./state";
import shopCartApi from "../../api/ShopApi";
import { AxiosResponse } from "axios";
import storage, { OPTION } from "../../utils/goodStorageUtil";

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
      const res: AxiosResponse<ShopCartType[]> =
        await shopCartApi.getShopCartList(userid);
      this.shopCartList = res.data;
      storage.set("shopCartList", res.data);
    },
    async addBookToShopCart(shopCart: ShopCartType) {
      const result: AxiosResponse<ShopCartType> =
        await shopCartApi.addBookToShopCart(shopCart);
      const dbShopCart = result.data;
      const shopCartList = storage.set(
        "shopCartList",
        dbShopCart,
        OPTION.ADDAPPENDOBJTOARR,
        "shopcartid",
        dbShopCart.shopcartid
      );
      this.shopCartList = shopCartList;
    },
  },
});
