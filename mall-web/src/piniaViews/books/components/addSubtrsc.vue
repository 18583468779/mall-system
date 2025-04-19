<template>
  <div class="flex items-center justify-end">
    <!-- 添加购物车按钮 -->
    <el-button
      v-if="bookItem?.purcharsenum === 0"
      type="primary"
      class="!px-4 !py-4 !bg-red-100 hover:!bg-red-200 !text-red-600 !rounded-lg transition-colors border-none"
      @click.stop="addBkToShopCartWrapper(bookItem)"
    >
      <el-icon :size="16" class="mr-1">
        <ShoppingCart />
      </el-icon>
      添加购物车
    </el-button>

    <!-- 数量操作控件 -->
    <div v-else class="flex items-center gap-3">
      <!-- 减少数量 -->
      <el-button
        v-show="bookItem.purcharsenum > 1"
        type="primary"
        circle
        size="small"
        class="!w-6 !h-6"
        @click.stop="addOrSubtrBookToShopCart(bookItem, 'sub', $event)"
      >
        <span class="text-lg leading-none">-</span>
      </el-button>

      <!-- 删除按钮 -->
      <el-button
        v-show="bookItem.purcharsenum === 1"
        type="danger"
        circle
        size="small"
        class="!w-6 !h-6"
        @click.stop="delBookFrmSc(bookItem)"
      >
        <el-icon :size="14"><Delete /></el-icon>
      </el-button>

      <!-- 当前数量 -->
      <span class="min-w-[30px] text-center font-medium text-gray-700">
        {{ bookItem.purcharsenum }}
      </span>

      <!-- 增加数量 -->
      <el-button
        v-if="false"
        type="primary"
        circle
        size="small"
        class="!w-6 !h-6"
        @click.stop="addOrSubtrBookToShopCart(bookItem, 'add', $event)"
      >
        <span class="text-lg leading-none">+</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";
import type { BookInfo } from "../../../piniaStore/book/state";
import shopCart from "../../books/service/shopCart";

const { addBkToShopCartWrapper, addOrSubtrBookToShopCart, delBookFrmSc } =
  shopCart;

type Props = {
  bookItem: BookInfo;
};

defineProps<Props>();
</script>

<style scoped></style>
