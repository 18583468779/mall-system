<template>
  <nav
    class="fixed bottom-0 left-0 right-0 bg-white z-50 h-[0.7rem] border-t border-gray-200 custom-shadow"
  >
    <div class="mx-auto px-[0.2rem] h-full flex items-center justify-around">
      <a
        v-for="item in navItems"
        :key="item.path"
        @click="navigateTo(item.path)"
        class="flex flex-col items-center gap-[0.05rem]"
        :class="item.isActive ? 'active' : ''"
      >
        <div class="relative">
          <i
            class="text-[0.22rem]"
            :class="[
              item.isActive ? 'text-red-500' : 'text-gray-600',
              item.icon,
            ]"
          ></i>
          <!-- 购物车徽标 -->
          <span
            v-if="item.path === '/shopCartList' && totalCount > 0"
            class="absolute top-[-0.05rem] right-[-0.14rem] bg-red-500 text-white rounded-full text-[0.15rem] px-[0.05rem]"
          >
            {{ totalCount }}
          </span>
        </div>
        <span
          class="text-[0.2rem]"
          :class="item.isActive ? 'text-red-500 font-bold' : 'text-gray-600'"
          >{{ item.label }}</span
        >
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import ShopCart from "../piniaViews/books/service/shopCart";
const { totalCount } = ShopCart.refreshShopCartList();
// 定义导航项
const navItems = [
  {
    path: "/home",
    label: "主页",
    icon: "iconfont icon-shouye",
    isActive: false,
  },
  {
    path: "/ctgy",
    label: "分类",
    icon: "iconfont icon-fenlei",
    isActive: false,
  },
  {
    path: "/shopCartList",
    label: "购物车",
    icon: "iconfont icon-gouwuche",
    isActive: false,
  },
  {
    path: "/profile",
    label: "我的",
    icon: "iconfont icon-gerenzhongxin",
    isActive: false,
  },
];

// 获取 Vue Router 和当前路由
const router = useRouter();
const route = useRoute();

// 初始化时设置当前路由的高亮状态
const setCurrentActive = () => {
  navItems.forEach((item) => {
    item.isActive = item.path === route.path;
  });
};

setCurrentActive();

// 导航方法
const navigateTo = (path: string) => {
  // 更新所有导航项的isActive状态
  navItems.forEach((item) => {
    item.isActive = item.path === path;
  });
  router.push(path);
};
</script>

<style scoped>
.active {
  color: red;
}

/* 添加阴影样式 */
.custom-shadow {
  box-shadow: 1rem 0.05rem 1rem rgba(0, 0, 0, 0.1);
}
</style>
