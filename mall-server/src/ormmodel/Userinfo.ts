// 使用模型创建好处，更加方便管理，更清晰

import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "userinfo",
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    field: "userid",
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number;
  @Column({
    type: DataTypes.STRING(30),
    field: "username",
    allowNull: false,
  })
  username!: string;
  @Column({
    type: DataTypes.STRING(20),
    field: "password",
    allowNull: false,
  })
  password!: string;
  @Column({
    type: DataTypes.STRING(50),
    field: "address",
    allowNull: true,
  })
  address!: string;
  @Column({
    type: DataTypes.TINYINT,
    field: "valid",
    allowNull: true,
  })
  valid!: string;
}
