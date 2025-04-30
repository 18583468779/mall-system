import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "orders",
  comment: "订单表",
  timestamps: false,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['status'] } // 新增状态索引
  ]
})
export default class OrdersModel extends Model<OrdersModel> {
  // 基础支付信息
  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    comment: "商户订单号",
    unique: true,
    field: "out_trade_no"
  })
  public outTradeNo!: string;

  // 修改为通用支付交易号字段
  @Column({
    type: DataType.STRING(64),
    comment: "支付平台交易号（微信/支付宝）",
    field: "payment_transaction_id"
  })
  public paymentTransactionId!: string;

  // 新增支付渠道字段
  @Column({
    type: DataType.ENUM('wechat', 'alipay'),
    allowNull: false,
    defaultValue: 'wechat',
    comment: "支付渠道"
  })
  public paymentChannel!: string;

  // 用户关联
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "用户ID",
    field: "user_id"
  })
  public userId!: number;

  // 商品类型系统
  @Column({
    type: DataType.ENUM('vip', 'file', 'bundle'),
    allowNull: false,
    comment: "商品类型"
  })
  public productType!: string;

  // 金额系统
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: { min: 1 },
    comment: "实付金额（单位：分）"
  })
  public totalFee!: number;

  @Column({
    type: DataType.INTEGER,
    comment: "原价（单位：分）",
    defaultValue: 0
  })
  public originalFee!: number;

  // 新增货币类型字段
  @Column({
    type: DataType.STRING(3),
    defaultValue: 'CNY',
    comment: "货币类型（ISO 4217）"
  })
  public currency!: string;

  // 状态控制
  @Column({
    type: DataType.ENUM("pending", "processing", "success", "closed", "refunded"),
    defaultValue: "pending",
    comment: "订单状态"
  })
  public status!: string;

  // 新增支付扩展信息
  @Column({
    type: DataType.JSON,
    comment: "支付平台返回数据",
    defaultValue: {}
  })
  public paymentData!: Record<string, any>;

  // 时间系统
  @Column({
    type: DataType.DATE,
    comment: "支付完成时间"
  })
  public paymentTime!: Date;

  // 商品关联
  @Column({
    type: DataType.INTEGER,
    comment: "商品ISBN编码",
    allowNull: true
  })
  public isbn!: number | null;

  // 新增退款相关字段
  @Column({
    type: DataType.STRING(255),
    comment: "退款原因",
    allowNull: true
  })
  public refundReason!: string | null;

  @Column({
    type: DataType.DATE,
    comment: "退款时间",
    allowNull: true
  })
  public refundTime!: Date | null;

  @Column({
    type: DataType.STRING(512),
    comment: "系统生成描述"
  })
  public description!: string;
}
