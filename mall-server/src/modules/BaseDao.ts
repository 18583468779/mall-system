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
      pool: {
        //数据库连接池
        max: 10, // 最大链接对象的个数
        min: 5, //最小连接数
        idle: 10000, // 空闲链接最大等待时间，单位为毫秒
        acquire: 1000, // 表示一条sql查询在获取链接资源之前的最大等待时间，单位秒
      },
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
