// stores/tabStore.ts
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export type TabItem = {
  name: string
  title: string
  path: string
  cacheName?: string
}

 const useTabStore = defineStore('tab', {
  state: () => ({
    tabList: [] as TabItem[],
    cachedComponents: new Set<string>(),
    currentTab: ''
  }),
  actions: {
    addTab(route: RouteLocationNormalized) {
      if (route.meta?.hideTab) return
      
      const existingTab = this.tabList.find(tab => tab.name === route.name)
      if (!existingTab) {
        const tab = {
          name: route.name as string,
          title: route.meta.title as string,
          path: route.path,
          cacheName: route.meta.cacheName as string || route.name as string
        }
        this.tabList.push(tab)
        this.cachedComponents.add(tab.cacheName)
      }
      this.currentTab = route.name as string
    },
    
    closeTab(tabName: string) {
      const index = this.tabList.findIndex(tab => tab.name === tabName)
      if (index === -1) return

      const [closedTab] = this.tabList.splice(index, 1)
      this.cachedComponents.delete(closedTab.cacheName || closedTab.name)
      
      if (this.currentTab === tabName) {
        const newCurrentTab = this.tabList[index] || this.tabList[index - 1]
        this.currentTab = newCurrentTab?.name || ''
      }
    }
  }
})

export default useTabStore