import { defineStore } from "pinia";

export const initKeywordVal = "请输入关键字";

export default defineStore("searchStore", {
  state: () => {
    return {
      keyword: initKeywordVal,
    };
  },
  getters: {
    getKeyword(state) {
      return state.keyword;
    },
  },
  actions: {
    storeKeyword(keyword: string = "") {
      this.keyword = keyword;
    },
  },
});
