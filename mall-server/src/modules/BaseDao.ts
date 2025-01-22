/**
 * 链接数据库
 */
import { Dialect } from "sequelize";
import dbConConf from "../config/dbconfig";
import path from "path";
import { Sequelize } from "sequelize-typescript";

class BaseDao {
  static baseDao: BaseDao = new BaseDao();
  sequelize!: Sequelize;
  constructor() {
    this.initSeqConf("mysql");
  }
  initSeqConf(dialect: Dialect) {
    let { host, user, password, database, port } = dbConConf.getConf();
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect,
      define: { timestamps: false, freezeTableName: true },
    });
  }
  addModels() {
    const modelPath = path.join(process.cwd(), "/src/modules/decormodel");
    this.sequelize.addModels([modelPath]);
  }
}
const baseDao = BaseDao.baseDao;
baseDao.addModels();
export const { sequelize } = baseDao;
