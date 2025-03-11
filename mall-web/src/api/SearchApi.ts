import request from "../utils/axiosUtil";

class SearchAPI {
  static api: SearchAPI = new SearchAPI();
  // 搜索关键字列表
  SearchKeywords(key: string) {
    return request.get(`/searchmodule/SearchKeywords/${key}`, false);
  }
  addOrUpdateHistoryKeyword(key: string) {
    return request.post(`/searchmodule/addOrUpdateHistoryKeyword}`, false, key);
  }
}

export default SearchAPI.api;
