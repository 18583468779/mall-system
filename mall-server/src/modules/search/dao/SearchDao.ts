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
          [Op.like]: `%${keyword}%`,
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
    console.log("keyword", keyword);
    const sql = `insert into historykeyword  (historykeyword,clickcount) values('${keyword}',1)`;
    return sequelize.query(sql);
  }
  //更新历史关键字点击次数【每次增加1】
  updateHistoryKeywordCount(historykeyword: string): Promise<[any, any]> {
    const sql = `update historykeyword set  clickcount = clickcount+1 where historykeyword='${historykeyword}'`;
    return sequelize.query(sql);
  }
}

export default SearchDao.searchDao;
