// 二级分类模型
import { DataTypes } from "sequelize";
import { sequelize } from "../../BaseDao";
class SecondCtgyModel {
  static createModel() {
    const model = sequelize.define(
      "secondctgy",
      {
        secondctgyid: {
          type: DataTypes.INTEGER,
          field: "secondctgyid",
          primaryKey: true,
          autoIncrement: true,
        },
        secctgyname: {
          type: DataTypes.STRING(30),
          field: "secctgyname",
          allowNull: false,
        },
        firstctgyId: {
          type: DataTypes.INTEGER,
          field: "firstctgyId",
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

export const secondCtgyModel = SecondCtgyModel.createModel();
