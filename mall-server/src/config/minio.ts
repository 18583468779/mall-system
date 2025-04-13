import * as MinIO from "minio";

export const minioConfig = {
  endPoint: "localhost",
  port: 9090,
  useSSL: true,
  accessKey: "admin",
  secretKey: "admin888",
  bucket: "daimaxiaokubucket",
};

const minioClient = new MinIO.Client(minioConfig);

export default minioClient;
