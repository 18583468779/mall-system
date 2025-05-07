module.exports = {
  apps: [
    {
      name: "my-koa-api", // 应用名称
      script: "./dist/app.js", // 编译后的入口文件
      interpreter: "node", // 使用 ts-node 直接运行 TS
      instances: 1, // Windows环境建议单实例
      exec_mode: "fork", // 使用fork模式
      autorestart: true, // 自动重启
      watch: false, // 生产环境关闭监听
      max_memory_restart: "1G", // 内存上限
      node_args: "--require ts-node/register", // 添加TS支持
      env: {
        NODE_ENV: "production",
        PORT: 3002, // 保持与代码一致
        TS_NODE_PROJECT: "tsconfig.json",
      },
      error_file: "./logs/err.log", // 错误日志路径
      out_file: "./logs/out.log", // 标准输出日志
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      time: true,
    },
  ],
};
