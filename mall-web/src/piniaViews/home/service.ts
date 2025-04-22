import { storeToRefs } from "pinia";
import bookStore from "../../piniaStore/book";
import userInfo from "../../piniaStore/userInfo";
import shopListService from "../books/service/shopCart";

export default class HomeClass {
  static homeClass: HomeClass = new HomeClass();
  static store = bookStore();
  static userInfoStore = userInfo();
  static storeRef = storeToRefs(HomeClass.store);
  static async getBookListByPage(page = 1, pageSize = 8, isMobile = false) {
    await HomeClass.store.getBookListByPage(page, pageSize, isMobile);
    const storeLoginUser = HomeClass.userInfoStore.storeLoginUser;
    storeLoginUser &&
      shopListService.store.findCurUseShopCartList(storeLoginUser.userid);
  }
}
