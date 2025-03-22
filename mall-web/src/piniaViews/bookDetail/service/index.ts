import { storeToRefs } from "pinia";
import bookStore from "../../../piniaStore/book";
import evaluateStore from "../../../piniaStore/evaluate";
import { onMounted, onUnmounted, ref, watch } from "vue";
export default class BookDetailsService {
  static store = bookStore();
  static headerOpacity = ref({ opacity: 0 }); // 头部透明度
  static picRef = ref<HTMLDivElement>(); // 图片的高度
  static storeRefs = storeToRefs(BookDetailsService.store);
  static init() {
    BookDetailsService.initScrollTop();

    onMounted(() => {
      window.addEventListener("scroll", BookDetailsService.bookScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", BookDetailsService.bookScroll);
    });

    BookDetailsService.findBooksByISBN();
  }

  static setHeaderOpacity(opacity: number) {
    BookDetailsService.headerOpacity.value.opacity = opacity;
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

export class EvaluateClass {
  static store = evaluateStore();
  static storeRef = storeToRefs(EvaluateClass.store);
  static goodEvalNum = ref(0);
  static mediumEvalNum = ref(0);
  static negativeEvalNum = ref(0);
  static async searchEvalRplLst() {
    await EvaluateClass.store.findEvalRplLst();
    EvaluateClass.calEvalDegrees();
  }
  static restoreEvalNum() {
    EvaluateClass.goodEvalNum.value = 0;
    EvaluateClass.mediumEvalNum.value = 0;
    EvaluateClass.negativeEvalNum.value = 0;
  }
  static calEvalDegrees() {
    EvaluateClass.restoreEvalNum();
    const evalDegrees = getOneItemValuesFrmArr(
      EvaluateClass.store.evalRplLst,
      "evaluatedegree"
    );
    evalDegrees.forEach((e) => {
      if (e === 1) {
        EvaluateClass.goodEvalNum.value++;
      } else if (e === 2) {
        EvaluateClass.mediumEvalNum.value++;
      } else if (e === 3) {
        EvaluateClass.negativeEvalNum.value++;
      }
    });
  }
}
export type EleOfArr<T> = T extends Array<infer E> ? E : never;

export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K];
};
export function getOneItemValuesFrmArr<
  T extends ItemType<T>[],
  K extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v;
  });
}
