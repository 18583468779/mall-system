import { CommonServerOptions, ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig((mode: ConfigEnv) => {
  const envName: string = ".env";
  const curEnvFileName = `${envName}.${mode.mode}`;
  let server: CommonServerOptions = {};
  if (mode.mode === "development") {
    console.log("开发环境", curEnvFileName);
    server = {
      // 配置代理
      port: 5005,
      proxy: {
        "/dang": {
          target: "http:localhost:5003/",
        },
      },
    };
  } else if (mode.mode === "production") {
    console.log("生产环境", curEnvFileName);
  }
  return {
    plugins: [vue()],
    server,
  };
});
