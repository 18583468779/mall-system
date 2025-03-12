import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import searchService from "../modules/search/service/SearchService";

@Controller("/searchmodule")
class SearchController {
  @post("/addOrUpdateHistoryKeyword") // 新增或更新历史关键字
  async addOrUpdateHistoryKeyword(ctx: Context) {
    const { historykeyword } = ctx.request.body;
    ctx.body = success(
      await searchService.addOrUpdateHistoryKeyword(historykeyword)
    );
  }
  @get("/SearchKeywords/:key") // 搜索关键字列表
  async SearchKeywords(ctx: Context) {
    const { key } = ctx.params;
    ctx.body = success(await searchService.SearchKeywords(key));
  }
  @get("/getSearchHistoryKeywords") // 搜索历史关键字列表
  async getSearchHistoryKeywords(ctx: Context) {
    ctx.body = success(await searchService.getSearchHistoryKeywords());
  }
}
