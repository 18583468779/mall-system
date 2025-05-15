<template>
  <div class="cursor-pointer" @click="handleToPage(product)">
    <!-- 商品图片 -->
    <div class="aspect-square relative">
      <img :src="product.images?.[0]?.url" class="w-full h-full object-cover" />
      <!-- 折扣标签 -->
      <div
        v-if="product.discount"
        class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
      >
        {{ product.discount }}折
      </div>
    </div>

    <!-- 商品信息 -->
    <div class="p-4">
      <h3 class="font-medium truncate mb-2 text-gray-800">
        {{ product.bookname }}
      </h3>
      <div class="text-sm text-gray-500 truncate mb-2">
        <!-- {{ product.author }} -->
      </div>

      <!-- 价格和操作 -->
      <div class="flex items-center w-full">
        <div class="space-y-1">
          <div class="text-red-500 font-bold text-lg">
            ¥{{ productPrice }}
            <span class="text-gray-400 text-sm line-through ml-2"
              >¥{{ product.originalprice }}</span
            >
          </div>
          <div class="text-sm text-gray-500">
            月售 {{ product.monthsalecount ?? "0" }}
          </div>
        </div>
        <add-subtrsc :book-item="product" class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import addSubtrsc from "../components/addSubtrsc.vue";
import { BookInfo } from "../../../piniaStore/book/state";
import Books from "../service";
import { computed } from "vue";
const { handleToPage } = Books;
type Props = {
  product: BookInfo;
};
const { product } = defineProps<Props>();
const productPrice = computed(() => {
  if (product.discount) {
    return (product.originalprice * product.discount) / 10;
  } else {
    return product.originalprice;
  }
});
</script>

<style scoped></style>
