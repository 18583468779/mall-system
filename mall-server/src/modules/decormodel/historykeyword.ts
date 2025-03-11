import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "historykeyword",
})
export default class historyKeywordModel extends Model<historyKeywordModel> {
  @Column
  public historykeyword!: string;
  @Column
  public clickcount!: number;
}
