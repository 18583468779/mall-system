import body from "koa-body";
import Koa from "koa";
import json from "koa-json";
import globalException from "./GlobalExce";
import Router from "koa-router";
import path from "path";
import fs from "fs";
/**
 *  自动加载控制器类
 */
class AllCtrlRouterLoader {
  app!: Koa;
  static allCtrlRouterLoader = new AllCtrlRouterLoader();
  init(app: Koa) {
    // 初始化
    this.app = app;
    this.loadMiddleAware(); // 加载中间件
    this.storeRootRouterToCtx(); // 保存跟路由
    this.loadAllCtrlRouterWrapper(); // 加载控制器路由
    this.listen(); // 监听
  }
  loadMiddleAware() {
    this.app.use(json());
    this.app.use(body());
    this.app.use(globalException);
  }
  storeRootRouterToCtx() {
    const routRouter = new Router();
    this.app.context.routRouter = routRouter;
    this.app.use(routRouter.routes());
  }
  loadAllCtrlRouterWrapper() {
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths();
    // 3.2 调用加载所有一级路由到二级路由方法
    console.log("allFullFilePaths", allFullFilePaths);
    this.loadAllRouter(allFullFilePaths);
  }
  loadAllRouter(allFullFilePaths: Array<string>) {
    for (const fullFilePath of allFullFilePaths) {
      require(fullFilePath); // 获取到控制器
    }
  }
  isCtrlFile(file: string) {
    const fileName = file.substring(
      file.lastIndexOf("\\") + 1,
      file.lastIndexOf(".")
    );
    const extensionName: string = file.substring(
      file.lastIndexOf("."),
      file.length
    );

    return fileName.indexOf("Controller") !== -1 && extensionName === ".ts";
  }
  // 2.加载所有路由文件绝对路径数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), "/src/controller"); // 获取到当前目录D:\project_xw\mall-system\mall-server\src\controller
    const allFiles = this.getFile(dir);
    const allFullFilePaths: string[] = [];
    for (const file of allFiles) {
      console.log("file", file);
      if (this.isCtrlFile(file)) {
        allFullFilePaths.push(dir + "\\" + file);
      }
    }
    return allFullFilePaths;
  }
  // 1.加载所有路由文件数组
  getFile(dir: string) {
    return fs.readdirSync(dir); // 获取目录下的所有的文件
  }
  listen() {
    this.app.listen(3002, () => {
      console.log("服务已启动，监听3002端口");
    });
  }
}

export default AllCtrlRouterLoader.allCtrlRouterLoader;
