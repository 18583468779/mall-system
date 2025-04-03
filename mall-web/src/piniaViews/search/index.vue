<template>
  <div class="min-h-screen p-4 md:p-6 bg-[#a2afb999] absolute top-0 w-full">
    <!-- 主容器 -->
    <div class="max-w-2xl mx-auto bg-[#f9f9f9] p-8 rounded-lg mt-10">
      <!-- 头部 -->
      <div class="flex items-center gap-3 mb-6">
        <el-icon
          class="text-gray-600 hover:text-black cursor-pointer transition-colors"
          @click=""
        >
          <ArrowLeftBold />
        </el-icon>
        <h1 class="text-2xl font-bold text-gray-900 flex-1 text-center">
          搜索框
        </h1>
      </div>

      <!-- 搜索框区域 -->
      <div class="relative">
        <!-- 搜索框输入 -->
        <div class="flex gap-2">
          <el-input
            v-model="keyword"
            placeholder="请输入关键词"
            clearable
            class="flex-1"
            @keyup="SearchClass.searchKeywords"
            @focus="SearchClass.resetKeyword"
            @blur="SearchClass.closeKeywords"
          >
            <template #prefix>
              <el-icon class="text-gray-400">
                <Search />
              </el-icon>
            </template>
          </el-input>
          <el-button
            type="primary"
            class="!rounded-lg !px-6"
            @click="SearchClass.searchBookByKey(keyword)"
          >
            搜索框
          </el-button>
        </div>

        <!-- 遮罩层和自动补全 -->
        <transition name="fade">
          <div
            v-show="SearchClass.isOpenAutoComplete"
            class="fixed z-10"
            @click="SearchClass.showOrCloseAutoComplete(false)"
          >
            <div
              class="absolute top-[120px] left-0 right-0 mx-auto max-w-2xl rounded-xl shadow-xl overflow-hidden z-20"
              @click.stop
            >
              <div
                v-for="item in keywordList"
                :key="item.id"
                class="px-6 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-0 transition-colors"
                @mousedown="SearchClass.searchBookByKey(item.keyword)"
              >
                {{ item.keyword }}
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- 搜索框历史 -->
      <div class="mt-8 bg-white rounded-xl p-4 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">搜索历史</h3>
          <el-button
            type="danger"
            text
            @click="SearchClass.deleteHistoryKeywords"
          >
            <el-icon class="mr-1"><Delete /></el-icon>
            清空历史
          </el-button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div
            v-for="(item, index) in getHistoryKeywordList"
            :key="index"
            class="px-4 py-2 bg-gray-100 rounded-full text-sm truncate hover:bg-gray-200 cursor-pointer transition-colors"
            @click="SearchClass.searchBookByKey(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <!-- 搜索框发现 -->
      <div class="mt-6 bg-white rounded-xl p-4 shadow-sm">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">搜索发现</h3>
          <el-button type="info" text class="cursor-not-allowed">
            <el-icon class="mr-1"><Refresh /></el-icon>
            换一换
          </el-button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div
            v-for="(item, index) in geHistoryKeywordObjList"
            :key="index"
            class="px-4 py-2 bg-gray-100 rounded-full text-sm truncate hover:bg-gray-200 cursor-pointer transition-colors"
            @click="SearchClass.searchBookByKey(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLeftBold,
  Delete,
  Refresh,
  Search,
} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import SearchClass from "./service";

const { keywordList, getHistoryKeywordList, geHistoryKeywordObjList } =
  SearchClass.storeRefs;

const keyword = SearchClass.storeRefs.keyword;

onMounted(() => {
  SearchClass.init();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

:deep(.el-input__wrapper) {
  @apply !rounded-lg !h-12 !shadow-sm hover:!shadow-md transition-all;
}

:deep(.el-input__inner) {
  @apply !text-base;
}

:deep(.el-button) {
  @apply !h-12 !text-base;
}

.item {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 毛玻璃效果 */
.backdrop-filter {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* 兼容旧版浏览器 */
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
