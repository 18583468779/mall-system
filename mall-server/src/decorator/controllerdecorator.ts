// import { Middleware } from "koa";
// import AllRouterLoader from "../common/AllCtrlRouterLoader";
// import { MIDDLEWARE_METADATA_KEY } from "./commondecorator";
// type MethodType = "get" | "post" | "put" | "delete";
// export function Controller(modulePath: string = "") {
//   return function (targetClass: { new (...args: any): any }) {
//     const prototype = targetClass.prototype;

//     // 遍历原型上的所有方法名（包括继承的）
//     Object.getOwnPropertyNames(prototype).forEach((methodname) => {
//       // 排除构造函数
//       if (methodname === "constructor") return;

//       // 读取方法上的元数据
//       const path = Reflect.getMetadata("path", prototype, methodname);
//       const methodType: MethodType = Reflect.getMetadata(
//         "methodType",
//         prototype,
//         methodname
//       );
//       // 获取中间件元数据
//       const middlewares: Middleware[] =
//         Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, prototype, methodname) ||
//         [];
//       const routerHandlerFn = prototype[methodname]; // 具体的方法体
//       const rootRouter = AllRouterLoader.app.context.rootRouter;

//       if (!rootRouter) {
//         throw new Error(
//           "Root router not initialized. Ensure AllCtrlRouterLoader.init() is called first."
//         );
//       }

//       if (path && methodType) {
//         // 这里可以注册路由，例如：
//         rootRouter[methodType](
//           modulePath + path,
//           ...middlewares,
//           routerHandlerFn
//         );
//         console.log(
//           `注册路由: ${methodType.toUpperCase()} ${modulePath}${path}\n` +
//             `中间件数: ${middlewares.length}\n` +
//             `处理方法: ${methodname}`
//         );
//       }
//     });
//   };
// }
// src/decorator/controllerdecorator.ts
import { Middleware } from "koa";
import AllCtrlRouterLoader from "../common/AllCtrlRouterLoader";
import { MIDDLEWARE_METADATA_KEY } from "./commondecorator";

export type MethodType = "get" | "post" | "put" | "delete";

// 存储待注册的路由类
AllCtrlRouterLoader.pendingControllerClasses = [];

export function Controller(modulePath: string = "") {
  return function (targetClass: { new (...args: any): any }) {
    // 将目标类和模块路径存入静态变量
    AllCtrlRouterLoader.pendingControllerClasses.push({
      targetClass,
      modulePath,
    });
  };
}
