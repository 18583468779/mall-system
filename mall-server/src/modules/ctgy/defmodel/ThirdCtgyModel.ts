// 三级分类模型
import { DataTypes } from "sequelize";
import { sequelize } from "../../BaseDao";
class ThirdCtgyModel {
  static createModel() {
    const model = sequelize.define(
      "thirdctgy",
      {
        thirdctgyid: {
          type: DataTypes.INTEGER,
          field: "thirdctgyid",
          primaryKey: true,
          autoIncrement: true,
        },
        thirdname: {
          type: DataTypes.STRING(30),
          field: "thirdname",
          allowNull: false,
        },
        secctgyid: {
          type: DataTypes.INTEGER,
          field: "secctgyid",
          allowNull: false,
        },
      },
      {
        freezeTableName: true, // 使用给定的表名
        // timestamps: true, // 带上时间戳属性
      }
    );
    model.sync({ force: false }); // 设置 force: true 会删除现有表并重新创建

    return model;
  }
}

export const thirdCtgyModel = ThirdCtgyModel.createModel();
