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
    getShopCartList(state): ShopCartType[] {
      // 获取购物车列表
      return state.shopCartList.length > 0
        ? state.shopCartList
        : goodStorage.get("shopCartList");
    },
  },
  actions: {
    storeShopCartList(shopCartList: ShopCartType[]) {
      this.shopCartList = shopCartList;
      storage.set("shopCartList", shopCartList);
    },

    async findCurUseShopCartList(userid: number) {
      // 获取购物车列表
      const res: AxiosResponse<ShopCartType[]> =
        await shopCartApi.getShopCartList(userid);
      this.shopCartList = res.data;
      storage.set("shopCartList", res.data);
    },
    async addBookToShopCart(shopCart: ShopCartType) {
      // 新增商品到购物车
      const result: AxiosResponse<ShopCartType> =
        await shopCartApi.addBookToShopCart(shopCart);
      const dbShopCart = result.data;
      this.setShopCart(dbShopCart);
    },
    async addOrSubtrBookToShopCart(shopCart: ShopCartType) {
      // 增加或者减少购物车图书数量
      const result = await shopCartApi.addOrSubtrBookToShopCart(shopCart);
      const dbShopCart = result.data;
      this.setShopCart(dbShopCart);
    },
    async setShopCart(dbShopCart: ShopCartType) {
      // 设置购物车列表
      dbShopCart.checked = true; // 默认为选中
      storage.set(
        "shopCartList",
        dbShopCart,
        OPTION.ADDAPPENDOBJTOARR,
        "shopcartid",
        dbShopCart.shopcartid
      );
      this.shopCartList = storage.get("shopCartList", OPTION.ADDAPPENDOBJTOARR);
    },
    async delBookFrmSc(shopcartid: number) {
      // 删除购物车
      const result = await shopCartApi.delBookFrmSc(shopcartid);
      const dbShopCart = result.data;
      return dbShopCart;
    },
  },
});
