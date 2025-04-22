import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
  } from "sequelize-typescript";
  import OrderInfoModel from "./orderinfo"; // 请确保路径正确
  
  @Table({
    tableName: "orderdetail",
    comment: "订单详情表",
    timestamps: false, // 根据需求决定是否启用时间戳
  })
  export default class OrderDetailModel extends Model<OrderDetailModel> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "订单详情id",
    })
    orderdetailid!: number;
  
    @Column({
      type: DataType.STRING(50),
      allowNull: false,
      comment: "图书名",
    })
    bookname!: string;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
      comment: "图书价格",
      get() {
        return parseFloat(this.getDataValue("bookprice"));
      },
    })
    bookprice!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      comment: "图书图片名",
    })
    bookpicname!: string;
  
    @ForeignKey(() => OrderInfoModel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      comment: "外键订单id",
      onUpdate: "CASCADE", // 对应 ON UPDATE CASCADE
    })
    orderid!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      comment: "图书数量",
      validate: {
        min: 1, // 数量最小为1
      },
    })
    purcharsenum!: number;
  
    // 定义关联关系
    @BelongsTo(() => OrderInfoModel, {
      foreignKey: "orderid",
      onUpdate: "CASCADE",
    })
    orderInfo!: OrderInfoModel;
  }
  