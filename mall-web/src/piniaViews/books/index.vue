<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-20 to-purple-50 pt-10">
    <header class="mb-12 text-center space-y-4">
      <h1 class="text-5xl font-bold bg-gradient-to-r text-black bg-clip-text">
        项目源码下载
      </h1>
      <p class="text-lg text-gray-600">
        项目源码下载，研究项目源码，学习项目源码
      </p>
      <div class="rounded-lg shadow-sm p-4 mb-4">
        <div class="max-w-3xl mx-auto mb-12 flex gap-3">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索项目名称..."
            size="large"
            clearable
            class="rounded-2xl shadow-lg"
          >
            <template #prefix>
              <el-icon class="text-xl"><search /></el-icon>
            </template>
          </el-input>
          <el-button
            type="primary"
            size="large"
            class="w-28"
            color="#1D4ED8"
            @click="findBooksByAutoName(searchKeyword)"
          >
            >搜索</el-button
          >
        </div>
      </div>
    </header>
    <div class="bg-white container">
      <CategoryDropdown class="shadow-sm" />
      <!-- 主体内容 -->
      <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-6">
        <div class="flex-1">
          <!-- 排序和筛选 -->
          <div class="rounded-lg p-4 mb-6">
            <!-- 商品列表 -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="product in store.getAllBookList"
                :key="product.ISBN"
                class="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import bookItem from "./components/bookItem.vue";
import CategoryDropdown from "../../piniaViews/ctgy/components/Ctgy.vue";
import Books from "./service";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const route = useRoute();
const searchKeyword = ref("");
// 分页参数
const pageSize = ref(12);
const totalItems = ref(0);

onMounted(() => {
  getBookListByPage(); // 初始加载第一页数据
});

// 获取数据
const { searchBooks, store, findBooksByAutoName, getBookListByPage } = Books;

watchEffect(() => {
  if (JSON.stringify(route.query) !== "{}") {
    let query = JSON.parse(decodeURIComponent(route.query.data as any));
    delete query["isSelected"];
    searchBooks(query.thirdctgyid);
  }
});

const handlePageChange = (page: number) => {
  console.log(page);
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
