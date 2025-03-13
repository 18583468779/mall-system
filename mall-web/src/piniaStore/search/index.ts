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
      historyKeywordList: [] as string[], // 历史关键字列表
      historyKeywordObjList: [] as string[], // 搜索发现关键字列表
      autoCompKeyword: "", // 选中的项
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
    geHistoryKeywordObjList(state) {
      return state.historyKeywordObjList.length > 0
        ? state.historyKeywordObjList
        : storage.get("historyKeywordObjList");
    },
    getStoreAutoCompKeyword(state) {
      return state.autoCompKeyword.length > 0
        ? state.autoCompKeyword
        : storage.get("autoCompKeyword");
    },
  },
  actions: {
    storeAutoCompKeyword(autoCompKeyword: string) {
      this.autoCompKeyword = autoCompKeyword;
      storage.set("autoCompKeyword", autoCompKeyword);
    },

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
    // 获取历史关键字列表
    async getSearchHistoryKeywords() {
      const result: AxiosResponse<HistoryKeywordType[]> =
        await SearchApi.getSearchHistoryKeywords();
      this.historyKeywordList = result.data.map((item) => item.historykeyword);
      storage.set("historyKeyword", this.historyKeywordList, OPTION.NONE);
    },
    // 获取搜索关键字列表
    async searchDiscovery() {
      const result: AxiosResponse<HistoryKeywordType[]> =
        await SearchApi.searchDiscovery();
      this.historyKeywordObjList = result.data.map(
        (item) => item.historykeyword
      );
      storage.set("historyKeywordObjList", this.historyKeywordObjList);
    },
    // 删除搜索历史
    async deleteHistoryKeywords() {
      const result: AxiosResponse<any> =
        await SearchApi.deleteHistoryKeywords();
      console.log(111, result);
      this.historyKeywordList = [];
      storage.set("historyKeyword", []);
    },
  },
});

export interface KeywordType {
  id: number;
  keyword: string;
}

export interface HistoryKeywordType {
  id: number;
  historykeyword: string;
  clickcount: number;
}
