import { Middleware } from "koa";

// 通用中间件
export const use = (path: string) => {
  return function (
    target: Object,
    propertyKey: string | Symbol,
    descriptor: PropertyDescriptor
  ) {};
};
