import { success } from "../common/ResResult";
import { get, post } from "../decorator/requestmethoddecorator";
import { Controller } from "../decorator/controllerdecorator";
import { Context } from "koa";
import fileDao from "../modules/file/dao";

@Controller("/filemodule")
class FileController {
  @post("/generatePresignedUrl")
  async generatePresignedUrl(ctx: Context) {
    const { fileName } = ctx.request.body;
    const res = await fileDao.generatePresignedUrl(fileName);
    ctx.body = success(res);
  }
}
