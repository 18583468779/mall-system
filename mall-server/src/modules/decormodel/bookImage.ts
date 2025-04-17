import { Column, DataType, ForeignKey, Table,Model } from "sequelize-typescript";
import BooksModel from "./books";

@Table({ tableName: "book_images" })
export default class BookImageModel extends Model<BookImageModel> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  bookImageId!: number; // 主键ID
  @Column({ type: DataType.STRING(500) })
  url!:string; // minio 访问地址
  @Column({ type: DataType.STRING })
  filename!:string; // 文件名
  @ForeignKey(() => BooksModel)
  @Column({ type: DataType.INTEGER })
  ISBN!: number; // 关联商品
}
