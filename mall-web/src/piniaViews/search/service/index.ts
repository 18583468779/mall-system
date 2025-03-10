import { ref } from "vue";
import searchStore, { initKeywordVal } from "../../../piniaStore/search";
import { storeToRefs } from "pinia";
export default class SearchClass {
  static isOpenAutoComplete = ref(false); // 是否自动补全搜索框
  static store = searchStore();
  static storeRefs = storeToRefs(SearchClass.store);
  static searchKeywords() {
    const keyword = SearchClass.getKeywordFrmStore();
    if (!keyword) {
      SearchClass.showOrCloseAutoComplete(false);
    } else {
      SearchClass.showOrCloseAutoComplete(true);
    }
  }
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
}
