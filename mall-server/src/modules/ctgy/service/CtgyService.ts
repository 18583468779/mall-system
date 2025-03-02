import ctgyDao from "../dao/CtgyDao";
import redisConfig, { RedisClient } from "../../../config/RedisConfig";
class CtgyService {
  static ctgyService: CtgyService = new CtgyService();
  async findFirstCtgys() {
    const redisClient: RedisClient = redisConfig.redisServerConf(); // 链接Redis
    const firstCtgyRedis = await redisClient.hget(
      "firstCtgysHash",
      "firstCtgys"
    ); // 获取一级分类缓存
    if (!firstCtgyRedis) {
      console.log("一级分类mysql");
      const firstCtgys = await ctgyDao.findFirstCtgys();
      redisClient.hset(
        "firstCtgysHash",
        "firstCtgys",
        JSON.stringify(firstCtgys)
      );
      return firstCtgys;
    } else {
      console.log("一级分类redis");
      return JSON.parse(firstCtgyRedis);
    }
  }
}

export default CtgyService.ctgyService;
