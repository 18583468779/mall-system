import { ref, Ref, watchEffect } from "vue";
import { FirstCtgy, SecondCtgy } from "../../../store/state";
import { CtgyActions } from "../../../store/actions";
import { ctgyGettersProxy } from "../../../store/getters";
export class FstToThrdCtgy {
  static firstCtgyActiveIndex: Ref<number> = ref(0);
  static firstCtgyList: Ref<FirstCtgy[]> = ref([]);
  static secondCtgyList: Ref<SecondCtgy[]> = ref([]);

  static async getFirstCtgys() {
    await CtgyActions.findFirstCtgyList();
    FstToThrdCtgy.firstCtgyList.value = ctgyGettersProxy.getFirstCtgyList;
  }
  static getSecondCtgys() {
    watchEffect(async () => {
      await CtgyActions.findSecThrdCtgy(
        FstToThrdCtgy.firstCtgyActiveIndex.value + 1
      );
      FstToThrdCtgy.secondCtgyList.value = ctgyGettersProxy.getSecondCtgyList;
      console.log(
        "FstToThrdCtgy.secondCtgyList.value ",
        ctgyGettersProxy.getSecondCtgyList
      );
    });
  }
  static changeTab(index: number) {
    FstToThrdCtgy.firstCtgyActiveIndex.value = index;
  }
}
