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
}
export default BookDao.bookDao;
