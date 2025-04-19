import { storeToRefs } from "pinia";
import bookStore from "../../piniaStore/book";
import shopListService from "../books/service/shopCart";

export default class HomeClass {
  static homeClass: HomeClass = new HomeClass();
  static store = bookStore();
  static storeRef = storeToRefs(HomeClass.store);
  static async getBookListByPage(page = 1, pageSize = 8) {
    await HomeClass.store.getBookListByPage(page, pageSize);
    addCartNumToBookList(
      HomeClass.store.getAllBookList,
      shopListService.store.getShopCartList
    );
  }
}

// 将商品购物车数量添加到图书列表中
function addCartNumToBookList(bookList: any[], cartList: any[]) {
  bookList.map((book) => {
    const cartItem = cartList.find((item) => item.bookisbn === book.ISBN);
    if (cartItem) {
      book.purcharsenum = cartItem.purcharsenum; // 将购物车数量添加到图书列表中
    } else {
      book.purcharsenum = 0; // 将购物车数量添加到图书列表中
    }
  });
}
