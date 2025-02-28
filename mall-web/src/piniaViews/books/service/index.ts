import { storeToRefs } from "pinia";
import bookStore from "../../../piniaStore/book";
import { FstToThrdCtgy } from "../../ctgy/service";

export default class Books {
  static store = bookStore();
  static storeRefs = storeToRefs(Books.store);
  static findBooksByThirdCtgyId() {
    const thirdCtgyId = FstToThrdCtgy.store.thirdCtgy.thirdctgyid;
    Books.store.findBooksByThirdCtgyId(thirdCtgyId);
  }
}
