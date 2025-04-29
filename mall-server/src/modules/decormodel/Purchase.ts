import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Booklet } from "./Booklet";
import UserinfoModel from "./Userinfo";

// 购买记录
@Table({ tableName: "purchase" })
export class Purchase extends Model<Purchase> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  purchase_id!: number;

  @ForeignKey(() => UserinfoModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id!: number;

  @ForeignKey(() => Booklet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  booklet_id!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    comment: '实际支付金额'
  })
  amount!: number;

  @Column({
    type: DataType.ENUM('pending', 'paid', 'refunded'),
    defaultValue: 'pending'
  })
  status!: string;

  // 关联关系
  @BelongsTo(() => UserinfoModel)
  user!: UserinfoModel;

  @BelongsTo(() => Booklet)
  booklet!: Booklet;
}