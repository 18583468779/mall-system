import { sequelize } from "../../../modules/BaseDao";
import { convertToTree } from "../commonTypes";
import FirstCtgy from "../defmodel/FirstCtgy";
import { secondCtgyModel } from "../defmodel/SecCtgyModel";
import { ThirdCtgyModel } from "../../decormodel/ThirdCtgyModel";
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
    const sql = `
    SELECT 
      fc.firstctgyid,
      fc.firstctgyname,
      sc.secondctgyid,
      sc.secctgyname FROM firstctgy fc LEFT JOIN secondctgy sc ON fc.firstctgyid = sc.firstctgyid
  `;
    let res: Array<any> = (await sequelize.query(sql))[0];
    return convertToTree(res, false);
  }
  async addCtgys(type: CtgyType, name: string, id?: number) {
    // 添加分类
    switch (type) {
      case CtgyType.first:
        return await FirstCtgy.create({ firstctgyname: name });
      case CtgyType.second:
        return await secondCtgyModel.create({
          secctgyname: name,
          firstctgyId: id,
        });
      case CtgyType.third:
        return await ThirdCtgyModel.create({
          thirdctgyname: name,
          secctgyid: id,
        });
      default:
        throw new Error("Invalid category type");
    }
  }
  async deleteCtgys(type: CtgyType, id: number) {
    // 删除分类
    switch (type) {
      case CtgyType.first:
        return await FirstCtgy.destroy({ where: { firstctgyId: id } });
      case CtgyType.second:
        return await secondCtgyModel.destroy({ where: { secondctgyid: id } });
      case CtgyType.third:
        return await ThirdCtgyModel.destroy({ where: { thirdctgyid: id } });
    }
  }
  async findFirstCtgys() {
    return await FirstCtgy.findAll({
      raw: true,
    });
  }
}

export default CtgyDao.ctgyDao;
