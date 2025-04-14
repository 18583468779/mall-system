import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "books",
})
export default class BooksModel extends Model<BooksModel> {
  @Column({
    type: DataType.INTEGER, // 改为整数类型
    primaryKey: true,
    autoIncrement: true     // 启用自增
  })
  ISBN!: number;
  @Column
  public bookname!: string;
  @Column
  public author!: string;
  @Column
  public publishid!: string;
  @Column
  public publishername!: string;
  @Column
  public monthsalecount!: number;
  @Column
  public bookpicname!: string;
  @Column
  public secondctgyid!: number;
  @Column
  public thirdctgyid!: number;
  @Column
  public originalprice!: number; // 排序字段
  @Column
  public discount!: number;
}
