import goodStorage from "good-storage";
import { defineStore } from "pinia";
import { BookInfo } from "./state";
import bookApi from "../../api/BookApi";
import { AxiosResponse } from "axios";
export default defineStore("bookstore", {
  state: () => {
    return {
      bookList: [] as BookInfo[],
    };
  },
  getters: {
    getBookList(state) {
      return state.bookList.length > 0
        ? state.bookList
        : goodStorage.get("bookList");
    },
  },
  actions: {
    async findBooksByThirdCtgyId(thirdCtgyId: number) {
      //根据三级分类获取图书
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getBookList(
        thirdCtgyId
      );
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },
    async findBooksBySecondCtgyId(secondCtgyId: number) {
      //根据二级分类获取图书
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getAllBookList(
        secondCtgyId
      );
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },
  },
});
