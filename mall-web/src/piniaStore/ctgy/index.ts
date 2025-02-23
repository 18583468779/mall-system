import { defineStore } from "pinia";
import { FirstCtgy, SecondCtgy } from "./state";
import ctgyApi from "../../api/CtgyApi";
import { AxiosResponse } from "axios";
export const ctgyStore = defineStore("ctgyStore", {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[],
      secondCtgyList: [] as SecondCtgy[],
    };
  },
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList;
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList;
    },
  },
  actions: {
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
