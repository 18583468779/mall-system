<template>
  <!-- 内容区域 -->
  <main class="pt-16">
    <!-- 轮播图 -->
    <div class="container mx-auto px-4 py-6">
      <el-carousel height="400px" :interval="5000" arrow="always">
        <el-carousel-item v-for="i in imgList" :key="i" class="text-center">
          <img :src="i" class="h-full object-cover rounded-xl shadow-lg" />
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
          <product-item :product="product" />
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <el-pagination
        class="float-right"
        size="large"
        background
        layout="prev, pager, next"
        :total="totalPages"
      />
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
</template>

<script setup lang="ts">
import { ElIcon, ElCarousel, ElCarouselItem } from "element-plus";
import { Loading } from "@element-plus/icons-vue";
import productItem from "./productItem.vue";
import Books from "../../books/service";
import lun1 from "../../../assets/image/lun1.png";
import lun2 from "../../../assets/image/lun2.png";
import lun3 from "../../../assets/image/lun3.png";
const { handleToPage } = Books;
import HomeClass from "../service";
import { onMounted, onUnmounted, ref } from "vue";
const { storeRef, getBookListByPage } = HomeClass;
const { getAllBookList, isLoading, hasMore, totalPages, currentPage } =
  storeRef;
const imgList = [lun1, lun2, lun3];

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

// 生命周期
onMounted(() => {
  getBookListByPage();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.nav-item {
  @apply px-3 py-2 text-gray-600 hover:text-red-500 transition-colors 
   flex items-center text-[15px] font-medium;
}
.el-carousel__arrow {
  @apply !w-10 !h-10 bg-white/80 hover:bg-white !text-gray-600 shadow-md;
}

.el-input__wrapper {
  @apply !rounded-full;
}
</style>
