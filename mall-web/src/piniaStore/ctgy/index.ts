import { Module } from "vuex";
import { CtgyState, FirstCtgy, initCtgyState, SecondCtgy } from "./state";
import ctgyApi from "../../api/CtgyApi";
import { AxiosResponse } from "axios";
export const ctgyModule: Module<CtgyState, {}> = {
  namespaced: true,
  state: initCtgyState,
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList;
    },
    getSecondCtgyList(state) {
      return state.secondCtgyList;
    },
  },
  mutations: {
    storeFirstCtgyList(state, firstCtgyList: FirstCtgy[]) {
      state.firstCtgyList = firstCtgyList;
    },
    storeSecondCtgyList(state, SecondCtgyList: SecondCtgy[]) {
      state.secondCtgyList = SecondCtgyList;
    },
  },
  actions: {
    async findFirstCtgyList({ commit }) {
      const result = await ctgyApi.getFirstCtgyList();
      commit("storeFirstCtgyList", result.data);
    },
    async findSecThrdCtgy({ commit }, firstCtgyId: number) {
      const result: AxiosResponse<SecondCtgy[]> =
        await ctgyApi.getSecThrdCtgyList(firstCtgyId);
      result.data = result.data.map((s) => {
        s.isReadyOpen = true;
        s.subThirdctgys = s.thirdctgys.slice(0, 5);
        return s;
      });
      commit("storeSecondCtgyList", result.data);
    },
  },
};
