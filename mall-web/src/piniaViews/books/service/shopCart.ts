import { storeToRefs } from "pinia";
import shopCart from "../../../piniaStore/shopcart";
import { BookInfo } from "../../../piniaStore/book/state";
import { ShopCartType } from "../../../piniaStore/shopcart/state";
import Books from ".";
import storage from "../../../utils/goodStorageUtil";
import { ElMessageBox } from "element-plus";
import { computed, nextTick, Ref, ref } from "vue";
import router from "../../../router";

type BallType = {
  showOrHidden: boolean;
  curTarget?: EventTarget;
};

export default class ShopCart {
  static store = shopCart();
  static storeRefs = storeToRefs(ShopCart.store);
  static isSelectAll = ref(false); // 是否全选购物车
  static ball: Ref<BallType> = ref({ showOrHidden: false });

  static clearShopCartList(isSelected: boolean) {
    // 清空购物车
    ShopCart.store.clearShopCartList(isSelected);
  }
  static checkEveryCheckBox() {
    // 选中购物车列表的商品
    const isSelectAll = ShopCart.store.getShopCartList.every(
      (shopCart) => shopCart.checked
    );
    ShopCart.store.storeShopCartList(ShopCart.store.getShopCartList);
    ShopCart.isSelectAll.value = isSelectAll;
  }
  static selectAll() {
    //选择全部购物车列表
    const shopList = ShopCart.store.getShopCartList.map((shopCart) => {
      shopCart.checked = ShopCart.isSelectAll.value;
      return shopCart;
    });
    ShopCart.store.shopCartList = shopList;
  }
  static async findCurUseShopCartList() {
    await ShopCart.store.findCurUseShopCartList(1);
  }
  static addBkToShopCartWrapper(bookitem: BookInfo) {
    if (storage.get("token")) {
      //已经登录
      ShopCart.addBookToShopCart(bookitem);
    } else router.push("/login");
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
  static addOrSubtrBookToShopCart(
    bookitem: BookInfo,
    type: "add" | "sub",
    event?: MouseEvent
  ) {
    // 增加或者减少购物车图书数量
    const currentShopCart = ShopCart.getCurrentShopCart(bookitem);
    if (type === "add") {
      currentShopCart.purcharsenum += 1;
      bookitem.purcharsenum += 1;
      // 小球动画
      ShopCart.drop(event!);
    }
    if (type === "sub") {
      currentShopCart.purcharsenum -= 1;
      bookitem.purcharsenum -= 1;
    }
    ShopCart.store.addOrSubtrBookToShopCart(currentShopCart);
    Books.updateBookNum(currentShopCart.purcharsenum, bookitem.ISBN); // ✅ 正确参数
  }
  static getCurrentShopCart(bookitem: BookInfo) {
    //根据图书id获取购物车
    const shopCartList = ShopCart.store.getShopCartList as ShopCartType[];
    const currentShopCart = shopCartList.filter(
      (item) => item.bookisbn == bookitem.ISBN
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
          (item) => item.bookisbn != bookitem.ISBN
        );
        storage.set("shopCartList", newList);
        ShopCart.store.shopCartList = newList;
        const bookList = Books.store.getAllBookList;
        const bookDetail = Books.store.bookDetail;
        if (bookDetail && bookDetail.ISBN == bookitem.ISBN) {
          // 如果删除的是当前图书
          bookDetail.purcharsenum = 0; // 清空图书的数量
          Books.store.bookDetail = bookDetail;
        }
        bookList.forEach((item: any) => {
          if (item.ISBN == bookitem.ISBN) {
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
          if (!s.checked) return;
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
          if (!s.checked) return;
          totalPrice_ += s.purcharsenum * s.bookprice;
        });
      }
      return procDecimalZero(totalPrice_);
    });
    return { totalCount, totalPrice };
  }
  static drop(event: MouseEvent) {
    ShopCart.ball.value.showOrHidden = true;
    ShopCart.ball.value.curTarget = event.currentTarget!;
  }
  static beforeDrop(ele: Element) {
    const addBtn = <HTMLBodyElement>ShopCart.ball.value.curTarget;
    const addRect = addBtn.getBoundingClientRect();
    const x = addRect.left - 35;
    const y = -(window.innerHeight - addRect.top - 45);
    (ele as HTMLBodyElement).style.transform = `translate3d(0,${y}px,0)`;
    const inner = ele.querySelector(".inner") as HTMLBodyElement;
    inner.style.transform = `translate3d(${x}px,0,0)`;
  }
  static dropping(ele: Element, done: (...args: any) => any) {
    document.body.scrollHeight;
    (ele as HTMLBodyElement).style.transform = `translate3d(0,0,0)`;
    const inner = ele.querySelector(".inner") as HTMLBodyElement;
    inner.style.transform = `translate3d(0,0,0)`;
    done();
  }
  static afterDrop(ele: Element) {
    ShopCart.ball.value.showOrHidden = false;
    ShopCart.ball.value.curTarget = undefined;
  }
  static handleToCart() {
    router.push("/shopCartList");
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
