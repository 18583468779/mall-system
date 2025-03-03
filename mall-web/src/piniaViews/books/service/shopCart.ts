import { storeToRefs } from "pinia";
import shopCart from "../../../piniaStore/shopcart";

export default class ShopCart {
  static store = shopCart();
  static storeRefs = storeToRefs(ShopCart.store);

  static async findCurUseShopCartList() {
    await ShopCart.store.findCurUseShopCartList(1);
  }
}
