import minioClient, { minioConfig } from "../../config/minio";
// import { sequelize } from "../../../modules/BaseDao";

class FileDao {
  static fileDao: FileDao = new FileDao();
  /**
   * 上传文件到 MinIO
   * @param file 文件流
   * @param fileName 文件名
   * @param fileType 文件类型
   */
  async generatePresignedUrl(fileName: string, fileType?: string) {
    // 生成预签名 URL
    const objectName = `${Date.now()}-${fileName}`; // 生成唯一的对象名称
    const presignedUrl = await minioClient.presignedPutObject(
      minioConfig.bucket,
      objectName,
      60 * 15 // 15分钟有效期
    );
    // 插入代理路径前缀
    const correctedUrl = presignedUrl.replace(
      `https://${minioConfig.endPoint}/${minioConfig.bucket}/`,
      `https://${minioConfig.endPoint}/minio-api/${minioConfig.bucket}/`
    );

    return { presignedUrl: correctedUrl, objectName };
  }
}

export default FileDao.fileDao;
