import goodStorage from "good-storage";
import { defineStore } from "pinia";
import { BookInfo } from "./state";
import bookApi from "../../api/BookApi";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import searchStore from "../search";

function hasProps(data: any) {
  if (Array.isArray(data)) {
    return Boolean(data.length);
  } else if (data.constructor === Object) {
    return Boolean(Object.getOwnPropertyNames(data).length);
  }
}

export enum Operate {
  INIT = 0,
  THRDCTGYID = 1,
  AUTOCOMPKEYWORD = 2,
}
export interface Publisher {
  publishid: number;
  publishername: string;
}
type InitStateType = {
  bookList: BookInfo[];
  publisherList: Publisher[];
  bookDetail: BookInfo | {};
  operate: Operate;
  isbn: string;
};
const initState: InitStateType = {
  bookList: [],
  publisherList: [],
  bookDetail: {},
  operate: Operate.INIT,
  isbn: "",
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
    getBookDetail(state) {
      if (hasProps(state.bookDetail)) {
        return state.bookDetail as BookInfo;
      } else {
        state.bookDetail = goodStorage.get("bookDetail");
        return state.bookDetail as BookInfo;
      }
    },
    getISBN(state) {
      return state.isbn.length > 0 ? state.isbn : storage.get("isbn");
    },
  },
  actions: {
    storeOperate(operate: Operate) {
      this.operate = operate;
      storage.set("operate", this.operate);
    },
    // 储存图书详情跳转isbn
    storeBookDetailISBN(isbn: string) {
      this.isbn = isbn;
      storage.set("isbn", this.isbn);
    },
    async findBooksByISBN() {
      const bookDetail: AxiosResponse<BookInfo> = await bookApi.findBooksByISBN(
        this.getISBN
      );
      this.bookDetail = bookDetail.data;
      calDisCount([this.bookDetail] as BookInfo[]);
      storage.set("bookDetail", bookDetail.data);
    },
    async findBksByPublishIds(publishids: number[]) {
      const bookList: AxiosResponse<BookInfo[]> =
        await bookApi.findBksByPublishIds(publishids);
      calDisCount(bookList.data);
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },
    async findPublisersByAutoCompKey() {
      const res: AxiosResponse<Publisher[]> =
        await bookApi.findPublisersByAutoCompKey(this.getAutoCompKeyword);
      this.publisherList = res.data;
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
      calDisCount(bookList.data);
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },
    async findBooksBySecondCtgyId(secondCtgyId: number) {
      //根据二级分类获取图书
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.getAllBookList(
        secondCtgyId
      );
      calDisCount(bookList.data);
      this.bookList = bookList.data;
      goodStorage.set("bookList", this.bookList);
    },

    async findBooksByAutocompKeyword(autoCompKeyword: string) {
      const bookList: AxiosResponse<BookInfo[]> =
        await bookApi.findBooksByAutoCompKeyword(autoCompKeyword);
      calDisCount(bookList.data);
      this.bookList = bookList.data;
      storage.set("bookList", bookList.data);
    },
  },
});

function calDisCount(bookList: BookInfo[]) {
  bookList = bookList.map((book) => {
    book.discountprice = toFixed_(book.originalprice * book.discount); //计算折扣价格
    return book;
  });
}

const toFixed_ = (num: number): number => {
  if (num.toString().indexOf(".") !== -1) {
    //如果是小数
    return parseFloat(num.toFixed(2));
  }
  return num;
};
