/**
 * 链接数据库
 */
import { Dialect } from "sequelize";
import dbConConf from "../config/dbconfig";
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
  }
}

export const { sequelize } = BaseDaoDefine.baseDaoOrm;
