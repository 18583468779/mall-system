import { Context, Middleware } from "koa"

// 判断用户角色的中间件装饰器import { Middleware } from "koa";

export function RoleMiddleware(middleware: Middleware) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      descriptor.value = function (ctx: Context, ...args: any[]) {
        return middleware(ctx, async () => {
          await originalMethod.apply(this, [ctx, ...args]);
        });
      };
    };
  }