import { defineStore } from "pinia";
import { FirstCtgy, SecondCtgy, ThirdCtgy } from "./state";
import ctgyApi from "../../api/CtgyApi";
import { AxiosResponse } from "axios";
import goodStorage from "good-storage";
export const ctgyStore = defineStore("ctgyStore", {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[],
      secondCtgyList: [] as SecondCtgy[],
      firstCtgy: {} as FirstCtgy, // 存放一级分类
      secondCtgy: {} as SecondCtgy, // 存在二级分类
      thirdCtgy: {} as ThirdCtgy, // 存放三级分类
    };
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList;
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList;
    },
    getFirstCtgy(state): FirstCtgy {
      // 获取一级分类
      return goodStorage.get("firstCtgy") || state.firstCtgy;
    },
    getSecondCtgy(state): SecondCtgy {
      // 获取二级分类
      return goodStorage.get("secondCtgy") || state.secondCtgy;
    },
    getThirdCtgy(state): ThirdCtgy {
      // 获取三级分类
      return goodStorage.get("thirdCtgy") || state.thirdCtgy;
    },
  },
  actions: {
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      // 保存一级分类
      goodStorage.set("firstCtgy", firstCtgy);
      this.firstCtgy = firstCtgy;
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      // 保存二级分类
      goodStorage.set("secondCtgy", secondCtgy);
      this.secondCtgy = secondCtgy;
    },
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      // 保存三级分类
      goodStorage.set("thirdCtgy", thirdCtgy);
      this.thirdCtgy = thirdCtgy;
    },
    async findFirstCtgyList() {
      const result = await ctgyApi.getFirstCtgyList();
      this.firstCtgyList = result.data;
    },
    async findSecThrdCtgy(firstCtgyId: number) {
      const result: AxiosResponse<SecondCtgy[]> =
        await ctgyApi.getSecThrdCtgyList(firstCtgyId);
      result.data = result.data.map((s) => {
        s.isReadyOpen = true;
        s.subThirdctgys = s.thirdctgys.slice(0, 5);
        return s;
      });
      this.secondCtgyList = result.data;
    },
  },
});
