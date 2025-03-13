import goodStorage from "good-storage";
import { defineStore } from "pinia";
import { BookInfo } from "./state";
import bookApi from "../../api/BookApi";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import searchStore from "../search";
export enum Operate {
  INIT = 0,
  THRDCTGYID = 1,
  AUTOCOMPKEYWORD = 2,
}
type InitStateType = {
  bookList: BookInfo[];
  operate: Operate;
};
const initState: InitStateType = {
  bookList: [],
  operate: Operate.INIT,
};

export default defineStore("bookstore", {
  state: () => initState,
  getters: {
    getBookList(state) {
      return state.bookList.length > 0
        ? state.bookList
        : goodStorage.get("bookList");
    },
    getOperate(state) {
      return state.operate || storage.get("operate");
    },
    //add:bookstore访问searchstore
    getAutoCompKeyword() {
      return searchStore().getStoreAutoCompKeyword;
    },
  },
  actions: {
    storeOperate(operate: Operate) {
      this.operate = operate;
      storage.set("operate", this.operate);
    },

    async findBooksByThirdCtgyId(
      thirdCtgyId: number,
      sortField: string,
      ascOrdesc: string
    ) {
      //根据三级分类获取图书
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getBookList(
        thirdCtgyId,
        sortField,
        ascOrdesc
      );
      bookList.data = bookList.data.map((book) => {
        book.discountprice = toFixed_(book.originalprice * book.discount); //计算折扣价格
        return book;
      });
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },
    async findBooksBySecondCtgyId(secondCtgyId: number) {
      //根据二级分类获取图书
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getAllBookList(
        secondCtgyId
      );
      bookList.data = bookList.data.map((book) => {
        book.discountprice = toFixed_(book.originalprice * book.discount); //计算折扣价格
        return book;
      });
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },

    async findBooksByAutocompKeyword(autoCompKeyword: string) {
      const bookList: AxiosResponse<BookInfo[]> =
        await bookApi.findBooksByAutoCompKeyword(autoCompKeyword);
      this.bookList = bookList.data;
      storage.set("bookList", bookList.data);
    },
  },
});

const toFixed_ = (num: number): number => {
  if (num.toString().indexOf(".") !== -1) {
    //如果是小数
    return parseFloat(num.toFixed(2));
  }
  return num;
};
