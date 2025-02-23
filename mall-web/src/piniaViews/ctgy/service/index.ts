import { ref, Ref, watchEffect } from "vue";
import { FirstCtgy, SecondCtgy } from "../../../store/state";
import { ctgyStore } from "../../../piniaStore/ctgy";
import { storeToRefs } from "pinia";
export class FstToThrdCtgy {
  static store = ctgyStore();
  static storeRefs = storeToRefs(FstToThrdCtgy.store);
  static firstCtgyActiveIndex: Ref<number> = ref(0);
  static firstCtgyList: Ref<FirstCtgy[]> = ref([]);
  static secondCtgyList: Ref<SecondCtgy[]> = ref([]);

  static async getFirstCtgys() {
    await FstToThrdCtgy.store.findFirstCtgyList();
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
}
