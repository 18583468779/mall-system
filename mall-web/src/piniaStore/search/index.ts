import { defineStore } from "pinia";
import SearchApi from "../../api/SearchApi";
import { AxiosResponse } from "axios";

export const initKeywordVal = "请输入关键字";

export default defineStore("searchStore", {
  state: () => {
    return {
      keyword: initKeywordVal, // 当前关键字
      keywordList: [] as KeywordType[], // 关键字列表
      historyKeywordList: [], // 历史关键字列表
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
    async searchKeywords(key: string) {
      const result: AxiosResponse<KeywordType[]> =
        await SearchApi.SearchKeywords(key);
      this.keywordList = result.data;
    },
  },
});

export interface KeywordType {
  id: number;
  keyword: string;
}
