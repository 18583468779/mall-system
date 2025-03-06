import { storeToRefs } from "pinia";
import shopCart from "../../../piniaStore/shopcart";
import { BookInfo } from "../../../piniaStore/book/state";
import { ShopCartType } from "../../../piniaStore/shopcart/state";
import Books from ".";

export default class ShopCart {
  static store = shopCart();
  static storeRefs = storeToRefs(ShopCart.store);

  static async findCurUseShopCartList() {
    await ShopCart.store.findCurUseShopCartList(1);
  }
  static async addBookToShopCart(bookitem: BookInfo) {
    // 添加图书到购物车
    const shopcart: ShopCartType = {
      userid: 1,
      checked: false,
      bookisbn: bookitem.ISBN,
      bookname: bookitem.bookname,
      bookpicname: bookitem.bookpicname,
      bookprice: bookitem.originalprice,
      purcharsenum: 1,
    };
    ShopCart.store.addBookToShopCart(shopcart);
    Books.updateBookNum(1, bookitem.ISBN);
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
  static addOrSubtrBookToShopCart(bookitem: BookInfo, type: "add" | "sub") {
    // 增加或者减少购物车图书数量
    const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];

    const currentShopCart = shopCartList.filter(
      (item) => item.bookisbn === bookitem.ISBN
    )[0];
    if (type === "add") {
      currentShopCart.purcharsenum += 1;
      bookitem.purcharsenum += 1;
    }
    if (type === "sub") {
      currentShopCart.purcharsenum -= 1;
      bookitem.purcharsenum -= 1;
    }

    ShopCart.store.addOrSubtrBookToShopCart(currentShopCart);
  }
}
