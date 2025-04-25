<template>
  <!-- 右侧悬浮购物车（紧凑版） -->
  <div class="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
    <div
      class="flex flex-col bg-white shadow-md rounded-l-lg transition-all duration-300 hover:shadow-lg border"
      :class="{ 'w-48': expanded, 'w-12': !expanded }"
    >
      <!-- 折叠状态 -->
      <div
        class="p-2 bg-gray-50 rounded-tl-lg cursor-pointer flex items-center justify-center"
        @click="expanded = !expanded"
      >
        <el-badge 
          :value="totalCount" 
          :hidden="totalCount === 0" 
          :max="99"
          class="!absolute !-right-1 !-top-1"
        >
          <el-icon :size="20" class="text-gray-600">
            <ShoppingCart />
          </el-icon>
        </el-badge>
      </div>

      <!-- 展开状态 -->
      <transition name="slide-fade">
        <div v-if="expanded" class="flex flex-col flex-1">
          <!-- 商品列表 -->
          <div class="overflow-y-auto flex-1 p-2 max-h-[60vh]">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-center py-2 border-b last:border-0"
            >
              <img 
                :src="item.image" 
                class="w-12 h-12 object-cover rounded border"
              />
              <div class="ml-2 flex-1 min-w-0">
                <h4 class="text-xs line-clamp-2 leading-tight">{{ item.name }}</h4>
                <div class="flex items-center justify-between mt-1">
                  <span class="text-red-500 text-sm font-bold">¥{{ item.price }}</span>
                  <el-input-number
                    :model-value="item.quantity"
                    :min="1"
                    size="small"
                    controls-position="right"
                    class="w-20"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- 底部结算 -->
          <div class="border-t p-2 bg-gray-50">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-500 text-sm">总价：</span>
              <span class="text-base font-bold text-red-500">¥{{ totalPrice }}</span>
            </div>
            <el-button
              type="danger"
              size="small"
              class="w-full !px-2 !py-1.5 !text-sm"
              @click="handleToPage('shopCartList')"
            >
              结算 ({{ totalCount }})
            </el-button>
          </div>
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

const expanded = ref(false); // 默认折叠状态
const cartItems = ref<any>([]); // 接入实际数据时替换

const handleToPage = (name: string) => {
  router.push({ name });
};
</script>

<style scoped>
/* 精简动画 */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 1, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

/* 迷你小球动画 */
.ball-container {
  .ball {
    @apply w-3 h-3 fixed left-8 bottom-16;
    transition: transform 0.35s cubic-bezier(0.42, -0.3, 0.78, 0.45);
    .inner {
      @apply w-full h-full rounded-full bg-blue-400;
      transition: transform 0.35s linear;
    }
  }
}

/* 优化滚动条 */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}
</style>
