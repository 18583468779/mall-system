import request from "../utils/axiosUtil";

class BookletChapterAPI {
  static api: BookletChapterAPI = new BookletChapterAPI();
  async addBookletChapter(data: any) {
    return await request.post(
      "/bookletchaptermodule/addBookletChapter",
      false,
      data
    );
  }
  async getBookletsChapter() {
    return await request.get("/bookletchaptermodule/getBookletsChapter", false);
  }
  async updateBookletChapter(id: number, data: any) {
    return await request.post(
      "/bookletchaptermodule/updateBookletChapter",
      false,
      {
        id,
        ...data,
      }
    );
  }
  async deleteBookletChapter(id: number) {
    return await request.post(
      "/bookletchaptermodule/deleteBookletChapter",
      false,
      {
        id,
      }
    );
  }
}
export default BookletChapterAPI.api;
