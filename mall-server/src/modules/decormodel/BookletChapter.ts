import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Booklet } from "./Booklet";
import { BookletContent } from "./BookletContent";

// 小册章节
@Table({ tableName: "booklet_chapter" })
export class BookletChapter extends Model<BookletChapter> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  chapter_id?: number; // 主键ID
  @ForeignKey(() => Booklet) // 外键关联小册ID字段
  @Column({ type: DataType.INTEGER, allowNull: false, comment: "小册ID" })
  booklet_id!: number; // 小册ID
  @Column({ type: DataType.STRING(50), allowNull: false, comment: "章节标题" })
  title!: string; // 章节标题
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "章节序号",
  })
  order!: number; // 章节序号
  @Column({ type: DataType.BOOLEAN, defaultValue: false, comment: "是否免费" })
  is_free!: boolean; // 是否免费

  // 定义关联关系，一个章节属于一个小册
  @BelongsTo(() => Booklet)
  booklet!: Booklet;

  @HasOne(() => BookletContent)
  content!: BookletContent;
}
