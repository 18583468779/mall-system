import { storeToRefs } from "pinia";
import shopCart from "../../../piniaStore/shopcart";
import { BookInfo } from "../../../piniaStore/book/state";
import { ShopCartType } from "../../../piniaStore/shopcart/state";
import Books from ".";
import storage from "../../../utils/goodStorageUtil";
import { ElMessageBox } from "element-plus";
import { computed } from "vue";
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
      bookprice: bookitem.originalprice * bookitem.discount,
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
    const currentShopCart = ShopCart.getCurrentShopCart(bookitem);
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
  static getCurrentShopCart(bookitem: BookInfo) {
    //根据图书id获取购物车
    const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];
    const currentShopCart = shopCartList.filter(
      (item) => item.bookisbn === bookitem.ISBN
    )[0];
    return currentShopCart;
  }
  static delBookFrmSc(bookitem: BookInfo) {
    //删除一条数据
    ElMessageBox.confirm("确认要删除这个数据吗?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];
      const currentShopCart = ShopCart.getCurrentShopCart(bookitem);
      if (currentShopCart.shopcartid) {
        const res = await ShopCart.store.delBookFrmSc(
          currentShopCart.shopcartid
        );
        if (res !== 1) return; // 如果成功删除购物车
        const newList = shopCartList.filter(
          (item) => item.bookisbn !== bookitem.ISBN
        );
        storage.set("shopCartList", newList);
        ShopCart.store.shopCartList = newList;
        const bookList = Books.store.getBookList as BookInfo[];
        bookList.forEach((item) => {
          if (item.ISBN === bookitem.ISBN) {
            item.purcharsenum = 0; // 清空图书的数量
          }
          return item;
        });
        Books.store.bookList = bookList;
      }
    });
  }
  static refreshShopCartList() {
    // 计算购物车的数量和价格
    const totalCount = computed(() => {
      let total = 0; //数量
      const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];
      if (shopCartList && shopCartList.length > 0) {
        shopCartList.forEach((s) => {
          total += s.purcharsenum;
        });
      }
      return total;
    });
    const totalPrice = computed(() => {
      let totalPrice_ = 0; //数量
      const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];
      if (shopCartList && shopCartList.length > 0) {
        shopCartList.forEach((s) => {
          totalPrice_ += s.purcharsenum * s.bookprice;
        });
      }
      return procDecimalZero(totalPrice_);
    });
    return { totalCount, totalPrice };
  }
}

function procDecimalZero(num: number) {
  let strValue = num.toString();
  const splitValues = strValue.split(".");
  if (splitValues.length === 1) {
    // 整数
    strValue = strValue + ".00";
  } else if (splitValues.length > 1) {
    // 只有一位小数
    if (splitValues[1].length === 1) {
      strValue = strValue + "0";
    } else if (splitValues[1].length > 2) {
      // 大于两位小数
      strValue = num.toFixed(2).toString();
    }
  }
  return strValue as any as number;
}
