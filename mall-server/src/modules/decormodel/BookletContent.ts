import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { BookletChapter } from "./BookletChapter";

// 小册内容
@Table({ tableName: "booklet_content" })
export class BookletContent extends Model<BookletContent> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  content_id!: number;

  @ForeignKey(() => BookletChapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chapter_id!: number;

  @Column({
    type: DataType.TEXT("long"),
    comment: "富文本内容",
  })
  content!: string;

  @BelongsTo(() => BookletChapter)
  chapter!: BookletChapter;
}
