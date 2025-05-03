import { BookletChapter } from "../../../modules/decormodel/BookletChapter";

class BookletChapterDao {
  static bookletChapterDao: BookletChapterDao = new BookletChapterDao();

  async addBookletChapter(data: any) {
    return await BookletChapter.create(data);
  }
  async getBookletsChapter() {
    return await BookletChapter.findAll();
  }
  async updateBookletChapter(id: number, data: any) {
    return await BookletChapter.update(data, { where: { chapter_id: id } });
  }
  async deleteBookletChapter(id: number) {
    return await BookletChapter.destroy({ where: { chapter_id: id } });
  }
}

export default BookletChapterDao.bookletChapterDao;
