import { Op } from "sequelize";
import BooksModel from "../../../modules/decormodel/books";
import { getNoReptItem } from "../../../modules/commontypes";
import { PaginationService } from "../../../common/PagerService";
import BookImageModel from "../../../modules/decormodel/bookImage";
import BookAttachment from "../../../modules/decormodel/bookAttachment";
import { ThirdCtgyModel } from "../../decormodel/ThirdCtgyModel";


function filterIncludeFields( ctx: any) {
  const { needHideUrls } = ctx.state.permission; // 从上下文获取权限信息 
  return [
    {
      model: BookImageModel,
      as: "images",
      attributes: ["url", "filename"],
      separate: true, // 确保返回数组
    },
    {
      model: BookAttachment,
      as: "attachments",
      attributes:  needHideUrls ? [ "filename", "fileType"] : ["url", "filename", "fileType"],
      separate: true, // 确保返回数组
    },
    {
      model: ThirdCtgyModel,
      as: "thirdCtgy",
      attributes: ["thirdctgyname"],
      required: false, // 改为LEFT JOIN
    },
  ];
  
}

class BookDao {
  static bookDao: BookDao = new BookDao();

  /**
   * 分页查询图书列表
   * @param page 当前页码
   * @param pageSize 每页大小
   * @param sortField 排序字段
   * @param ascOrDesc 排序方式
   * @param keyword 关键字筛选
   */
  async findBooksByPage(
    page: number = 1,
    pageSize: number = 4,
    sortField: string = "originalprice",
    ascOrDesc: "asc" | "desc" = "asc",
    keyword: string = "",
    ctx?: any // Koa上下文对象
  ) {
    const whereCondition: any = {};
    if (keyword) {
      whereCondition.bookname = {
        [Op.like]: `%${keyword}%`,
      };
    }

    const rawResult = await PaginationService.paginate({
      page,
      pageSize,
      sortField,
      ascOrDesc,
      where: whereCondition,
      model: BooksModel,
      include:filterIncludeFields(ctx), // 传递关联配置
    });
     // 动态过滤字段
  return ctx?.state.permission.needHideUrls 
  ? rawResult
  : rawResult;
  }
  /**
   * @description 根据三级分类id查询图书
   * @param thirdctgyid 三级分类id
   * @param ascOrDesc 默认为升序
   * @param originalprice  升序字段
   */
  async findBooksByThirdCtgyId(
    thirdctgyid: number,
    sortField: string = "originalprice",
    ascOrDesc: string = "asc"
    ,ctx?: any
  ) {

    if (sortField === "price") {
      sortField = "originalprice";
    }
    return await BooksModel.findAll({
      order: [[sortField, ascOrDesc]],
      raw: false,
      where: { thirdctgyid },
      include:filterIncludeFields(ctx),
      nest: true, // 嵌套关联数据
    });
  }
  /**
   * a根据二级分类获取全部三级分类
   *
   */
  async findBooksAllThirdCtgy(secondctgyid: number) {
    return await BooksModel.findAll({
      raw: true,
      where: {
        secondctgyid,
      },
    });
  }
  /**
   * 根据关键字查找图书
   *
   */
  async findBooksByAutoCompKeyword(autocompkeyword: string) {
    return await BooksModel.findAll({
      raw: true,
      where: {
        bookname: {
          [Op.like]: `%${autocompkeyword}%`,
        },
      },
    });
  }
  /**
   * 根据图书名查找图书出版社
   *
   */
  async findPublisersByAutoCompKey(autocompKeyword: string) {
    const books = await BooksModel.findAll({
      raw: true,
      attributes: ["publishid", "publishername"],
      where: {
        bookname: {
          [Op.like]: `%${autocompKeyword}%`,
        },
      },
    });
    return getNoReptItem(books, "publishid");
  }
  /**
   * 根据出版社id查图书
   *
   */
  async findBksByPublishIds(publishids: number[]) {
    return await BooksModel.findAll({
      raw: true,
      where: {
        publishid: {
          [Op.in]: publishids,
        },
      },
    });
  }

  async findBooksByISBN(ISBN: string,ctx?: any) {
    const result = await BooksModel.findOne({
      where: { ISBN },
      include:filterIncludeFields(ctx),
      nest: true, // 嵌套关联数据
      raw: false, // 禁用原始模式
    });

    return result?.toJSON(); // 转换模型实例为纯对象
  }

  async saveBooks(bookData: any) {
    // ✅ 使用事务保证数据一致性
    return BooksModel.sequelize!.transaction(async (t) => {
      const book = await BooksModel.create(bookData, { transaction: t });

      // 批量创建图片记录
      if (bookData.imageUrlList?.length) {
        await BookImageModel.bulkCreate(
          bookData.imageUrlList.map((item: any) => ({
            ISBN: book.ISBN,
            url: item.url,
            filename: item.filename,
          })),
          { transaction: t }
        );
      }

      // 批量创建附件记录
      if (bookData.attachmentUrlList?.length) {
        await BookAttachment.bulkCreate(
          bookData.attachmentUrlList.map((item: any) => ({
            ISBN: book.ISBN,
            url: item.url,
            filename: item.filename,
            fileType: item.fileType,
          })),
          { transaction: t }
        );
      }

      return book;
    });
  }
  async deleteBooks(ISBN: string) {
    return await BooksModel.destroy({ where: { ISBN } });
  }
}
export default BookDao.bookDao;
