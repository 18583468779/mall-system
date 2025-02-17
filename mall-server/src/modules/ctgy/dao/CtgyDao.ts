import { sequelize } from "../../../modules/BaseDao";
import { findSecThrdCtgysByFstCtgyId } from "../../../modules/ctgy/defmodel/OneToMany";
class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao();

  // async findSecThrdCtgys(firstctgyid: number) {
  //   return await findSecThrdCtgysByFstCtgyId(firstctgyid);
  // }

  async findSecThrdCtgys(firstctgyid: number) {
    // 原生查询二级分类和三级分类
    const sql = `select * from secondctgy sc inner join thirdctgy tc on sc.secondctgyid = tc.secctgyid where sc.firstctgyid =${firstctgyid}`;
    return (await sequelize.query(sql))[0];
  }
  async findFirstCtgys() {
    return 22222;
  }
}

export default CtgyDao.ctgyDao;
