<template>
  <!-- 右侧悬浮购物车 -->
  <div class="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
    <div
      class="flex flex-col bg-white shadow-xl rounded-l-lg transition-all duration-300 hover:shadow-2xl"
      :class="{ 'w-80': expanded, 'w-20': !expanded }"
    >
      <!-- 购物车头部 -->
      <div
        class="p-4 bg-gray-100 rounded-tl-lg cursor-pointer flex items-center"
        @click="expanded = !expanded"
      >
        <el-badge :value="totalCount" :hidden="totalCount === 0" class="mr-2">
          <el-icon :size="28" class="text-gray-700">
            <ShoppingCart />
          </el-icon>
        </el-badge>
        <transition name="fade">
          <span v-if="expanded" class="ml-2 font-medium">购物车</span>
        </transition>
      </div>

      <!-- 购物车内容区域 -->
      <transition name="slide-fade">
        <div v-if="expanded" class="flex-1 overflow-y-auto p-4">
          <!-- 商品列表（需要补充实际商品数据） -->
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center py-3 border-b last:border-0"
          >
            <img :src="item.image" class="w-16 h-16 object-cover rounded" />
            <div class="ml-3 flex-1">
              <h4 class="text-sm line-clamp-2">{{ item.name }}</h4>
              <div class="flex items-center justify-between mt-1">
                <span class="text-red-500 font-bold">¥{{ item.price }}</span>
                <el-input-number
                  :model-value="item.quantity"
                  :min="1"
                  size="small"
                  controls-position="right"
                  class="w-24"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 底部结账区域 -->
      <transition name="fade">
        <div v-if="expanded" class="border-t p-4 bg-white">
          <div class="flex justify-between items-center mb-4">
            <span class="text-gray-600">总价：</span>
            <span class="text-xl font-bold text-red-500"
              >¥{{ totalPrice }}</span
            >
          </div>
          <el-button
            type="danger"
            class="w-full"
            @click="handleToPage('shopCartList')"
          >
            去结算（{{ totalCount }}）
          </el-button>
        </div>
      </transition>

      <!-- 小球动画 -->
      <div class="ball-container">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ball" v-show="ball.showOrHidden">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ShoppingCart } from "@element-plus/icons-vue";
import router from "../../../router";
import ShopCart from "../service/shopCart";

const { totalCount, totalPrice } = ShopCart.refreshShopCartList();
const { beforeDrop, afterDrop, dropping, ball } = ShopCart;

const expanded = ref(true); // 默认展开状态
const cartItems = ref<any>([]); // 需要接入实际购物车数据

const handleToPage = (name: string) => {
  router.push({ name });
};
</script>

<style scoped>
/* 动画样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* 小球动画 */
.ball-container {
  .ball {
    @apply w-4 h-4 fixed left-12 bottom-20;
    transition: transform 0.4s cubic-bezier(0.46, -0.35, 0.78, 0.45);
    .inner {
      @apply w-full h-full rounded-full bg-blue-500;
      transition: transform 0.4s linear;
    }
  }
}
</style>
