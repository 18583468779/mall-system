import BooksModel from "../../../modules/decormodel/books";

class BookDao {
  static bookDao: BookDao = new BookDao();
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
}
export default BookDao.bookDao;
