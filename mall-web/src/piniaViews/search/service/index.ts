import { ref } from "vue";

export default class SearchClass {
  static isOpenAutoComplete = ref(false); // 是否自动补全搜索框
  static searchKeywords() {
    SearchClass.isOpenAutoComplete.value = true;
  }
  static closeKeywords() {
    SearchClass.isOpenAutoComplete.value = false;
  }
}
