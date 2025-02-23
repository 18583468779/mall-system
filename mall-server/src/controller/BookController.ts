import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import bookDao from "../modules/books/dao/BookDao";

@Controller("/booksmodule")
class BookController {
  @get("/findBooksByThirdCtgyId/:thirdctgyid")
  async findBooksByThirdCtgyId(ctx: Context) {
    const { thirdctgyid } = ctx.params;
    const res = await bookDao.findBooksByThirdCtgyId(thirdctgyid);
    ctx.body = success(res);
  }
}
