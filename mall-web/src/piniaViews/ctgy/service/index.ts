import { ref, Ref, watchEffect } from "vue";
import { FirstCtgy, SecondCtgy, ThirdCtgy } from "../../../store/state";
import { ctgyStore } from "../../../piniaStore/ctgy";
import { storeToRefs } from "pinia";
import router from "../../../router";
import Books from "../../books/service";
import bookStore, { Operate } from "../../../piniaStore/book";
export class FstToThrdCtgy {
  static store = ctgyStore();
  static storeRefs = storeToRefs(FstToThrdCtgy.store);
  static bkStore = bookStore();
  static firstCtgyActiveIndex: Ref<number> = ref(0);
  static firstCtgyList: Ref<FirstCtgy[]> = ref([]);
  static secondCtgyList: Ref<SecondCtgy[]> = ref([]);

  static async getFirstCtgys() {
    await FstToThrdCtgy.store.findFirstCtgyList();
    FstToThrdCtgy.storeFirstCtgy(0);
  }
  static storeFirstCtgy(index: number) {
    // 保存一级分类
    const firstCtgy = FstToThrdCtgy.store.firstCtgyList.find((f) => {
      return f.firstctgyId === index + 1;
    })!;
    FstToThrdCtgy.store.storeFirstCtgy(firstCtgy);
  }
  static getSecondCtgys() {
    watchEffect(async () => {
      await FstToThrdCtgy.store.findSecThrdCtgy(
        FstToThrdCtgy.firstCtgyActiveIndex.value + 1
      );
    });
  }
  static changeTab(index: number) {
    FstToThrdCtgy.firstCtgyActiveIndex.value = index;
    FstToThrdCtgy.storeFirstCtgy(index);
  }
  static openOrCollapse(event: Event, secondctgy: SecondCtgy) {
    const currentTarget = <HTMLBodyElement>event.currentTarget;
    const uPanel = currentTarget.parentElement!;
    if (secondctgy.isReadyOpen) {
      secondctgy.isReadyOpen = false;
      if (secondctgy.thirdctgys.length % 3 === 0)
        uPanel.style.paddingBottom = 0.5 + "rem";
    } else {
      secondctgy.isReadyOpen = true;
    }
  }
  static showColLine(index: number) {
    return (index + 1) % 3 !== 0;
  }
  static toBookInfo = (item: ThirdCtgy, secondctgy: SecondCtgy) => {
    FstToThrdCtgy.store.storeThirdCtgy(item);
    FstToThrdCtgy.store.storeSecondCtgy(secondctgy);
    FstToThrdCtgy.store.storeThirdCtgyList(secondctgy.thirdctgys);
    FstToThrdCtgy.store.storeSubThirdCtgyList(secondctgy.subThirdctgys);
    FstToThrdCtgy.store.storeIsReadyOpen(secondctgy.isReadyOpen);
    FstToThrdCtgy.bkStore.storeOperate(Operate.THRDCTGYID);
    router.push({ name: "books" });
  };
  static opOrCollapseInBook = (isOpen: boolean) => {
    FstToThrdCtgy.store.storeIsReadyOpen(isOpen);
  };
  static handleSelectThird = (thirdCtgy: ThirdCtgy) => {
    // 切换选中三级分类
    FstToThrdCtgy.store.handleThirdCtgyListSelected(thirdCtgy);
    Books.findBooksByThirdCtgyId();
  };
  static handleSelectAll() {
    // 切换选中三级分类（全部）
    FstToThrdCtgy.store.handleSelectAll();
  }
  static back() {
    router.back();
  }
}
