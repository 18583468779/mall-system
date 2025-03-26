import { storeToRefs } from "pinia";
import bookStore from "../../piniaStore/book";
export default class HomeClass {
  static homeClass: HomeClass = new HomeClass();
  static store = bookStore();
  static storeRef = storeToRefs(HomeClass.store);
  static async getBookListByPage(page = 1, pageSize = 4) {
    await HomeClass.store.getBookListByPage(page, pageSize);
  }
}
