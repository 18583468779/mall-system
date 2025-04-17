import { Op } from "sequelize";
import BooksModel from "../../../modules/decormodel/books";
import { getNoReptItem } from "../../../modules/commontypes";
import { PaginationService } from "../../../common/PagerService";
import BookImageModel from "../../../modules/decormodel/bookImage";
import BookAttachment from "../../../modules/decormodel/bookAttachment";
import { ThirdCtgyModel } from "../../decormodel/ThirdCtgyModel";

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
    keyword: string = ""
  ) {
    const whereCondition: any = {};
    if (keyword) {
      whereCondition.bookname = {
        [Op.like]: `%${keyword}%`,
      };
    }

    // ✅ 新增关联配置
    const include = [
      {
        model: BookImageModel,
        as: "images",
        attributes: ["url", "filename"],
      },
      {
        model: BookAttachment,
        as: "attachments",
        attributes: ["url", "filename", "fileType"],
      },
      {
        model: ThirdCtgyModel,
        as: "thirdCtgy",            // 与@BelongsTo定义的别名一致
        attributes: ["thirdctgyname"],
        required: true              // 使用INNER JOIN
      }
    ];

    return PaginationService.paginate({
      page,
      pageSize,
      sortField,
      ascOrDesc,
      where: whereCondition,
      model: BooksModel,
      include, // 传递关联配置
    });
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
  ) {
    if (sortField === "price") {
      sortField = "originalprice";
    }
    return await BooksModel.findAll({
      order: [[sortField, ascOrDesc]],
      raw: true,
      where: { thirdctgyid },
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

  async findBooksByISBN(ISBN: string) {
    return await BooksModel.findOne({
      raw: true,
      where: {
        ISBN,
      },
    });
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
}
export default BookDao.bookDao;
