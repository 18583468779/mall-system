import { defineStore } from "pinia";

export const testStore = defineStore("testStore", {
  state: () => {
    return {
      username: "xiewen",
      phone: 13123123123,
      age: 23,
    };
  },
  getters: {
    getUser(state) {
      return "user:" + state.username + "age:" + state.age;
    },
  },
  actions: {
    findUser(username: string, age: number) {
      this.username = username;
      this.age = age;
    },
  },
});
