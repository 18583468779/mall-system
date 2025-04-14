import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "shopcart",
})
export default class ShopcartModel extends Model<ShopcartModel> {
  @Column({
    type: DataType.INTEGER, // 改为整数类型
    primaryKey: true,
    autoIncrement: true     // 启用自增
  })
  shopcartid!: string;
  @Column
  public bookisbn!: string;
  @Column
  public bookname!: string;
  @Column
  public bookpicname!: string;
  @Column
  public bookprice!: number;
  @Column
  public userid!: number;
  @Column
  public purcharsenum!: number;
}
