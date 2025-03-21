import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "reply",
})
export default class ReplyModel extends Model<ReplyModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public replyid!: number;
  @Column
  replycontent!: string;
  @Column
  replydate!: Date;
  strReplyDate!: string;
  @Column
  evalid!: number;
  @Column
  replyor!: string;
}
