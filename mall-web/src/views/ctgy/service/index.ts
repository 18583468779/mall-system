import { ref, Ref } from "vue";
import { FirstCtgy } from "../../../store/state";
import { CtgyActions } from "../../../store/actions";
import { ctgyGettersProxy } from "../../../store/getters";
export class FstToThrdCtgy {
  static firstCtgyActiveIndex: Ref<number> = ref(0);
  static firstCtgyList: Ref<FirstCtgy[]> = ref([]);
  static async getFirstCtgys() {
    await CtgyActions.findFirstCtgyList();
    FstToThrdCtgy.firstCtgyList.value = ctgyGettersProxy.getFirstCtgyList;
  }
  static changeTab(index: number) {
    FstToThrdCtgy.firstCtgyActiveIndex.value = index;
  }
}
