import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "books",
})
export default class BooksModel extends Model<BooksModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  ISBN!: string;
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
