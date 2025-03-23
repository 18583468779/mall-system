import { storeToRefs } from "pinia";
import bookStore from "../../../piniaStore/book";
import evaluateStore, { EvalRplLst } from "../../../piniaStore/evaluate";
import { onMounted, onUnmounted, Ref, ref, watch } from "vue";
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
  static evalRplLst: Ref<EvalRplLst[]> = ref([]); // 保存好中差评列表
  static cancelRpShowIndx = ref(-1); // -1 回复 | 其他 取消回复
  static async searchEvalRplLst() {
    await EvaluateClass.store.findEvalRplLst();
    EvaluateClass.evalRplLst.value = EvaluateClass.store.evalRplLst;
    EvaluateClass.calEvalDegrees();
  }

  static controllerScroll(scrollMode: string) {
    // 控制滚动条
    document.documentElement.style.overflowY = scrollMode;
    document.body.style.overflowY = scrollMode;
  }

  static ctrlHeadAndDegree(isShow: boolean) {
    EvaluateClass.store.headAndDegree = isShow;
  }
  // 回复
  static reply($event: Event, index: number) {
    EvaluateClass.cancelRpShowIndx.value = index;
    EvaluateClass.changeClassName($event, "reply-panel-show");
    EvaluateClass.controllerScroll("hidden");
    EvaluateClass.ctrlHeadAndDegree(false);
  }

  // 取消回复
  static cancelReply($event: Event) {
    EvaluateClass.cancelRpShowIndx.value = -1;
    EvaluateClass.changeClassName($event, "reply-panel");
    EvaluateClass.controllerScroll("scroll");
    EvaluateClass.ctrlHeadAndDegree(true);
  }

  static changeClassName($event: Event, className: string) {
    const rplEle = $event.currentTarget as HTMLBodyElement;
    const rplPanel = rplEle.parentElement!.nextElementSibling!;
    rplPanel.className = className;
  }
  static restoreEvalNum() {
    EvaluateClass.goodEvalNum.value = 0;
    EvaluateClass.mediumEvalNum.value = 0;
    EvaluateClass.negativeEvalNum.value = 0;
  }

  static getEvalRplLst(evalDegree: number) {
    const evalRpLst = EvaluateClass.store.evalRplLst;
    if (evalDegree !== 0) {
      EvaluateClass.evalRplLst.value = evalRpLst.filter((e) => {
        return e.evaluatedegree === evalDegree;
      });
    } else if (evalDegree === 0) {
      EvaluateClass.evalRplLst.value = evalRpLst;
    }
  }
  static showAllEvalRplLst() {
    EvaluateClass.getEvalRplLst(0);
  }
  static showGoodEvalRplLst() {
    EvaluateClass.getEvalRplLst(1);
  }
  static showMedEvalRplLst() {
    EvaluateClass.getEvalRplLst(2);
  }
  static showNagEvalRplLst() {
    EvaluateClass.getEvalRplLst(3);
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
