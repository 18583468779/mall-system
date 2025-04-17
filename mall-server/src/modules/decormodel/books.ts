import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import BookAttachment from "./bookAttachment";
import BookImageModel from "./bookImage";
import { ThirdCtgyModel } from "./ThirdCtgyModel";
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
  public secondctgyid!: number;
  @ForeignKey(() => ThirdCtgyModel) // ✅ 外键标注
  thirdctgyid!: number;
  @Column
  public originalprice!: number; // 排序字段
  @Column
  public discount!: number;
  @BelongsTo(() => ThirdCtgyModel, {
    foreignKey: "thirdctgyid",      // 当前模型的外键字段
    targetKey: "thirdctgyid"        // 目标模型的主键字段
  })
  thirdCtgy!: ThirdCtgyModel;
  @Column
  public description!: string; // 描述
  @HasMany(() => BookImageModel)
  images!: BookImageModel[];

  @HasMany(() => BookAttachment)
  attachments!: BookAttachment[];
}
