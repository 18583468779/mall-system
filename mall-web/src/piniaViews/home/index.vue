<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <header
      class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16 backdrop-blur-md"
    >
      <div
        class="container mx-auto px-4 h-full flex items-center justify-between"
      >
        <el-icon class="lg:hidden">
          <Menu />
        </el-icon>

        <h1 class="text-xl font-bold text-red-500 mx-4">E-Shop</h1>

        <nav class="hidden lg:flex space-x-8 flex-1 justify-center">
          <a
            v-for="nav in ['首页', '新品', '热卖', '分类']"
            :key="nav"
            class="text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
          >
            {{ nav }}
          </a>
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

    <!-- 右侧固定导航 -->
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

    <!-- 内容区域 -->
    <main class="pt-16">
      <!-- 搜索栏 -->
      <div class="container mx-auto px-4 py-6">
        <el-input
          v-model="searchQuery"
          placeholder="搜索商品..."
          class="rounded-full shadow-sm"
          size="large"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- 轮播图 -->
      <div class="container mx-auto px-4 py-6">
        <el-carousel height="400px" :interval="5000" arrow="always">
          <el-carousel-item v-for="i in 3" :key="i">
            <img
              src="https://via.placeholder.com/1200x400"
              class="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 商品列表 -->
      <div class="container mx-auto px-4 py-8">
        <h2 class="text-2xl font-bold mb-6">热销推荐</h2>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <div
            v-for="product in getAllBookList"
            :key="product.id"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            @click="handleToPage(product)"
          >
            <div class="aspect-square relative">
              <img
                :src="ImgUtil.getImg(product.bookpicname)"
                class="w-full h-full object-cover"
              />
              <div
                v-if="product.discount"
                class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
              >
                {{ product.discount }}折
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-medium truncate mb-2">{{ product.BOOKNAME }}</h3>
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-red-500 font-bold text-lg"
                    >¥{{ product.monthsalecount }}</span
                  >
                  <span class="text-gray-400 text-sm line-through ml-2"
                    >¥{{ product.originalprice }}</span
                  >
                </div>
                <el-button
                  type="danger"
                  size="small"
                  class="!rounded-full !px-4"
                  @click.stop="addToCart(product)"
                >
                  加入购物车
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="py-8 text-center text-gray-500">
        <el-icon class="animate-spin"><Loading /></el-icon>
        <span class="ml-2">正在加载...</span>
      </div>
      <div v-if="!hasMore" class="py-8 text-center text-gray-500">
        没有更多商品了~
      </div>
    </main>

    <!-- 底部导航 -->
    <footer-nav />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  ElIcon,
  ElInput,
  ElButton,
  ElCarousel,
  ElCarouselItem,
} from "element-plus";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  ArrowUp,
  Loading,
} from "@element-plus/icons-vue";
import FooterNav from "./FooterNav.vue";
import HomeClass from "./service";
import { ImgUtil } from "../../utils/imgUtil";
import Books from "../books/service";

const { getBookListByPage, storeRef } = HomeClass;
const { handleToPage } = Books;
const { currentPage, getAllBookList, isLoading, hasMore } = storeRef;

// 原始滚动加载逻辑
const debounce = (fn: Function, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const checkScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (
    scrollHeight - (scrollTop + clientHeight) < 100 &&
    !isLoading.value &&
    hasMore.value
  ) {
    loadMore();
  }
};

const debouncedCheckScroll = debounce(checkScroll, 200);

const loadMore = () => {
  const nextPage = currentPage.value + 1;
  getBookListByPage(nextPage);
};

// 回到顶部功能
const showBackTop = ref(false);

const handleScroll = () => {
  showBackTop.value = window.scrollY > 300;
  debouncedCheckScroll();
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 购物车功能
const cartCount = ref(0);
const searchQuery = ref("");

const addToCart = (product: any) => {
  cartCount.value++;
  console.log("Added to cart:", product);
};

// 生命周期
onMounted(() => {
  getBookListByPage();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.el-carousel__arrow {
  @apply !w-10 !h-10 bg-white/80 hover:bg-white !text-gray-600 shadow-md;
}

.el-input__wrapper {
  @apply !rounded-full;
}
</style>
