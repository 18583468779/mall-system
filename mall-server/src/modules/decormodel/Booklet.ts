import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import UserinfoModel from "../../modules/decormodel/Userinfo";
import { BookletChapter } from "./BookletChapter";
import { Purchase } from "./Purchase";

// 项目小册模型
@Table({ tableName: "booklet" })
export class Booklet extends Model<Booklet> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  booklet_id?: number; // 主键ID
  @Column({ type: DataType.STRING(50), allowNull: false })
  title!: string; // 小册标题
  @Column({ type: DataType.STRING(500) })
  description!: string; // 小册描述
  @Column({ type: DataType.STRING(500), allowNull: false })
  cover_image!: string; // 小册封面
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false }) // DECIMAL(10,2) 表示最多有 10 个数字，其中 2 个数字在小数点后面。 因此，最大值为 99999999.99，最小值为 -99999999.99。
  price!: number; // 小册价格
  @ForeignKey(() => UserinfoModel) // 外键关联用户信息表的用户ID字段
  @Column({ type: DataType.INTEGER, allowNull: false })
  userid!: number; // 小册作者ID
  @Column({
    type: DataType.ENUM("draft", "published", "archived"),
    defaultValue: "draft",
    comment: "状态",
    allowNull: false,
  })
  status!: string;

  // 定义关联关系，一个小册属于一个用户信息
  @BelongsTo(() => UserinfoModel)
  userinfo!: UserinfoModel;
  // 定义关联关系，一个小册可以有多个章节

  @HasMany(() => BookletChapter)
  chapters!: BookletChapter[];

  @HasMany(() => Purchase)
  purchases!: Purchase[];
}
