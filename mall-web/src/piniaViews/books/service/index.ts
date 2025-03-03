import { storeToRefs } from "pinia";
import bookStore from "../../../piniaStore/book";
import { FstToThrdCtgy } from "../../ctgy/service";
import { ref } from "vue";
import ShopCart from "./shopCart";

export default class Books {
  static store = bookStore();
  static storeRefs = storeToRefs(Books.store);
  static isReadAsc = ref(true); //控制价格升序还是降序图标显示
  static sortField = ref(""); // 排序字段
  static ascOrDesc = ref("desc"); // 降序还是升序排列图书
  static async findBooksByThirdCtgyId(
    sortField: string = "originalprice",
    ascOrdesc: string = "asc"
  ) {
    // 根据三级分类查找图书
    const thirdCtgyId = FstToThrdCtgy.store.thirdCtgy.thirdctgyid;
    await Books.store.findBooksByThirdCtgyId(thirdCtgyId, sortField, ascOrdesc);
    // 获取购物车信息
    await ShopCart.findCurUseShopCartList();
  }
  static findBooksBySecondCtgyId() {
    // 根据二级分类查找图书
    const secondctgyid = FstToThrdCtgy.store.getSecondCtgy.secondctgyid;
    Books.store.findBooksBySecondCtgyId(secondctgyid);
  }
  static sortBook(sortField: string) {
    // 图书排序
    if (sortField === "price") {
      Books.isReadAsc.value = !Books.isReadAsc.value;
    }
    Books.sortField.value = sortField;
    Books.ascOrDesc.value = Books.ascOrDesc.value === "desc" ? "asc" : "desc";
    Books.findBooksByThirdCtgyId(sortField, Books.ascOrDesc.value);
  }
}
