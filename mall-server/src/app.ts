import Koa from "koa";
import allRouterLoader from "./common/AllRouterLoader";
import dbconfig from "./config/dbconfig";
const app = new Koa();

console.log(dbconfig.getConf("database"));
console.log(dbconfig.getConf());

allRouterLoader.init(app);
