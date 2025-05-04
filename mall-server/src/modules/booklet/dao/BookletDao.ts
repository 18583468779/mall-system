import { Booklet } from "../../../modules/decormodel/Booklet";
import BookletService from "../service";
interface BookletType {
  booklet_id?: number;
  title: string;
  description: string;
  cover_image: string;
  price: number;
  order: number;
  is_free: boolean;
  userid: number;
  status: "draft" | "published" | "archived";
}

class BookletDao {
  static bookletDao: BookletDao = new BookletDao();

  async getBookletAndContentById(booklet_id: number) {
    return await BookletService.getBookletAndContentById(booklet_id);
  }
  async addBooklet(data: any) {
    return await Booklet.create(data);
  }
  async getBooklets() {
    return await Booklet.findAll();
  }
  async updateBooklet(id: number, data: any) {
    return await Booklet.update(data, { where: { booklet_id: id } });
  }
  async deleteBooklet(id: number) {
    return await Booklet.destroy({ where: { booklet_id: id } });
  }
}

export default BookletDao.bookletDao;
