/**
 * 链接数据库
 */
import { Dialect } from "sequelize";
import dbConConf from "../config/dbconfig";
import path from "path";
import { Sequelize } from "sequelize-typescript";

class BaseDaoDefine {
  static baseDaoOrm: BaseDaoDefine = new BaseDaoDefine();
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
    this.addModels(); // 加入模型
  }
  addModels() {
    const modelPath = path.join(process.cwd(), "/src/ormmodel");
    this.sequelize.addModels([modelPath]);
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm;
