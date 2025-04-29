<template>
  <div class="min-h-screen bg-gray-50 pt-10">
    <div class="container">
      <CategoryDropdown />
    </div>
    <!-- 主体内容 -->
    <div class="container mx-auto px-4 py-16 flex flex-col lg:flex-row gap-6">
      <div class="flex-1">
        <!-- 排序和筛选 -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <book-sort />
          <!-- 商品列表 -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="product in store.getAllBookList" :key="product.ISBN"
              class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <bookItem :product="product" />
            </div>
          </div>
          <!-- 分页/加载更多 -->
          <div class="py-6 flex justify-center">
            <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
              @current-change="handlePageChange" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import bookSort from "./components/bookSort.vue";
import bookItem from "./components/bookItem.vue";
import CategoryDropdown from "../../piniaViews/ctgy/components/Ctgy.vue";
import Books from "./service";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
// 分页参数
const pageSize = ref(12);
const totalItems = ref(0);

// 获取数据
const { searchBooks, store } = Books;


watchEffect(() => {
  if (JSON.stringify(route.query) !== '{}') {
    let query = JSON.parse(decodeURIComponent(route.query.data as any));
    delete query['isSelected'];
    searchBooks(query.thirdctgyid);
  }
})

const handlePageChange = (page: number) => {
  console.log(page)
  // currentPage.value = page;
  // searchBooks();
};


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
