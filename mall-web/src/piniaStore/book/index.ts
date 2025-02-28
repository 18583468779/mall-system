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
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getBookList(
        thirdCtgyId
      );
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },
  },
});
