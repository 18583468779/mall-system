import { CommonServerOptions, ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import fs from "fs";
import dotenv from "dotenv";

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
    plugins: [vue()],
    server,
  };
});
