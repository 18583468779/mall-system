import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "orders",
  comment: "订单表",
  timestamps: false,
})
export default class OrdersModel extends Model<OrdersModel> {
  // 基础支付信息（微信侧）
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: "商户订单号",
    field: "out_trade_no",
    unique: true,
  })
  public out_trade_no!: string;

  @Column({
    type: DataType.STRING(50),
    comment: "微信订单号", // 微信支付成功后回填
  })
  public transaction_id!: string;

  // 业务关联信息
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "用户ID", // 必须添加的购买者关联字段
  })
  public user_id!: number;

  @Column({
    type: DataType.STRING(128),
    allowNull: false,
    comment: "商品描述",
  })
  public description!: string;

  // 金额信息
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "金额（分）",
    validate: {
      min: 1, // 金额必须大于0
    },
  })
  public total_fee!: number;

  // 状态控制
  @Column({
    type: DataType.ENUM("pending", "success", "closed"),
    defaultValue: "pending",
    comment: "支付状态",
  })
  public status!: string;

  // 时间信息
  @Column({
    type: DataType.DATE,
    comment: "支付完成时间",
  })
  public payment_time!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    comment: "订单创建时间",
  })
  public created_at!: Date;
}
