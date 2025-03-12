import request from "../utils/axiosUtil";

class SearchAPI {
  static api: SearchAPI = new SearchAPI();
  // 搜索关键字列表
  SearchKeywords(key: string) {
    return request.get(`/searchmodule/SearchKeywords/${key}`, false);
  }
  addOrUpdateHistoryKeyword(historykeyword: string) {
    return request.post(`/searchmodule/addOrUpdateHistoryKeyword`, false, {
      historykeyword,
    });
  }
}

export default SearchAPI.api;
