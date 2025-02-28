import BooksModel from "../../../modules/decormodel/books";

class BookDao {
  static bookDao: BookDao = new BookDao();
  /**
   *  根据三级分类id查询图书
   */
  async findBooksByThirdCtgyId(thirdctgyid: number) {
    return await BooksModel.findAll({
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
