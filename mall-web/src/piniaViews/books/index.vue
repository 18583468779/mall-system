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
            搜索</el-button
          >
        </div>
      </div>
    </header>
    <div class="bg-white container">
      <CategoryDropdown class="shadow-sm" />
      <!-- 空状态展示 -->
      <div
        v-if="store.getAllBookList?.length === 0"
        class="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in"
      >
        <div class="relative max-w-md text-center space-y-6">
          <!-- 动态图标容器 -->
          <div class="flex justify-center mb-8">
            <div class="relative w-32 h-32">
              <!-- 背景渐变圆 -->
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-lg opacity-75 animate-pulse-slow"
              ></div>

              <!-- 主图标 -->
              <div
                class="relative flex items-center justify-center w-32 h-32 bg-white rounded-3xl shadow-2xl border-8 border-white/10"
              >
                <svg
                  class="w-16 h-16 text-blue-500 animate-float"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- 文字内容 -->
          <h2 class="text-3xl font-bold text-gray-800">
            {{ searchKeyword ? "没有找到相关项目" : "空空如也" }}
          </h2>
          <p class="text-lg text-gray-500 leading-relaxed">
            {{
              searchKeyword
                ? `没有找到与“${searchKeyword}”相关的项目，换个关键词试试吧~`
                : "当前还没有添加项目，敬请期待..."
            }}
          </p>

          <!-- 当有搜索关键词时显示重置按钮 -->
          <div v-if="searchKeyword" class="mt-6">
            <el-button
              type="primary"
              size="large"
              class="rounded-xl px-8 shadow-md hover:shadow-lg transition-all"
              @click="resetSearch"
            >
              <template #icon>
                <el-icon><Refresh /></el-icon>
              </template>
              重置搜索
            </el-button>
          </div>
        </div>
      </div>
      <!-- 主体内容 -->
      <div
        v-else
        class="container mx-auto px-4 flex flex-col lg:flex-row gap-6"
      >
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
            <div
              v-if="store.getAllBookList?.length > 0"
              class="py-6 flex justify-center"
            >
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
const resetSearch = () => {
  searchKeyword.value = "";
  getBookListByPage(); // 重新获取原始数据
};
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
/* 添加自定义动画 */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>
