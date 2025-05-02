import { Middleware } from "koa";
import "reflect-metadata";
// 通用中间件

// 定义元数据键
export const MIDDLEWARE_METADATA_KEY = Symbol("middlewares");

export const use = (...middlewares: Middleware[]) => {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    // 获取已有的中间件数组
    const existingMiddlewares =
      Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, target, propertyKey) || [];

    // 将新的中间件添加到数组中
    Reflect.defineMetadata(
      MIDDLEWARE_METADATA_KEY,
      [...existingMiddlewares, ...middlewares],
      target,
      propertyKey
    );
  };
};
