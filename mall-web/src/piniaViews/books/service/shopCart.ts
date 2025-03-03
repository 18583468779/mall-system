import { storeToRefs } from "pinia";
import shopCart from "../../../piniaStore/shopcart";
import { BookInfo } from "../../../piniaStore/book/state";
import { ShopCartType } from "../../../piniaStore/shopcart/state";

export default class ShopCart {
  static store = shopCart();
  static storeRefs = storeToRefs(ShopCart.store);

  static async findCurUseShopCartList() {
    await ShopCart.store.findCurUseShopCartList(1);
  }
  static uptBookNumWithSCLstNum(books: BookInfo[]) {
    // 将购物车的数据赋值给bookItem
    const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];
    shopCartList.forEach((item) => {
      books.forEach((book) => {
        if (item.bookisbn === book.ISBN) {
          book.purcharsenum = item.purcharsenum;
        }
      });
    });
  }
}
