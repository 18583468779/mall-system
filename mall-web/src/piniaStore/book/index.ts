import goodStorage from "good-storage";
import { defineStore } from "pinia";
import { BookInfo } from "./state";
import bookApi from "../../api/BookApi";
import { AxiosResponse } from "axios";
import storage from "../../utils/goodStorageUtil";
import searchStore from "../search";
import shopCartStore from "../shopcart";
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
  allBookList: BookInfo[];
  publisherList: Publisher[];
  bookDetail: any;
  operate: Operate;
  isbn: string;
  // 新增分页状态
  currentPage: number;
  totalPages: number;
  total: number;
  isLoading: boolean;
  hasMore: boolean;
};
const initState: InitStateType = {
  bookList: [],
  allBookList: [],
  publisherList: [],
  bookDetail: {},
  operate: Operate.INIT,
  isbn: "",
  currentPage: 1,
  totalPages: 1,
  total: 1,
  isLoading: false,
  hasMore: true,
};

export default defineStore("bookstore", {
  state: () => initState,
  getters: {
    getAllBookList(state) {
      return state.allBookList.length > 0
        ? state.allBookList
        : goodStorage.get("allBookList");
    },
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
      return state.bookDetail || storage.get("bookDetail");
    },
    getISBN(state) {
      return state.isbn.length > 0 ? state.isbn : storage.get("isbn");
    },
  },
  actions: {
    async getBookListByPage(page = 1, pageSize = 8, isMobile = false) {
      try {
        this.isLoading = true;
        const response = await bookApi.getBookListByPage(page, pageSize);

        // 如果是第一页则重置数据，否则追加数据
        if (isMobile) {
          if (page === 1) {
            this.allBookList = response.data.data;
          } else {
            this.allBookList = [...this.allBookList, ...response.data.data];
          }
        } else {
          this.allBookList = response.data.data;
        }

        // 更新分页信息（假设接口返回总页数）
        this.currentPage = page;
        this.totalPages = response.data.totalPages;
        this.total = response.data.total;
        this.hasMore = page < response.data.totalPages;

        storage.set("allBookList", this.allBookList);
      } catch (error) {
        console.error("Failed to load books:", error);
      } finally {
        this.isLoading = false;
      }
    },
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
      const scStore = shopCartStore(); // 获取购物车 store 实例
      // 获取图书详情
      const bookDetail: AxiosResponse<BookInfo> = await bookApi.findBooksByISBN(
        this.getISBN
      );
      // 初始化购物车数量（从购物车列表查找当前书籍的数量）
      const cartItem = scStore.getShopCartList?.find(
        (item) => item.bookisbn == bookDetail.data.ISBN
      );
      bookDetail.data["purcharsenum"] = cartItem?.purcharsenum || 0;

      this.bookDetail = bookDetail.data;
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
      this.allBookList = bookList.data;
      goodStorage.set("allBookList", this.allBookList);
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
      this.allBookList = bookList.data;
      storage.set("allBookList", bookList.data);
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
