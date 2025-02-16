import AllRouterLoader from "../common/AllCtrlRouterLoader";
type MethodType = "get" | "post" | "put" | "delete";
export function Controller(modulePath: string = "") {
  return function (targetClass: { new (...args: any): any }) {
    const prototype = targetClass.prototype;

    // 遍历原型上的所有方法名（包括继承的）
    Object.getOwnPropertyNames(prototype).forEach((methodname) => {
      // 排除构造函数
      if (methodname === "constructor") return;

      // 读取方法上的元数据
      const path = Reflect.getMetadata("path", prototype, methodname);
      const methodType: MethodType = Reflect.getMetadata(
        "methodType",
        prototype,
        methodname
      );
      const routerHandlerFn = prototype[methodname]; // 具体的方法体
      const rootRouter = AllRouterLoader.app.context.rootRouter;
      if (path && methodType) {
        // 这里可以注册路由，例如：
        rootRouter[methodType](modulePath + path, routerHandlerFn);
        console.log(
          `注册路由: ${methodType.toUpperCase()} ${modulePath}${path} -> ${methodname}`
        );
      }
    });
  };
}
