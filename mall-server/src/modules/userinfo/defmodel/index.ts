import { sequelize } from "../../BaseDao";
import { DataTypes } from "sequelize";
import RoleModel from "../../decormodel/role";
class Userinfo {
  /**
   * 创建用户信息模型
   * @returns 返回定义好的 Sequelize 模型
   */
  static createModel() {
    // 定义 userinfo 表的结构
    const model = sequelize.define(
      "userinfo", // 表名
      {
        // 定义表的字段
        userid: {
          type: DataTypes.INTEGER, // userid 字段，整数类型
          primaryKey: true, // 设置为主键
          autoIncrement: true, // 设置为自动增长
        },
        username: {
          type: DataTypes.STRING(30), // username 字段，字符串类型，最大长度 30
          allowNull: true, // 允许为空
        },
        password: {
          type: DataTypes.STRING(100), // password 字段，字符串类型，最大长度 100
          allowNull: true, // 允许为空
        },
        email: {
          type: DataTypes.STRING(50), // email 字段，字符串类型，最大长度 50
          allowNull: true, // 允许为空
          unique: true, // 唯一约束，确保 email 不重复
        },
        phone: {
          type: DataTypes.STRING(20), // phone 字段，字符串类型，最大长度 20
          allowNull: true, // 允许为空
          unique: true, // 唯一约束，确保 phone 不重复
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1, // 默认角色为普通用户（假设普通用户roleId=1）
          references: {
            model: "role", // 关联角色表
            key: "roleId",
          },
          comment: "角色ID",
        },
        weixin_openid: {
          type: DataTypes.STRING(100), // weixin_openid 字段，字符串类型，最大长度 100
          allowNull: true, // 允许为空
          unique: true, // 唯一约束，确保 weixin_openid 不重复
        },
        address: DataTypes.STRING(50), // address 字段，字符串类型，最大长度 50
        valid: DataTypes.TINYINT, // valid 字段，小整数类型
      },
      {
        // 定义模型的选项
        freezeTableName: true, // 禁止修改表名，默认 Sequelize 会将模型名转为复数形式作为表名
        timestamps: true, // 自动添加 createdAt 和 updatedAt 字段
        indexes: [
          // 定义索引
          { unique: true, fields: ["email"] }, // 为 email 字段创建唯一索引
          { unique: true, fields: ["phone"] }, // 为 phone 字段创建唯一索引
          { unique: true, fields: ["weixin_openid"] }, // 为 weixin_openid 字段创建唯一索引
        ],
      }
    );
    model.belongsTo(RoleModel, { foreignKey: "roleId" });
    RoleModel.hasMany(model, { foreignKey: "roleId" });
    model.sync({ force: false }); // 设置 force: true 会删除现有表并重新创建
    
    return model; // 返回定义好的模型
  }
}

export const model = Userinfo.createModel(); // 导出模型
