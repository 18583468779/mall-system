import { combine } from "../../../modules/commontypes";
import searchDao from "../dao/SearchDao";
class SearchService {
  static searchService: SearchService = new SearchService();
  // 新增或更新历史关键字
  async addOrUpdateHistoryKeyword(historykeyword: string) {
    const dbHistoryKeyword = await searchDao.searchHistoryKeywords(
      historykeyword
    ); // 判断是否有当前历史关键字
    if (dbHistoryKeyword) {
      const result: [{ affectedRows: number }, any] =
        await searchDao.updateHistoryKeywordCount(historykeyword);
      return result[0].affectedRows;
    } else {
      const result: [number, number] = await searchDao.saveHistoryKeywords(
        historykeyword
      );
      return result[0];
    }
  }
  // 搜索关键字列表
  async SearchKeywords(key: string) {
    return await searchDao.searchKeywords(key);
  }
}

export default SearchService.searchService;
