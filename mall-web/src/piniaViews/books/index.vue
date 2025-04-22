<template>
  <div class="min-h-screen bg-gray-50 pt-10">
    <!-- 主体内容 -->
    <div class="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-6">
      <!-- 左侧分类导航 -->
      <div
        class="w-full lg:w-64 xl:w-80 bg-white rounded-lg shadow-md p-4 h-fit sticky top-20"
      >
        <h3 class="text-lg font-semibold mb-4">全部分类</h3>
        <div class="space-y-2">
          <div
            v-for="third in getThirdCtgyList"
            :key="third.thirdctgyid"
            @click="handleSelectThird(third)"
            class="flex items-center justify-between p-2 rounded hover:bg-blue-50 cursor-pointer transition-colors"
            :class="{ 'bg-blue-50 text-blue-600': third.isSelected }"
          >
            <span>{{ third.thirdctgyname }}</span>
            <span class="text-gray-400 text-sm">{{ third.thirdctgyname }}</span>
          </div>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="flex-1">
        <!-- 面包屑导航 -->
        <div>
          <breadcrumbs />
        </div>

        <!-- 排序和筛选 -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <book-sort />
          <!-- 商品列表 -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="product in getAllBookList"
              :key="product.ISBN"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <bookItem :product="product" />
            </div>
          </div>

          <!-- 分页/加载更多 -->
          <div class="py-6 flex justify-center">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="totalItems"
              :page-size="pageSize"
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车 -->
    <shop-cart class="fixed bottom-4 right-4 lg:bottom-8 lg:right-8" />
  </div>
</template>

<script setup lang="ts">
import breadcrumbs from "./components/breadcrumbs.vue";
import bookSort from "./components/bookSort.vue";
import shopCart from "./components/shopCart.vue";
import bookItem from "./components/bookItem.vue";
const { handleSelectThird } = FstToThrdCtgy;
import Books from "./service";
import { ref } from "vue";
import { FstToThrdCtgy } from "../ctgy/service";
// 分页参数
const pageSize = ref(12);
const totalItems = ref(0);
const currentPage = ref(1);

// 获取数据
const { searchBooks, store } = Books;
const { getThirdCtgyList } = FstToThrdCtgy.storeRefs;
const { getAllBookList } = store;

const handlePageChange = (page: number) => {
  currentPage.value = page;
  searchBooks();
};
// 初始化加载
searchBooks();
</script>

<style>
/* 自定义分页样式 */
.el-pagination.is-background .el-pager li:not(.disabled).active {
  @apply bg-blue-500 text-white;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  @apply text-blue-500;
}
</style>
