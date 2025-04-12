import { sequelize } from "../../../modules/BaseDao";
import { convertToTree } from "../commonTypes";
import FirstCtgy from "../defmodel/FirstCtgy";
import convert from "../moduletypes";

export enum CtgyType {
  first = 1, // 一级分类
  second = 2, // 二级分类
  third = 3, // 三级分类
}

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao();
  async findSecThrdCtgys(firstctgyid: number) {
    // 原生查询二级分类和三级分类
    const sql = `select * from secondctgy sc inner join thirdctgy tc on sc.secondctgyid = tc.secctgyid where sc.firstctgyid =${firstctgyid}`;
    let res: Array<any> = (await sequelize.query(sql))[0];
    return convert(res);
  }
  async findAllCtgys() {
    // 使用LEFT JOIN保留所有层级
    const sql = `
      SELECT 
        fc.firstctgyid,
        fc.firstctgyname,
        sc.secondctgyid,
        sc.secctgyname,
        tc.thirdctgyid,
        tc.thirdctgyname
      FROM firstctgy fc
      LEFT JOIN secondctgy sc ON fc.firstctgyid = sc.firstctgyid
      LEFT JOIN thirdctgy tc ON sc.secondctgyid = tc.secctgyid
    `;

    const res: any = (await sequelize.query(sql))[0];
    return convertToTree(res);
  }

  async findSecCtgys() {
    // 查找所有的一级和二级分类
    const sql = `select * from firstctgy fc inner join secondctgy sc on fc.firstctgyid = sc.firstctgyid`;
    let res: Array<any> = (await sequelize.query(sql))[0];
    return convertToTree(res);
  }
  async addCtgys(type: CtgyType, name: string) {
    // 添加分类
    switch (type) {
      case CtgyType.first:
        return await FirstCtgy.create({ firstctgyname: name });
    }
  }
  async findFirstCtgys() {
    return await FirstCtgy.findAll({
      raw: true,
    });
  }
}

export default CtgyDao.ctgyDao;
