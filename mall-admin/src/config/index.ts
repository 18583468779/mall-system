interface BaseConf {
  baseApi: string; // 基础配置
  mockBaseApi: string; // mock 配置
}
interface EnvConf {
  development: BaseConf;
  production: BaseConf;
}

class AllConf {
  env!: keyof EnvConf;
  isMock: boolean = false;
  baseApi!: string;
  mockBaseApi!: string;
}

class EnvConfigClass {
  static envConfigClass: EnvConfigClass = new EnvConfigClass();
  readonly curEnv =
    (import.meta as any).env.MODE === "development"
      ? "development"
      : "production";
  envConf!: EnvConf;
  allConf!: AllConf;

  constructor() {
    this.initConf();
    this.getAllConf();
  }

  initConf() {
    this.envConf = {
      development: {
        baseApi: "/dang",
        mockBaseApi:
          "https://www.fastmock.site/mock/a244a48ca0f6b7efaa1d57b9e57b2c8b/dangdang/",
      },
      production: {
        baseApi: "https://diamaxiaoku.com/dang/",
        mockBaseApi: "",
      },
    };
  }
  getAllConf() {
    this.allConf = {
      env: this.curEnv,
      isMock: false,
      ...this.envConf[this.curEnv],
    };
  }
}

export default EnvConfigClass.envConfigClass.allConf;
