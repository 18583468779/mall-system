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
  public async getBookletAndContentById(booklet_id: number) {
    return await Booklet.findOne({
      raw: false,
      nest: true,
      where: {
        booklet_id,
      },
      include: [
        {
          model: BookletChapter,
          as: "chapters",
          include: [
            {
              model: BookletContent,
              as: "content",
            },
          ],
        },
      ],
    });
  }
}

export default BookletService.getInstance();
