import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "files",
})
export default class FilesModel extends Model<FilesModel> {
  @Column
  public fileName!: string; // 文件名
  @Column
  public objectName!: string; // 文件名
  @Column
  public bucket!: string; // 桶名
  @Column
  public size!: string; // 文件大小
  @Column
  public mimeType!: number; // 上传文件类型
  @Column
  public uploaderId!: number; // 上传者id
}
