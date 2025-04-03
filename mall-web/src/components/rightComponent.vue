<template>
  <div class="fixed right-4 bottom-1/4 z-40 space-y-4">
    <div
      v-show="showBackTop"
      @click="scrollToTop"
      class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <el-icon><ArrowUp /></el-icon>
    </div>
    <div
      class="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
    >
      <el-icon><ShoppingCart /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElIcon } from "element-plus";
import { ShoppingCart, ArrowUp } from "@element-plus/icons-vue";
import { ref } from "vue";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 回到顶部功能
const showBackTop = ref(false);
</script>

<style scoped></style>
