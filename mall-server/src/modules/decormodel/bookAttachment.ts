import { Table, Column, DataType, ForeignKey,Model } from "sequelize-typescript";
import BooksModel from "./books";

// src/models/BookAttachment.model.ts —— 商品附件表
@Table({ tableName: 'book_attachments' })
export default class BookAttachment extends Model<BookAttachment> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true }) // 主键ID
  bookAttachmentId!: number;
  @Column(DataType.STRING(500)) // MinIO访问地址
  url!: string;

  @Column(DataType.STRING) // 原始文件名
  filename!: string;

  @Column(DataType.ENUM('image', 'zip')) // 文件类型
  fileType!: string;

  @ForeignKey(() => BooksModel)
  @Column(DataType.INTEGER)
  ISBN!: number; // 关联商品
}