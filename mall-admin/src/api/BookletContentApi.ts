import request from "../utils/axiosUtil";

class BookletContentAPI {
  static api: BookletContentAPI = new BookletContentAPI();
  async addBookletContent(data: any) {
    return await request.post(
      "/bookletcontentmodule/addBookletContent",
      false,
      data
    );
  }
  async getBookletContent() {
    return await request.get("/bookletcontentmodule/getBookletContent", false);
  }
  async updateBookletContent(id: number, data: any) {
    return await request.post(
      "/bookletcontentmodule/updateBookletContent",
      false,
      {
        id,
        ...data,
      }
    );
  }
  async deleteBookletContent(id: number) {
    return await request.post(
      "/bookletcontentmodule/deleteBookletContent",
      false,
      {
        id,
      }
    );
  }
}
export default BookletContentAPI.api;
