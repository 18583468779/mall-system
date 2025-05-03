import { BookletContent } from "../../../modules/decormodel/BookletContent";

class BookletContentDao {
  static bookletContentDao: BookletContentDao = new BookletContentDao();

  async addBookletContent(data: any) {
    return await BookletContent.create(data);
  }
  async getBookletContent() {
    return await BookletContent.findAll();
  }
  async updateBookletContent(id: number, data: any) {
    return await BookletContent.update(data, { where: { content_id: id } });
  }
  async deleteBookletContent(id: number) {
    return await BookletContent.destroy({ where: { content_id: id } });
  }
}

export default BookletContentDao.bookletContentDao;
