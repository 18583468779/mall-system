import request from "../utils/axiosUtil";

class BookletAPI {
  static api: BookletAPI = new BookletAPI();
  async addBooklet(data: any) {
    return await request.post("/bookletmodule/addBooklet", false, data);
  }
  async getBooklets() {
    return await request.get("/bookletmodule/getBookletList", false);
  }
  async updateBooklet(id: number, data: any) {
    return await request.post("/bookletmodule/updateBooklet", false, {
      id,
      ...data,
    });
  }
  async deleteBooklet(id: number) {
    return await request.post("/bookletmodule/deleteBooklet", false, { id });
  }
}
export default BookletAPI.api;
