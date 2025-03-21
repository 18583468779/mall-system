import { Column, Model, Table } from "sequelize-typescript";
import Reply from "./reply";

@Table({
  tableName: "evaluate",
})
export default class EvaluateModel extends Model<EvaluateModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public evaluteid!: number;
  @Column
  content!: string;
  @Column
  evalutetor!: string; // 发言人
  @Column
  isbn!: string;
  @Column
  headportrai!: string;
  @Column
  givealikenum!: string; // 点赞数
  @Column
  evaluatedegree!: string; // 评价级别
  @Column
  pubdate!: Date; // 发表时间
  @Column
  isanonymous!: number; // 是否是匿名用户

  replyid!: number;
  replycontent!: string;
  replydate!: Date;
  replyor!: string;
  evalid!: number;
  replyLst!: Pick<
    Reply,
    "replyid" | "replycontent" | "replydate" | "replyor" | "evalid"
  >[];
}
