import * as MinIO from "minio";

// export const minioConfig = {
//   endPoint: "localhost",
//   port: 9090,
//   useSSL: false,
//   accessKey: "admin",
//   secretKey: "admin888",
//   bucket: "daimaxiaokubucket",
// };
export const minioConfig = {
  endPoint: "127.0.0.1",
  port: 9005,
  useSSL: false,
  accessKey: "minioadmin",
  secretKey: "minioadmin",
  bucket: "daimaxiaokubucket",
};

const minioClient = new MinIO.Client(minioConfig);
// 确保存储桶存在
(async () => {
  const exists = await minioClient.bucketExists(minioConfig.bucket);
  if (!exists) {
    await minioClient.makeBucket(minioConfig.bucket);
    console.log("Bucket created:", minioConfig.bucket);
  }
})().catch(console.error);

export default minioClient;
