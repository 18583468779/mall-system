import { ref } from "vue";
import searchStore, { initKeywordVal } from "../../../piniaStore/search";
import { storeToRefs } from "pinia";
import { ElMessage, ElMessageBox } from "element-plus";
import bookStore, { Operate } from "../../../piniaStore/book";
import router from "../../../router";
export default class SearchClass {
  static isOpenAutoComplete = ref(false); // 是否自动补全搜索框
  static store = searchStore();
  static bkStore = bookStore();
  static storeRefs = storeToRefs(SearchClass.store);
  static init() {
    if (!SearchClass.store.getHistoryKeywordList) {
      SearchClass.store.getSearchHistoryKeywords();
    }
    if (!SearchClass.store.geHistoryKeywordObjList) {
      SearchClass.store.searchDiscovery();
    }
  }
  static searchKeywords = debounce(async () => {
    const keyword = SearchClass.getKeywordFrmStore();
    if (!keyword) {
      SearchClass.showOrCloseAutoComplete(false);
    } else {
      await SearchClass.store.searchKeywords(keyword);
      SearchClass.showOrCloseAutoComplete(true);
    }
  }, 400);
  static getKeywordFrmStore() {
    return SearchClass.store.keyword;
  }
  static showOrCloseAutoComplete(flag: boolean) {
    SearchClass.isOpenAutoComplete.value = flag;
  }
  static async resetKeyword() {
    // 输入框失去焦点重置关键字
    const keyword = SearchClass.getKeywordFrmStore();

    if (keyword === initKeywordVal) {
      SearchClass.store.storeKeyword();
    } else {
      SearchClass.showOrCloseAutoComplete(true);
    }
  }
  static closeKeywords() {
    const keyword = SearchClass.getKeywordFrmStore();

    if (!keyword) {
      SearchClass.store.storeKeyword(initKeywordVal);
    }
    SearchClass.showOrCloseAutoComplete(false);
  }
  static async searchBookByKey(key: string) {
    // 根据关键字搜索图书
    await SearchClass.store.addOrUpdateHistoryKeyword(key);
    SearchClass.showOrCloseAutoComplete(false);
    SearchClass.bkStore.storeOperate(Operate.AUTOCOMPKEYWORD);
    SearchClass.store.storeAutoCompKeyword(key);
    router.push({ name: "books" });
  }
  static deleteHistoryKeywords() {
    ElMessageBox.confirm("确认要删除搜索历史吗?", "Warning", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        await SearchClass.store.deleteHistoryKeywords();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      })
      .catch(() => {});
  }
}
/**
 * 防抖
 *
 */
type CommonFunType = (...args: any) => any;
function debounce<T extends CommonFunType>(fn: T, wait: number = 200): any {
  let timer: any = 0;
  return function () {
    if (timer) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn();
      timer = 0;
    }, wait);
  };
}
