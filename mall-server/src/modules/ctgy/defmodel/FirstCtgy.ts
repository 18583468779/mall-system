import { sequelize } from "../../../modules/BaseDao";
import { DataTypes } from "sequelize";

class FirstCtgy {
  static createModel() {
    const model = sequelize.define(
      "firstctgy",
      {
        firstCtgyId: {
          type: DataTypes.INTEGER,
          field: "firstCtgyId",
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(30),
          field: "name",
          allowNull: false,
        },
      },
      {
        freezeTableName: true, // 使用给定的表名
        // timestamps: true, // 带上时间戳属性
      }
    );

    return model;
  }
}

export default FirstCtgy.createModel();
