import { defineStore } from "pinia";

export default defineStore("menuStore", {
  state() {
    return {
      menuCollapse: false, // 菜单是否折叠
    };
  },
  getters: {},
  actions: {
    setMenuCollapse() {
      // 设置菜单是否折叠
      this.menuCollapse = !this.menuCollapse;
    },
  },
});
