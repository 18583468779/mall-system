import request from "../utils/axiosUtil";

class BookAPI {
  static api: BookAPI = new BookAPI();
  getBookList(thirdCtgyId: number, sortField: string, ascOrdesc: string) {
    return request.get(
      `/booksmodule/findBooksByThirdCtgyId/${thirdCtgyId}/${sortField}/${ascOrdesc}`,
      false
    );
  }
  getAllBookList(secondCtgyId: number) {
    return request.get(
      `/booksmodule/findBooksAllThirdCtgy/${secondCtgyId}}`,
      false
    );
  }
  // 根据关键字模糊查询图书列表
  findBooksByAutoCompKeyword(autoCompKeyword: string) {
    return request.get(
      `/booksmodule/findBooksByAutocompKeyword/${autoCompKeyword}`,
      false
    );
  }
}

export default BookAPI.api;
