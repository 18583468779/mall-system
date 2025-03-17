import { Ref, onMounted, onUnmounted, ref } from "vue";
import { storeToRefs } from "pinia";
import bookStore, { Operate } from "../../../piniaStore/book";
export default class BookDetailsService {
  static store = bookStore();
  static storeRefs = storeToRefs(BookDetailsService.store);
  static async findBooksByISBN() {
    await BookDetailsService.store.findBooksByISBN();
  }
}
