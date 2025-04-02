<template>
  <nav
    class="flex items-center py-4 px-4 sm:px-6 lg:px-8 text-sm text-gray-600"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-2">
      <!-- 首页链接 -->
      <li class="inline-flex items-center">
        <router-link
          to="/"
          class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          <el-icon class="mr-1"><House /></el-icon>
          首页
        </router-link>
      </li>

      <!-- 分隔符 -->
      <li>
        <el-icon class="text-gray-400"><ArrowRight /></el-icon>
      </li>

      <!-- 一级分类 -->
      <li>
        <div class="flex items-center">
          <span class="ml-1 font-medium text-gray-500 md:ml-2">
            {{ getFirstCtgy.firstctgyname }}
          </span>
        </div>
      </li>

      <!-- 分隔符 -->
      <li>
        <el-icon class="text-gray-400"><ArrowRight /></el-icon>
      </li>

      <!-- 当前分类 -->
      <li aria-current="page">
        <div class="flex items-center">
          <span class="ml-1 font-medium text-gray-400 md:ml-2">
            {{ getSecondCtgy.secctgyname }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ArrowRight, House } from "@element-plus/icons-vue";
import { FstToThrdCtgy } from "../../../piniaViews/ctgy/service";

const { getFirstCtgy, getSecondCtgy } = FstToThrdCtgy.storeRefs;
</script>

<style scoped>
/* 自定义分隔符样式 */
.el-icon[aria-hidden="true"] {
  @apply w-4 h-4;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .el-icon[aria-hidden="true"] {
    @apply w-3 h-3;
  }

  nav {
    @apply text-xs;
  }
}
</style>
