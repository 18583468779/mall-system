import { defineStore } from "pinia";
import SearchApi from "../../api/SearchApi";
import { AxiosResponse } from "axios";
import storage, { OPTION } from "../../utils/goodStorageUtil";

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
    getHistoryKeywordList(state) {
      return state.historyKeywordList.length > 0
        ? state.historyKeywordList
        : storage.get("historyKeyword");
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
    async addOrUpdateHistoryKeyword(historyKeyword: string) {
      const result: AxiosResponse<number> =
        await SearchApi.addOrUpdateHistoryKeyword(historyKeyword);
      if (result.data > 0) {
        // 新增历史关键字成功，设置缓存
        const histotyList = storage.set(
          "historyKeyword",
          historyKeyword,
          OPTION.ACCUMU
        );
        this.historyKeywordList = histotyList;
      }
    },
  },
});

export interface KeywordType {
  id: number;
  keyword: string;
}
