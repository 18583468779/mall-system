import request from "../utils/axiosUtil";

class BookAPI {
  static api: BookAPI = new BookAPI();
  getBookList(thirdCtgyId: number) {
    return request.get(
      `/booksmodule/findBooksByThirdCtgyId/${thirdCtgyId}}`,
      false
    );
  }
  getAllBookList(secondCtgyId: number) {
    return request.get(
      `/booksmodule/findBooksAllThirdCtgy/${secondCtgyId}}`,
      false
    );
  }
}

export default BookAPI.api;
