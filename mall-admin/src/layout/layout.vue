<template>
  <div class="h-screen flex">
    <!-- 左侧菜单 -->
    <menu-component />
    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col">
      <!-- 顶部导航 -->
      <header-component />
      <!-- 标签页 -->
      <tabs-component />
      <!-- 内容区域 -->
      <main class="flex-1 bg-gray-50 p-6">
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MenuComponent from "../components/menu/menuComponent.vue";
import HeaderComponent from "../components/header/headerComponent.vue";
import TabsComponent from "../components/tabs/tabsComponent.vue";
</script>

<style scoped>
.fade-enter-active {
  animation: slideIn 0.2s ease-out forwards;
}

.fade-leave-active {
  animation: slideOut 0.2s ease-in forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(0);
    opacity: 0;
  }
}

/* 添加容器溢出隐藏 */
main {
  overflow: auto;
}

/* 添加菜单项阴影效果 */
:deep(.el-menu-item:hover),
:deep(.el-menu-item.is-active) {
  transition: all 0.1s ease;
  box-shadow: inset 4px 0 0 #4a4aff;
  background: #646cff20;
}

/* 修改图标颜色 */
:deep(.el-icon) {
  color: #000;
  transition: color 0.3s;
}

:deep(.el-menu-item:hover .el-icon),
:deep(.el-menu-item.is-active .el-icon) {
  color: #4a4aff;
  /* 金色图标高亮 */
}
</style>
