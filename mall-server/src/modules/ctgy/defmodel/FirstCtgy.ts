import { sequelize } from "../../../modules/BaseDao";
import { DataTypes } from "sequelize";

class FirstCtgy {
  static createModel() {
    const model = sequelize.define(
      "firstctgy",
      {
        firstctgyId: {
          type: DataTypes.INTEGER,
          field: "firstctgyId",
          primaryKey: true,
          autoIncrement: true,
        },
        firstctgyname: {
          type: DataTypes.STRING(30),
          field: "firstctgyname",
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
