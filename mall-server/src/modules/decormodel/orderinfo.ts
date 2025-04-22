import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "orderinfo",
  comment: '订单信息表', // 添加表注释
  timestamps: false // 禁用默认时间戳字段
})
export default class OrderInfoModel extends Model<OrderInfoModel> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: 'id'
  })
  public orderid!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '订单时间',
    field: 'ordertime' // 显式指定字段名（如果属性名与字段名不一致时需配置）
  })
  public ordertime!: Date | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '客户id'
  })
  public customerid!: number | null;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    comment: '订单状态'
  })
  public orderstatus!: number | null;
}
