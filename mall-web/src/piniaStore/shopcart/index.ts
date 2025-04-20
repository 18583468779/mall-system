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
        : storage.get("shopCartList");
    },
    getShopCartListIsSelected(): ShopCartType[] {
      // 获取选中的购物车
      return this.getShopCartList.filter((item) => item.checked);
    },
  },
  actions: {
    storeShopCartList(shopCartList: ShopCartType[]) {
      this.shopCartList = shopCartList;
      storage.set("shopCartList", shopCartList);
    },
    /**
     * 清空购物车
     * @param {boolean} isSelected - 该参数未被使用，可能用于后续扩展功能，判断是否仅清空选中的商品
     */
    clearShopCartList(isSelected: boolean) {
      // 清空购物车
      if (isSelected) {
        // 仅清空选中的商品
        this.shopCartList = this.shopCartList.filter((item) => !item.checked);
        storage.set("shopCartList", this.shopCartList);
        return;
      }
      this.shopCartList = [];
      storage.remove("shopCartList");
    },

    async findCurUseShopCartList(userid: number) {
      // 获取购物车列表
      const res: AxiosResponse<ShopCartType[]> =
        await shopCartApi.getShopCartList(userid);
      const shopCartList = this.getShopCartList; // 获取现有购物车列表;
      if (shopCartList && shopCartList.length > 0) {
        // 如果购物车列表不为空，则合并购物车列表

        const newShopCartList = res.data.map((item) => {
          const shopCart = shopCartList.find(
            (shopCart) =>
              shopCart.shopcartid == item.shopcartid &&
              shopCart.userid == item.userid
          );
          if (shopCart) {
            // 如果购物车列表中存在该商品，则更新购物车列表中的商品数量
            item.checked = shopCart.checked;
            return shopCart;
          }
          return item;
        });
        this.shopCartList = newShopCartList; // 更新购物车列表
        storage.set("shopCartList", newShopCartList); // 保存购物车列表到本地存储
        return;
      }
      this.shopCartList = res.data; // 更新购物车列表
      storage.set("shopCartList", res.data); // 保存购物车列表到本地存储
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
