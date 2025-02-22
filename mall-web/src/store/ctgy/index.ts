import { Module } from "vuex";
import { CtgyState, FirstCtgy, initCtgyState, SecondCtgy } from "./state";
import ctgyApi from "../../api/CtgyApi";
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
      const result = await ctgyApi.getSecThrdCtgyList(firstCtgyId);
      commit("storeSecondCtgyList", result.data);
    },
  },
};
