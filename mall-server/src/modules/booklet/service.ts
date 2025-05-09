import { raw } from "mysql";
import { Booklet } from "../decormodel/Booklet";
import { BookletChapter } from "../decormodel/BookletChapter";
import { BookletContent } from "../decormodel/BookletContent";

class BookletService {
  private static instance: BookletService;
  private constructor() {}
  public static getInstance(): BookletService {
    if (!BookletService.instance) {
      BookletService.instance = new BookletService();
    }
    return BookletService.instance;
  }
  public async getBookletAndContentById(booklet_id: number, user: any) {
    const isAdmin = user && this.handleIsAdmin(user.role.permission);

    // 查询小册数据（包含所有章节和内容）
    const booklet = await Booklet.findOne({
      raw: false, // 返回Sequelize模型实例
      nest: true, // 嵌套关联结果
      where: { booklet_id },
      include: [
        {
          model: BookletChapter,
          as: "chapters",
          include: [
            {
              // 始终包含内容，后续再做过滤
              model: BookletContent,
              as: "content",
            },
          ],
        },
      ],
    });
    let bookData = booklet?.get({ plain: true })!; // 获取原始数据（不包含关联模型）
    // 非管理员用户处理内容过滤
    if (!isAdmin && booklet) {
      bookData.chapters.forEach((chapter: any) => {
        if (!chapter.is_free) {
          // 移除非免费章节的内容（彻底删除content字段）
          delete chapter.content;
        }
      });
    }

    return bookData;
  }

  handleIsAdmin(permission: number) {
    let permissions = [0, 2]; // 管理员权限
    if (permissions.includes(permission)) return true;
    else return false;
  }
}

export default BookletService.getInstance();
