/**
 * 定义模型
 */
import { sequelize } from "../dao/BaseDaoDefine";
import { DataTypes } from "sequelize";

class Userinfo {
  static createModel() {
    return sequelize.define(
      "userinfo",
      {
        userid: {
          type: DataTypes.INTEGER,
          field: "userid",
          primaryKey: true, // 主建
          autoIncrement: true, // 自动增长
        },
        username: {
          type: DataTypes.STRING(30),
          field: "username",
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(20),
          field: "password",
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(50),
          field: "address",
          allowNull: true,
        },
        valid: {
          type: DataTypes.TINYINT,
          field: "valid",
          allowNull: true,
        },
      },
      {
        freezeTableName: true, // 使用给定的表明
        timestamps: true, // 带上时间戳属性
      }
    );
  }
}

export const model = Userinfo.createModel();

// 同步模型到数据库
(async () => {
  try {
    await sequelize.sync({ force: false }); // 设置 force: true 会删除现有表并重新创建
    console.log("数据库表同步成功");
  } catch (error) {
    console.error("数据库表同步失败:", error);
  }
})();
