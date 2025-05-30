import redis from "koa-redis";

interface DbConConf {
  host: string;
  password: string;
  port: number;
}

interface EnvConf {
  dev: DbConConf;
  prod: DbConConf;
}
export interface RedisClient {
  set(key: string, value: string): any;
  get(key: string): any;
  hset(obj: string, key: string, value: any): any;
  hmset(obj: string, ...keyvalue: any[]): any;
  hgetall(obj: string): any;
  hget(obj: string, key: string): any;
  hmget(obj: string, ...keys: any[]): any;
}
class RedisConfig {
  static conf: RedisConfig = new RedisConfig();
  envConf!: EnvConf;
  env!: keyof EnvConf;
  constructor() {
    const curEnv = process.env.NODE_ENV || "dev";
    this.env = process.env.NODE_ENV === "dev" ? "dev" : "prod";
    this.initConf();
  }

  initConf() {
    this.envConf = {
      dev: {
        host: "localhost",
        password: "123456",
        port: 6379,
      },
      prod: {
        host: "127.0.0.1",
        password: "123456",
        port: 6379,
      },
    };
  }
  getConf() {
    return this.envConf[this.env];
  }
  redisServerConf() {
    return redis(this.getConf()).client;
  }
}

export default RedisConfig.conf;
