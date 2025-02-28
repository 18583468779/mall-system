import request from "../utils/axiosUtil";

class BookAPI {
  static api: BookAPI = new BookAPI();
  getBookList(thirdCtgyId: number) {
    return request.get(
      `/booksmodule/findBooksByThirdCtgyId/${thirdCtgyId}}`,
      false
    );
  }
}

export default BookAPI.api;
