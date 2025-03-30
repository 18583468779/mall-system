<!-- FooterNav.vue -->
<template>
  <footer
    class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg lg:hidden"
  >
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-4 py-3">
        <div
          v-for="item in navItems"
          :key="item.name"
          class="text-center cursor-pointer hover:text-red-500 transition-colors"
          @click="handleNav(item.name)"
        >
          <el-icon class="block mb-1 text-xl">
            <component :is="item.icon" />
          </el-icon>
          <span class="text-xs">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { HomeFilled, List, ShoppingCart, User } from "@element-plus/icons-vue";

const navItems = ref([
  { name: "首页", icon: HomeFilled },
  { name: "分类", icon: List },
  { name: "购物车", icon: ShoppingCart },
  { name: "我的", icon: User },
]);

const handleNav = (name: string) => {
  console.log("Navigate to:", name);
  // 添加实际导航逻辑
};
</script>
