import { defineStore } from "pinia";
import { FirstCtgy, SecondCtgy, ThirdCtgy } from "./state";
import ctgyApi from "../../api/CtgyApi";
import { AxiosResponse } from "axios";
import goodStorage from "good-storage";
export const ctgyStore = defineStore("ctgyStore", {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[], // 存放所有的一级分类
      secondCtgyList: [] as SecondCtgy[], // 存放所有的二级分类
      thirdCtgyList: [] as ThirdCtgy[], // 存放二级分类对应的三级分类(展开后)
      subThirdCtgyList: [] as ThirdCtgy[], // 存放二级分类对应的三级分类（未展开）
      firstCtgy: {} as FirstCtgy, // 存放一级分类
      secondCtgy: {} as SecondCtgy, // 存在二级分类
      thirdCtgy: {} as ThirdCtgy, // 存放三级分类
      isReadyOpen: true, // 是否展开三级分类状态
    };
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList;
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList;
    },
    getThirdCtgyList(state): ThirdCtgy[] {
      // 获取三级分类列表
      return goodStorage.get("thirdCtgyList") || state.thirdCtgyList;
    },
    getSubThirdCtgyList(state): ThirdCtgy[] {
      // 获取三级分类列表
      return goodStorage.get("subThirdCtgyList") || state.subThirdCtgyList;
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
    getIsReadyOpen(state) {
      return state.isReadyOpen;
    },
  },
  actions: {
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      // 保存选中一级分类
      goodStorage.set("firstCtgy", firstCtgy);
      this.firstCtgy = firstCtgy;
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      // 保存选中二级分类
      goodStorage.set("secondCtgy", secondCtgy);
      this.secondCtgy = secondCtgy;
    },
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      // 保存选中三级分类
      goodStorage.set("thirdCtgy", thirdCtgy);
      this.thirdCtgy = thirdCtgy;
    },
    storeThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      // 保存选中三级分类列表（展开后）
      goodStorage.set("thirdCtgyList", thirdCtgyList);
      this.thirdCtgyList = thirdCtgyList;
    },
    storeSubThirdCtgyList(subThirdCtgyList: ThirdCtgy[]) {
      // 保存选中三级分类列表（未展开）
      goodStorage.set("subThirdCtgyList", subThirdCtgyList);
      this.subThirdCtgyList = subThirdCtgyList;
    },
    storeIsReadyOpen(isReadyOpen: boolean) {
      this.isReadyOpen = isReadyOpen;
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
