/**
 *  自动路由引入
 */
import Koa, { Context } from "koa";
import path from "path";
import fs from "fs";
import Router from "koa-router";
import body from "koa-body";
import json from "koa-json";
import globalException from "./GlobalExce";

class AllRouterLoader {
  app!: Koa;
  static allRouterLoader = new AllRouterLoader();
  // 初始化方法
  init(app: Koa) {
    this.app = app;
    this.app.use(globalException); // 处理全局异常
    const rootRouter = this.loadAllRouterWrapper();
    // 4.监听方法
    this.listen(rootRouter);
  }
  // 1.加载所有路由文件数组
  getFile(dir: string) {
    return fs.readdirSync(dir); // 获取目录下的所有的文件
  }
  // 2.加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), "/src/router"); // 获取到当前目录D:\project_xw\mall-system\mall-server\src\router
    const allFiles = this.getFile(dir);
    const allFullFilePaths: string[] = [];
    for (const file of allFiles) {
      allFullFilePaths.push(dir + "\\" + file);
    }
    return allFullFilePaths;
  }
  // 3.加载所有一级路由到二级路由中
  loadAllRouterWrapper() {
    // 3.0 获取一级路由
    const rootRouter = this.getRootRouter();
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths();
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter);

    return rootRouter;
  }
  // 初始化一级路由
  getRootRouter() {
    const rootRouter = new Router();
    rootRouter.prefix("/dang");
    this.app.use(json());
    this.app.use(body());
    return rootRouter;
  }
  // 自定义守卫=>判断当前模块是不是路由模块
  isRouter(data: any): data is Router {
    return data instanceof Router;
  }
  loadAllRouter(allFullFilePaths: Array<string>, rootRouter: Router) {
    for (const fullFilePath of allFullFilePaths) {
      const module = require(fullFilePath); // 获取到路由模块
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods());
      }
    }
  }
  listen(rootRouter: Router) {
    this.app.use(rootRouter.routes());
    this.app.listen(3002, () => {
      console.log("服务已启动，监听3002端口");
    });
  }
}

export default AllRouterLoader.allRouterLoader;
