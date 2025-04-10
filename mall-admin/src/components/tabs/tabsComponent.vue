<template>
    <div class="tag-container relative bg-white border-b border-gray-200 flex items-center px-4 h-12">
      <!-- 滚动区域 -->
      <div class="flex-1 overflow-x-auto scroll-smooth">
        <div class="flex h-11 items-center space-x-1">
          <!-- 单个标签 -->
          <div 
            v-for="tab in tabsStore.tabList"
            :key="tab.name"
            class="tag-item group relative flex items-center h-full px-4 rounded-t-lg cursor-pointer transition-all duration-300"
            :class="{
              'tag-active': tabsStore.currentTab === tab.name,
              'hover:bg-gray-50': tabsStore.currentTab !== tab.name
            }"
            @click="switchTab(tab)"
          >
            <!-- 激活状态条 -->
            <div 
              v-if="tabsStore.currentTab === tab.name"
              class="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500 animate-indicator"
            ></div>
            
            <!-- 标签文字 -->
            <span 
              class="text-sm transition-colors"
              :class="{
                'text-primary-600 font-medium': tabsStore.currentTab === tab.name,
                'text-gray-600': tabsStore.currentTab !== tab.name
              }"
            >
              {{ tab.title }}
            </span>
            
            <!-- 关闭按钮 -->
            <el-icon 
              class="ml-2 text-xs rounded-full p-0.5 transition-all hover:bg-gray-200"
              :class="{
                'opacity-0 group-hover:opacity-100': tabsStore.currentTab !== tab.name,
                'text-primary-500': tabsStore.currentTab === tab.name
              }"
              @click.stop="closeTab(tab.name)"
            >
              <Close />
            </el-icon>
          </div>
        </div>
      </div>
  
    </div>
  </template>

<script setup lang="ts">
import LayoutService from "../../layout/service";

const {switchTab,closeTab,tabsStore,init} = LayoutService
init();
</script>

<style scoped>
.tag-container {
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-radius: 8px;
  height: 44px;
  background: rgba(255,255,255,0.05); /* 新增容器背景 */
  backdrop-filter: blur(10px);
}

.tag-item {
  height: 36px;
  padding: 0 16px;
  margin: 4px 0;
  border-radius: 6px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.tag-active {
  background: linear-gradient(145deg, #8a5cff, #646cff); /* 调整渐变方向 */
  box-shadow: 0 4px 16px rgba(100,108,255,0.3);
  transform: translateY(-2px);
}

.tag-item span {
  font-weight: 500;
  text-shadow: 0 1px 1px rgba(0,0,0,0.12);
}

/* 修改文字颜色 */
.tag-active span {
  color: #fff !important;
  text-shadow: 0 1px 2px rgba(0,0,0,0.16);
}

.tag-item:not(.tag-active) span {

}

.animate-indicator {
  height: 3px;
  background: linear-gradient(90deg, #fff0, #fff8, #fff0);
  animation: indicatorSlide 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.tag-item:hover:not(.tag-active) {
  background: rgba(255,255,255,0.15);
}

.el-icon {
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.25s ease;
}

.tag-item:hover .el-icon {
  opacity: 1;
  transform: scale(1);
  background: rgba(255,255,255,0.15);
}

.tag-active .el-icon {
  color: #fff;
  opacity: 1;
  transform: scale(1);
  background: rgba(255,255,255,0.2);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>