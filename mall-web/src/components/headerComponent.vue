<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16 backdrop-blur-md"
  >
    <div
      class="container mx-auto px-4 h-full flex items-center justify-between"
    >
      <el-icon class="lg:hidden">
        <Menu />
      </el-icon>

      <h1 class="text-xl font-bold text-red-500 mx-4">代码小库</h1>

      <nav class="hidden lg:flex space-x-8 flex-1 justify-center">
        <template v-for="navItem in navItems" :key="navItem.name">
          <!-- 普通导航项 -->
          <router-link
            v-if="navItem.type === 'link'"
            :to="navItem.path!"
            class="nav-item"
          >
            {{ navItem.name }}
          </router-link>

          <!-- 分类下拉项 -->
          <div v-else>
            <CategoryDropdown />
          </div>
        </template>
      </nav>

      <div class="flex items-center space-x-6">
        <el-icon class="text-2xl"><Search /></el-icon>
        <div class="relative cursor-pointer">
          <el-icon class="text-2xl"><ShoppingCart /></el-icon>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </div>
        <el-icon class="hidden lg:inline-block text-2xl"><User /></el-icon>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, Search, ShoppingCart, User } from "@element-plus/icons-vue";
import CategoryDropdown from "../piniaViews/ctgy/components/Ctgy.vue";
import { ref } from "vue";
// 导航项数据结构
const navItems = [
  {
    name: "首页",
    type: "link",
    path: "/",
  },
  {
    name: "分类",
    type: "dropdown",
  },
  {
    name: "新品",
    type: "link",
    path: "/new",
  },
  {
    name: "热卖",
    type: "link",
    path: "/hot",
  },
];
// 购物车功能
const cartCount = ref(0);
</script>

<style scoped></style>
