<template>
  <div
    class="group"
    @mouseenter="showCategory = true"
    @mouseleave="showCategory = false"
  >
    <!-- 导航项 -->
    <div class="nav-item">
      分类
      <el-icon
        :class="['transition-transform', { 'rotate-180': showCategory }]"
      >
        <ArrowDown />
      </el-icon>
    </div>

    <!-- 分类下拉层 -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="showCategory"
        class="absolute top-full left-0 w-screen bg-white shadow-2xl z-50 pt-6 pb-8"
        :style="{ maxHeight: 'calc(100vh - 120px)' }"
      >
        <div class="container mx-auto px-4 grid grid-cols-4 gap-8">
          <!-- 一级分类 -->
          <div class="col-span-1 border-r border-gray-100 pr-6">
            <div
              v-for="(item, index) in firstCtgyList"
              :key="item.firstctgyId"
              @mouseenter="handleFirstCtgyHover(index)"
              class="p-3 rounded-lg cursor-pointer transition-colors"
              :class="{
                'bg-blue-50 text-blue-600': activeFirstIndex === index,
                'hover:bg-gray-50': activeFirstIndex !== index,
              }"
            >
              {{ item.firstctgyname }}
            </div>
          </div>

          <!-- 二三级分类 -->
          <div class="col-span-3 grid grid-cols-3 gap-6">
            <div
              v-for="second in secondCtgyList"
              :key="second.secondctgyid"
              class="space-y-4"
            >
              <div class="flex justify-between items-center group">
                <h3 class="font-semibold text-lg">{{ second.secctgyname }}</h3>
                <span
                  class="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <el-icon><ArrowRight /></el-icon>
                </span>
              </div>

              <ul class="space-y-2">
                <li
                  v-for="third in second.thirdctgys"
                  :key="third.thirdctgyid"
                  class="text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
                >
                  {{ third.thirdctgyname }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowDown, ArrowRight } from "@element-plus/icons-vue";
import { FstToThrdCtgy } from "../service/index";

const showCategory = ref(false);
const activeFirstIndex = ref(0);

const { storeRefs, getFirstCtgys, getSecondCtgys, changeTab } = FstToThrdCtgy;

const { firstCtgyList, secondCtgyList } = storeRefs;

// 初始化获取数据
getFirstCtgys();
getSecondCtgys();

const handleFirstCtgyHover = (index: number) => {
  activeFirstIndex.value = index;
  changeTab(index);
};
</script>

<style scoped>
.nav-item {
  @apply flex items-center gap-1 px-4 h-full cursor-pointer transition-colors
     hover:text-blue-500;
}

/* 自定义滚动条 */
.scroll-area {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.scroll-area::-webkit-scrollbar {
  @apply w-2;
}

.scroll-area::-webkit-scrollbar-track {
  @apply bg-gray-50 rounded-full;
}

.scroll-area::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full hover:bg-gray-400;
}
</style>
