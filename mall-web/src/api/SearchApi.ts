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
  // 获取历史关键字列表
  getSearchHistoryKeywords() {
    return request.get(`/searchmodule/getSearchHistoryKeywords`, false);
  }
  // 获取搜索发现列表
  searchDiscovery() {
    return request.get(`/searchmodule/searchDiscovery`, false);
  }
  // 删除历史数据
  deleteHistoryKeywords() {
    return request.post(`/searchmodule/deleteHistoryKeywords`, false);
  }
}

export default SearchAPI.api;
