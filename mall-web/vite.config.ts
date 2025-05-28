import { CommonServerOptions, ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import dotenv from "dotenv";
// 引入 gzip 压缩插件
import viteCompression from "vite-plugin-compression";
// 引入图片压缩插件
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig((mode: ConfigEnv) => {
  const envName: string = ".env";
  const curEnvFileName = `${envName}.${mode.mode}`;
  let server: CommonServerOptions = {};

  // 获取环境变量
  const envData = fs.readFileSync(curEnvFileName);
  const envMap: any = dotenv.parse(envData);
  if (mode.mode === envMap.VITE_username) {
    console.log("开发环境", curEnvFileName, envMap.VITE_base_url);
    server = {
      // 配置代理
      port: envMap.VITE_port,
      proxy: {
        [envMap.VITE_base_url]: {
          target: envMap.VITE_target,
        },
      },
    };
  } else if (mode.mode === "production") {
    server = {
      port: envMap.VITE_port,
    };
    console.log("生产环境", curEnvFileName);
  }
  return {
    plugins: [
      vue(), // 添加vue插件
      // 开启gzip压缩
      viteCompression({
        verbose: true, // 是否在控制台输出压缩信息
        disable: false, // 是否禁用gzip压缩
        threshold: 10240, // 压缩的阈值,体积大于 10kb 才会被压缩
        algorithm: "gzip", // 压缩算法
        ext: ".gz", // 压缩文件的扩展名
      }),
      // 图片压缩
      viteImagemin({
        // 无损压缩
        optipng: {
          optimizationLevel: 7,
        },
        // 有损压缩
        pngquant: {
          quality: [0.8, 0.9],
        },
        // jpg 压缩配置
        mozjpeg: {
          quality: 80,
        },
      }),
    ],
    // 构建配置
    build: {
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 打包输出配置
      rollupOptions: {
        output: {
          // 静态资源分类打包
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          // 代码分割配置
          manualChunks: {
            "vue-vendor": ["vue", "vue-router", "pinia"],
            "element-plus": ["element-plus"],
          },
        },
      },
      // 开启 CSS 代码分割
      cssCodeSplit: true,
      // 生产环境移除 console
      terserOptions: {
        // 压缩配置
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server,
  };
});
