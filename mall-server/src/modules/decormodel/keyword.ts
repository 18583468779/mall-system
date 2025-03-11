import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "keyword",
})
export default class KeywordModel extends Model<KeywordModel> {
  @Column
  public keyword!: string;
}
