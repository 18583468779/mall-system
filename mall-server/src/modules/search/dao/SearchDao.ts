import { sequelize } from "../../../modules/BaseDao";
import KeywordModel from "../../../modules/decormodel/keyword";
import HistoryKeywordModel from "../../../modules/decormodel/historykeyword";
import { Op } from "sequelize";
import historyKeywordModel from "../../../modules/decormodel/historykeyword";

class SearchDao {
  static searchDao: SearchDao = new SearchDao();
  // 根据输入的关键字查询关键字列表
  searchKeywords(keyword: string) {
    return KeywordModel.findAll({
      raw: true,
      where: {
        keyword: { [Op.like]: `%${keyword}%` },
      },
    });
  }
  // 查询是否存在该历史关键字
  searchHistoryKeywords(keyword: string) {
    return HistoryKeywordModel.findOne({
      raw: true,
      where: {
        historykeyword: {
          [Op.like]: `${keyword}`,
        },
      },
    });
  }
  // 获取历史关键字列表
  getSearchHistoryKeywords() {
    return historyKeywordModel.findAll({
      raw: true,
    });
  }
  // 保存历史关键字
  saveHistoryKeywords(keyword: string): Promise<[any, any]> {
    const sql = `insert into historykeyword  (historykeyword,clickcount) values('${keyword}',1)`;
    return sequelize.query(sql);
  }
  //更新历史关键字点击次数【每次增加1】
  updateHistoryKeywordCount(historykeyword: string): Promise<[any, any]> {
    const sql = `update historykeyword set  clickcount = clickcount+1 where historykeyword='${historykeyword}'`;
    return sequelize.query(sql);
  }
  // 搜索发现降序查询
  searchDiscovery() {
    return HistoryKeywordModel.findAll({
      order: [["clickcount", "desc"]],
      raw: true,
      offset: 0,
      limit: 6,
    });
  }
  // 删除历史关键字列表
  deleteHistoryKeywords(): Promise<[any, any]> {
    const sql = `delete from historykeyword`;
    return sequelize.query(sql);
  }
}

export default SearchDao.searchDao;
