import { sequelize } from "../../../modules/BaseDao";
import { EvaluationTransformer } from "../convert";

class EvaluateDao {
  static ctgyDao: EvaluateDao = new EvaluateDao();
  /**
   * 查找指定ISBN的评价回复列表
   * @param isbn - 书籍的ISBN编号
   */
  async findEvaluateReplyList(isbn: string) {
    const sql = `select * from evaluate e left outer join dangdang.reply r on e.evaluateid=r.evalid where e.isbn='${isbn}';`;
    const res = (await sequelize.query(sql))[0];
    return EvaluationTransformer.transform(res);
  }
}

export default EvaluateDao.ctgyDao;
