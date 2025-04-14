import { defineStore } from "pinia";
import router from "../router";

export default defineStore("userStore", {
  state() {
    return {
      access_token: null as string | null,
      userInfo: null as any,
    };
  },
  getters: {},
  actions: {
    setUserInfo(userInfo: any) {
      this.access_token = userInfo.token;
      this.userInfo = userInfo;
    },
    logout() {
      // 退出登录
     this.$reset();
     this.$persist();
      router.push("/login"); // 重定向到登录页面
    },
  },
  persist: {
    key:'userInfo',
    storage: localStorage, // 存储的位置，默认为 localStorage
    pick: ["userInfo","access_token"], // 要持久化的状态字段
  }
});
