import * as MinIO from "minio";

// export const minioConfig = {
//   endPoint: "localhost",
//   port: 9005,
//   useSSL: false,
//   accessKey: "admin",
//   secretKey: "admin888",
//   bucket: "daimaxiaokubucket",
// };

const endPoint =
  process.env.NODE_ENV === "dev" ? "https://www.diamaxiaoku.com/" : "localhost";

const useSSL = process.env.NODE_ENV === "dev" ? false : true;
export const minioConfig = {
  endPoint,
  port: 9005,
  useSSL,
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

(async function checkBucketPolicy() {
  try {
    // 1. 获取存储桶当前策略
    const policy = await minioClient.getBucketPolicy(minioConfig.bucket);
    console.log("当前存储桶策略:", JSON.parse(policy));

    // 2. 解析策略规则
    const policyObj = JSON.parse(policy);
    const statements = policyObj.Statement || [];

    // 3. 检查需要的权限
    let canWrite = false;
    let canRead = false;

    statements.forEach((statement: any) => {
      if (statement.Effect === "Allow") {
        const actions = Array.isArray(statement.Action)
          ? statement.Action
          : [statement.Action];

        if (actions.includes("s3:PutObject")) canWrite = true;
        if (actions.includes("s3:GetObject")) canRead = true;
      }
    });

    console.log("--- 权限检查结果 ---");
    console.log("写入权限（PutObject）:", canWrite ? "✅ 允许" : "❌ 拒绝");
    console.log("读取权限（GetObject）:", canRead ? "✅ 允许" : "❌ 拒绝");

    // 4. 如果没有权限，建议设置新策略（可选）
    if (!canWrite || !canRead) {
      console.log("\n建议设置以下策略:");
      console.log(`
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::${minioConfig.bucket}/*"
    }
  ]
}
      `);
    }
  } catch (error: any) {
    if (error.code === "NoSuchBucketPolicy") {
      console.log("该存储桶未设置任何策略");
    } else {
      console.error("检查策略失败:", error);
    }
  }
})().catch(console.error);

export default minioClient;
