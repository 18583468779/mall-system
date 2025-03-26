import request from "../utils/axiosUtil";

class BookAPI {
  static api: BookAPI = new BookAPI();

  getBookListByPage(page: number, pageSize: number) {
    return request.post(`/booksmodule/findBooksByPage`, false, {
      page,
      pageSize,
    });
  }

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
  // 获取图书的出版社信息

  findPublisersByAutoCompKey(autoCompKeyword: string) {
    return request.get(
      `/booksmodule/findPublisersByAutoCompKey/${autoCompKeyword}`,
      false
    );
  }

  findBksByPublishIds(publishids: number[]) {
    return request.post(`/booksmodule/findBksByPublishIds`, false, publishids);
  }
  findBooksByISBN(ISBN: string) {
    return request.get(`/booksmodule/findBooksByISBN/${ISBN}`, false);
  }
}

export default BookAPI.api;
