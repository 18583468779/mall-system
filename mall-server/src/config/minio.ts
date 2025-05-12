import * as MinIO from "minio";

// 配置参数
export const isDev = process.env.NODE_ENV === "dev";
export const minioConfig = {
  endPoint: isDev ? "localhost" : "www.diamaxiaoku.com", // 统一使用主域名
  port: isDev ? 9000 : 443, // 开发环境直连 MinIO，生产走 Nginx
  useSSL: isDev ? false : true, // 生产环境启用 SSL
  accessKey: "admin",
  secretKey: "admin888",
  bucket: "daimaxiaokubucket",
  region: "us-east-1", // 必须明确指定
  pathStyle: true, // 强制启用路径风格访问
};

const minioClient = new MinIO.Client(minioConfig);

async function listBuckets() {
  try {
    const buckets = await minioClient.listBuckets();
    console.log("Buckets:", buckets);
  } catch (err) {
    console.error("Error listing buckets:", err);
  }
}

listBuckets();
export default minioClient;
