import Koa, { Middleware } from "koa";
import fs from "fs";
import body from "koa-body";
import json from "koa-json";
import Router from "koa-router";
import globalException from "./GlobalExce";
import path from "path";
import koajwt from "koa-jwt";
import RoleModel from "../modules/decormodel/role";
import UserinfoModel from "../modules/decormodel/Userinfo";
import cors from "@koa/cors";
import { MethodType } from "../decorator/controllerdecorator";
import { MIDDLEWARE_METADATA_KEY } from "../decorator/commondecorator";

class AllCtrlRouterLoader {
  app!: Koa;
  static allRouterLoader = new AllCtrlRouterLoader();
  // 新增静态变量存储待处理的Controller类
  pendingControllerClasses: Array<{
    targetClass: any;
    modulePath: string;
  }> = [];
  init(app: Koa) {
    this.app = app;
    this.loadMiddleAware(); // 加载中间件
    this.storeRootRouterToCtx(); // 保存根路由
    this.loadAllCtrlRouterWrapper(); // 加载控制器路由
    // 初始化完成后注册延迟的路由
    this.registerPendingControllers();
    this.listen(); // 监听
  }
  loadMiddleAware() {
    this.app.use(
      cors({
        origin: (ctx: any) => {
          const isDev =
            process.env.NODE_ENV === "dev"
              ? ["*"]
              : ["https://diamaxiaoku.com", "https://www.diamaxiaoku.com"];
          const allowedOrigins = isDev;
          return allowedOrigins.includes(ctx.request.header.origin)
            ? ctx.request.header.origin
            : "";
        },
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
        maxAge: 86400, // 预检请求缓存1天
      })
    );
    this.app.use(json());
    this.app.use(body());
    this.app.use(
      koajwt({
        secret: "aiaiai123456X",
        key: "jwtData", // jwtData 是在登录成功之后设置的 这里是从请求头中获取的jwtData 然后再把jwtData 放到ctx 里面 方便使用
      }).unless({
        path: [
          /^\/dang\/userinfomodule\/login$/,
          /^\/dang\/userinfomodule\/register$/,
          /^\/dang\/userinfomodule\/sendVerificationCode$/,
          /^\/dang\/ctgymodule\/.*$/, // 排除ctgymodule所有子路径
          /^\/dang\/filemodule\/.*$/, // 排除filemodule所有子路径
          /^\/dang\/booksmodule\/findBooksByPage$/,
          /^\/dang\/booksmodule\/findBooksByISBN$/,
          /^\/dang\/searchmodule\/.*$/, // 排除searchmodule所有子路径
          /^\/dang\/ordersmodule\/wechat\/notify$/,
          /^\/dang\/ordersmodule\/alipay\/notify$/,
        ],
      })
    );
    this.app.use(globalException);
    this.app.use(async (ctx, next) => {
      if (ctx.state.jwtData) {
        let userinfo = await UserinfoModel.findByPk(
          ctx.state.jwtData.data.userid,
          {
            attributes: { exclude: ["password"] },
            include: [
              {
                model: RoleModel,
                as: "role", // 必须与关联定义中的别名一致
              },
            ],
          }
        );
        if (userinfo) {
          const userinfoData = userinfo.get({ plain: true }); // 获取原始数据
          ctx.state.user = userinfoData;
        }
      }
      await next();
    });
  }
  storeRootRouterToCtx() {
    /**
     * 为什么要保存跟路由：
     *    使用到控制器装饰器的时候，需要拿到全局路由
     */
    const rootRouter = new Router();
    rootRouter.prefix("/dang"); // 为路由添加前缀
    this.app.context.rootRouter = rootRouter;
    this.app.use(rootRouter.routes());
  }
  // 新增方法：处理延迟的路由注册
  registerPendingControllers() {
    console.log("[DEBUG] 开始注册延迟路由");
    this.pendingControllerClasses.forEach(({ targetClass, modulePath }) => {
      console.log("[DEBUG] 处理控制器:", targetClass.name);
      const prototype = targetClass.prototype;
      Object.getOwnPropertyNames(prototype).forEach((methodname) => {
        if (methodname === "constructor") return;

        const path = Reflect.getMetadata("path", prototype, methodname);
        const methodType: MethodType = Reflect.getMetadata(
          "methodType",
          prototype,
          methodname
        );
        const middlewares: Middleware[] =
          Reflect.getMetadata(MIDDLEWARE_METADATA_KEY, prototype, methodname) ||
          [];
        const routerHandlerFn = prototype[methodname];
        const rootRouter = this.app.context.rootRouter;
        console.log(
          `注册路由: ${methodType.toUpperCase()} ${modulePath}${path}\n` +
            `中间件数: ${middlewares.length}\n` +
            `处理方法: ${methodname}`
        );
        if (path && methodType && rootRouter) {
          rootRouter[methodType](
            modulePath + path,
            ...middlewares,
            routerHandlerFn
          );
        }
      });
    });
    // 清空缓存
    this.pendingControllerClasses = [];
  }
  loadAllCtrlRouterWrapper() {
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths();
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths);
  }
  loadAllRouter(allFullFilePaths: string[]) {
    for (const fullFilePath of allFullFilePaths) {
      require(fullFilePath);
    }
  }
  //   2.加载所有路由文件绝对路由数组
  getAbsoluteFilePaths() {
    // const dir = path.join(process.cwd(), "/src/controller");
    const isProduction = process.env.NODE_ENV === "dev";
    const baseDir = isProduction ? "src" : "dist";
    const dir = path.join(process.cwd(), baseDir, "controller");
    const allFiles = this.getFiles(dir);
    const allFullFilePaths: string[] = [];
    for (let file of allFiles) {
      if (this.isCtrlFile(file)) {
        const fullFilePath = path.join(dir, file);
        allFullFilePaths.push(fullFilePath);
      }
    }
    return allFullFilePaths;
  }

  // 是不是控制器文件
  isCtrlFile(file: string) {
    const isProduction = process.env.NODE_ENV === "dev";
    const baseDir = isProduction ? ".ts" : ".js";
    const fileName = path.basename(file, path.extname(file)); // [!code ++]
    const extension = path.extname(file); // [!code ++]
    // return fileName.endsWith("Controller") && extension === ".js"; // [!code ++]
    return fileName.endsWith("Controller") && extension === baseDir; // [!code ++]
  }
  //   1.加载所有路由文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir);
  }
  listen() {
    this.app.listen(3002);
    console.log("listen 3002 server");
  }
}
export default AllCtrlRouterLoader.allRouterLoader;
