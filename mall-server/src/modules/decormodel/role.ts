// 使用模型创建好处，更加方便管理，更清晰

import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "role",
})
export default class RoleModel extends Model<RoleModel> {
  @Column({
    type: DataTypes.INTEGER,
    field: "roleId",
    primaryKey: true,
    autoIncrement: true,
    comment:'角色ID'
  })
  roleId!: number;
  @Column({
    type: DataTypes.STRING(30),
    field: "roleName",
    allowNull: false,
    comment: "角色名称"
  })
   roleName!: string;
  @Column({
    type: DataTypes.INTEGER,
    field: "permissions",
    allowNull: false,
    comment: "权限 0 超级管理员 1 普通用户  2 vip用户"
  })
  permissions!: number;
}
