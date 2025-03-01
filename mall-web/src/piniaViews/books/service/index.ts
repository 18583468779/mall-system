import { storeToRefs } from "pinia";
import bookStore from "../../../piniaStore/book";
import { FstToThrdCtgy } from "../../ctgy/service";

export default class Books {
  static store = bookStore();
  static storeRefs = storeToRefs(Books.store);
  static findBooksByThirdCtgyId() {
    // 根据三级分类查找图书
    const thirdCtgyId = FstToThrdCtgy.store.thirdCtgy.thirdctgyid;
    Books.store.findBooksByThirdCtgyId(thirdCtgyId);
  }
  static findBooksBySecondCtgyId() {
    // 根据二级分类查找图书
    const secondctgyid = FstToThrdCtgy.store.getSecondCtgy.secondctgyid;
    Books.store.findBooksBySecondCtgyId(secondctgyid);
  }
}
