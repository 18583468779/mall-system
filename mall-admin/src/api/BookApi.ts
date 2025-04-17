import request from "../utils/axiosUtil";


class BookAPI {
  static api: BookAPI = new BookAPI();
  findBooksByPage( data?: any) {
    return request.post(`/booksmodule/findBooksByPage`, false, data); 
  }
  saveBooks(data:any) {
    return request.post("/booksmodule/saveBooks", false,data);
  }

}
export default BookAPI.api;
