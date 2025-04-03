<template>
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
</template>

<script setup lang="ts">
import {
  ElIcon,
  ElInput,
  ElButton,
  ElCarousel,
  ElCarouselItem,
} from "element-plus";
import { ImgUtil } from "../../../utils/imgUtil";
import { Search, Loading } from "@element-plus/icons-vue";
import Books from "../../books/service";
const { handleToPage } = Books;
import HomeClass from "../service";
import { ref } from "vue";
const { storeRef } = HomeClass;
const { getAllBookList, isLoading, hasMore } = storeRef;

const searchQuery = ref("");
// 购物车功能
const cartCount = ref(0);
const addToCart = (product: any) => {
  cartCount.value++;
  console.log("Added to cart:", product);
};
</script>

<style scoped></style>
