


// src/modules/ctgy/defmodel/ThirdCtgyModel.ts
import BooksModel from "./books";
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";

@Table({
  tableName: "thirdctgy",
  timestamps: false
})
export class ThirdCtgyModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "thirdctgyid"
  })
  thirdctgyid!: number;

  @Column({
    type: DataType.STRING(30),
    field: "thirdctgyname",
    allowNull: false
  })
  thirdctgyname!: string;

  @Column({
    type: DataType.INTEGER,
    field: "secctgyid",
    allowNull: false
  })
  secctgyid!: number;

  // ✅ 定义反向关联
  @HasMany(() => BooksModel)
  books!: BooksModel[];
}
