import request from "../utils/axiosUtil";


class BookAPI {
  static api: BookAPI = new BookAPI();
  findBooksByPage( data?: any) {
    return request.post(`/booksmodule/findBooksByPage`, false, data); 
  }
  saveBooks(data:any) {
    return request.post("/booksmodule/saveBooks", false,data);
  }
  deleteBooks(ISBN:any) {
    return request.post("/booksmodule/deleteBooks", false,{ISBN}); 
  }

}
export default BookAPI.api;
