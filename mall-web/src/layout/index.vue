<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <headerComponent />
    <!-- 右侧固定导航 -->
    <rightComponent />
    <!-- 内容 -->
    <div class="pt-16">
      <router-view />
    </div>
    <!-- 底部导航 -->
    <footer-nav />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import rightComponent from "../components/rightComponent.vue";
import FooterNav from "../components/footer.vue";
import HomeClass from "../piniaViews/home/service";
import headerComponent from "../components/headerComponent.vue";
const { getBookListByPage, storeRef } = HomeClass;
const { currentPage, isLoading, hasMore } = storeRef;

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

<style>
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
