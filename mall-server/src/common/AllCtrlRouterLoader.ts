import Koa from "koa";
import fs from "fs";
import body from "koa-body";
import json from "koa-json";
import Router from "koa-router";
import globalException from "./GlobalExce";
import path from "path";
import koajwt from "koa-jwt";

class AllCtrlRouterLoader {
  app!: Koa;
  static allRouterLoader = new AllCtrlRouterLoader();
  init(app: Koa) {
    this.app = app;
    this.loadMiddleAware(); // 加载中间件
    this.storeRootRouterToCtx(); // 保存根路由
    this.loadAllCtrlRouterWrapper(); // 加载控制器路由
    this.listen(); // 监听
  }
  loadMiddleAware() {
    this.app.use(json());
    this.app.use(body());
    this.app.use(globalException);
    this.app.use(
      koajwt({ secret: "aiaiai123456X" }).unless({
        path: [
          /^\/dang\/userinfomodule\/login/,
          /^\/dang\/userinfomodule\/register/,
          /^\/dang\/userinfomodule\/sendVerificationCode/,
          /^\/dang\/ctgymodule/,
          /^\/dang\/filemodule/,
        ],
      })
    );
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
  loadAllCtrlRouterWrapper() {
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths();
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths);
  }
  loadAllRouter(allFullFilePaths: string[]) {
    for (const fullFilePath of allFullFilePaths) {
      // 这里使用了require 所有router模块要使用 CommonJs 规范 才能识别
      // 当执行require的时候会获取到控制器 就去自动去执行装饰器 把方法装饰器和类装饰器全部执行完成之后 路由和方法就执行捆绑了
      require(fullFilePath);
    }
  }
  //   2.加载所有路由文件绝对路由数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), "/src/controller");
    const allFiles = this.getFiles(dir);
    const allFullFilePaths: string[] = [];
    for (let file of allFiles) {
      if (this.isCtrlFile(file)) {
        const fullFilePath = dir + "\\" + file;
        allFullFilePaths.push(fullFilePath);
      }
    }
    return allFullFilePaths;
  }

  // 是不是控制器文件
  isCtrlFile(file: string) {
    const fileName: string = file.substring(
      file.lastIndexOf("\\") + 1,
      file.lastIndexOf(".")
    );
    const extendsionName: string = file.substring(
      file.lastIndexOf("."),
      file.length
    );
    return fileName.indexOf("Controller") !== -1 && extendsionName === ".ts";
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
