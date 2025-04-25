import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import bookDao from "../modules/books/dao/BookDao";
import { RoleMiddleware } from "../decorator/userinforoledecorator";
import { requireVIP } from "../middleware/auth";

@Controller("/booksmodule")
class BookController {
  @post("/findBooksByPage")
  @RoleMiddleware(requireVIP)
  async findBooksByPage(ctx: Context) {
    const { page, pageSize } = ctx.request.body;
    const res = await bookDao.findBooksByPage(
      page,
      pageSize,
      "originalprice",
      "asc",
      "",
      ctx
    );
    ctx.body = success(res);
  }

  @get("/findBooksByThirdCtgyId/:thirdctgyid/:sortfield/:ascordesc")
  @RoleMiddleware(requireVIP)
  async findBooksByThirdCtgyId(ctx: Context) {
    const { thirdctgyid, sortfield, ascordesc } = ctx.params;
    const res = await bookDao.findBooksByThirdCtgyId(
      thirdctgyid,
      sortfield,
      ascordesc,
      ctx
    );
    ctx.body = success(res);
  }
  @get("/findBooksAllThirdCtgy/:secondctgyid")
  async findBooksAllThirdCtgy(ctx: Context) {
    // 根据二级分类获取全部三级分类
    const { secondctgyid } = ctx.params;

    const res = await bookDao.findBooksAllThirdCtgy(secondctgyid);
    ctx.body = success(res);
  }

  @get("/findBooksByAutoCompKeyword/:autocompkeyword")
  async findBooksByAutoCompKeyword(ctx: Context) {
    // 根据二级分类获取全部三级分类
    const { autocompkeyword } = ctx.params;
    const res = await bookDao.findBooksByAutoCompKeyword(autocompkeyword);
    ctx.body = success(res);
  }
  @get("/findPublisersByAutoCompKey/:autocompkeyword")
  async findPublisersByAutoCompKey(ctx: Context) {
    const { autocompkeyword } = ctx.params;
    const res = await bookDao.findPublisersByAutoCompKey(autocompkeyword);
    ctx.body = success(res);
  }
  @post("/findBksByPublishIds")
  async findBksByPublishIds(ctx: Context) {
    const publishids: number[] = ctx.request.body;
    const res = await bookDao.findBksByPublishIds(publishids);
    ctx.body = success(res);
  }

  @get("/findBooksByISBN/:ISBN")
  @RoleMiddleware(requireVIP)
  async findBooksByISBN(ctx: Context) {
    const { ISBN } = ctx.params;
    const res = await bookDao.findBooksByISBN(ISBN, ctx);
    ctx.body = success(res);
  }
  @post("/saveBooks")
  async saveBooks(ctx: Context) {
    const bookData = ctx.request.body;

    // ✅ 使用改进后的保存方法
    const res = await bookDao.saveBooks(bookData);
    ctx.body = success(res);
  }
  @post("/deleteBooks")
  async deleteBooks(ctx: Context) {
    const { ISBN } = ctx.request.body;
    const res = await bookDao.deleteBooks(ISBN);
    ctx.body = success(res);
  }
}
