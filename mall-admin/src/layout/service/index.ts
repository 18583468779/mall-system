import { storeToRefs } from "pinia";
import useMenuStore from "../../store/useMenuStore";
import useTabsStore, { type TabItem } from "../../store/useTabsStore";
import { type RouteLocationNormalized } from "vue-router";
import router from "../../router";
import { watch } from "vue";

class LayoutService {
  static init() {
    // 监听路由变化自动添加标签页
    watch(
      () => router.currentRoute.value,
      (to) => {
        LayoutService.addTab(to);
      },
      {
        immediate: true,
      }
    );
  }
  static get menuStore() {
    return useMenuStore();
  }

  static get tabsStore() {
    return useTabsStore();
  }

  static get menuStoreRefs() {
    return storeToRefs(this.menuStore);
  }

  static get tabsStoreRefs() {
    return storeToRefs(this.tabsStore);
  }

  static setMenuCollapse() {
    LayoutService.menuStore.setMenuCollapse();
  }

  static addTab(tab: RouteLocationNormalized) {
    LayoutService.tabsStore.addTab(tab);
  }

  static closeTab(name: string) {
    // 关闭 Tab 的逻辑
    LayoutService.tabsStore.closeTab(name);
    const currentTab = LayoutService.tabsStore.tabList.find(
      (tab) => tab.name === LayoutService.tabsStore.currentTab
    );
    router.push(currentTab?.path || "/");
  }

  static switchTab = (tab: TabItem) => {
    router.push(tab.path);
    LayoutService.tabsStore.currentTab = tab.name;
  };
}

export default LayoutService;
