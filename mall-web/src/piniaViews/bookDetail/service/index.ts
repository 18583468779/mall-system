import { storeToRefs } from "pinia";
import bookStore from "../../../piniaStore/book";
import { onMounted, onUnmounted, ref } from "vue";
export default class BookDetailsService {
  static store = bookStore();
  static headerOpacity = ref({ opacity: 0 }); // 头部透明度
  static picRef = ref<HTMLDivElement>(); // 图片的高度
  static storeRefs = storeToRefs(BookDetailsService.store);
  static init() {
    BookDetailsService.initScrollTop();
    BookDetailsService.findBooksByISBN();
    onMounted(() => {
      window.addEventListener("scroll", BookDetailsService.bookScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", BookDetailsService.bookScroll);
    });
  }

  static initScrollTop() {
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  static async findBooksByISBN() {
    await BookDetailsService.store.findBooksByISBN();
  }
  static bookScroll() {
    // 监听滚动事件
    const scrollTop =
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop;
    const picHeight = BookDetailsService.picRef.value?.offsetHeight!;
    if (scrollTop > 90) {
      BookDetailsService.headerOpacity.value.opacity = scrollTop / picHeight;
    } else {
      BookDetailsService.headerOpacity.value.opacity = 0;
    }
  }
}
