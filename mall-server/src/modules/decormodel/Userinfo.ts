import {
  Column,
  DataType,
  ForeignKey,
  Table,
  BelongsTo,
  HasMany,
  Model,
} from "sequelize-typescript";
import RoleModel from "./role";
import OrdersModel from "./orders";
@Table({
  tableName: "userinfo",
  timestamps: true,
  indexes: [
    { unique: true, fields: ["email"] },
    { unique: true, fields: ["phone"] },
    { unique: true, fields: ["weixin_openid"] },
  ],
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "用户ID",
  })
  userid!: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: true,
    comment: "用户名",
  })
  username!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    comment: "密码",
  })
  password!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: true,
    comment: "邮箱",
  })
  email!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    unique: true,
    comment: "手机号",
  })
  phone!: string;

  @ForeignKey(() => RoleModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "角色ID",
  })
  roleId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: true,
    comment: "微信OpenID",
  })
  weixin_openid!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    comment: "地址",
  })
  address!: string;

  @Column({
    type: DataType.TINYINT,
    comment: "账户有效性",
  })
  valid!: number;

  // 与 Role 的关联
  @BelongsTo(() => RoleModel, {
    foreignKey: "roleId",
    as: "role",
  })
  role!: RoleModel;

  // 与 Orders 的关联
  @HasMany(() => OrdersModel, {
    foreignKey: "userId", // 对应 OrdersModel 中的 userId 字段
    as: "orders", // 关联别名
  })
  orders!: OrdersModel[];
}
