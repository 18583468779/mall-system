import ctgyDao from "../dao/CtgyDao";
import redisUtil from "../../../common/RedisUtil";
class CtgyService {
  static ctgyService: CtgyService = new CtgyService();
  async findFirstCtgys() {
    const firstCtgyRedis = await redisUtil.hget("firstCtgysHash", "firstCtgys"); // 获取一级分类缓存
    if (!firstCtgyRedis) {
      console.log("一级分类mysql");
      const firstCtgys = await ctgyDao.findFirstCtgys();
      redisUtil.hset("firstCtgysHash", "firstCtgys", firstCtgys);
      return firstCtgys;
    } else {
      console.log("一级分类redis");
      return firstCtgyRedis;
    }
  }
}

export default CtgyService.ctgyService;
