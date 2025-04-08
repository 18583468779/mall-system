<template>
  <div class="min-h-screen bg-gray-50 pb-24 lg:pb-0">
    <!-- 头部 -->

    <!-- 主体内容 - 双栏布局 -->
    <main class="container mx-auto px-4 py-6 lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- 左侧商品区 -->
      <div class="lg:col-span-8">
        <!-- 商品列表 -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">
            商品信息（共{{ totalCount }}件）
          </h2>
          <div class="space-y-4">
            <div
              v-for="item in getShopCartListIsSelected"
              :key="item.bookisbn"
              class="flex items-start p-4 bg-gray-50 rounded-lg"
            >
              <img
                :src="getImg(item.bookpicname)"
                class="w-20 h-20 object-cover rounded-lg"
              />
              <div class="ml-4 flex-1">
                <h3 class="font-medium text-gray-900 line-clamp-2">
                  {{ item.bookname }}
                </h3>
                <div class="flex items-center justify-between mt-2">
                  <p class="text-red-500 font-bold">¥{{ item.bookprice }}</p>
                  <div class="text-gray-600 text-sm">
                    小计：<span class="font-medium"
                      >¥{{ item.bookprice * item.purcharsenum }}</span
                    >
                  </div>
                </div>
                <div class="mt-2 text-gray-500 text-sm">
                  数量：{{ item.purcharsenum }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧操作区 -->
      <div class="lg:col-span-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
        <div class="space-y-6 mt-6 lg:mt-0">
          <!-- 收货地址 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-medium text-gray-900">收货地址</h2>
              <el-button type="default" @click="goToAddressList">
                修改地址
                <el-icon :size="16" class="ml-1"><ArrowRight /></el-icon>
              </el-button>
            </div>
            <div class="flex items-start">
              <el-icon :size="24" class="text-gray-500 mr-3"
                ><Location
              /></el-icon>
              <div>
                <p class="font-medium text-gray-900">张三 138****1234</p>
                <p class="text-gray-600 mt-1">
                  北京市朝阳区望京街道阜荣街10号方恒时代中心A座1201室
                </p>
              </div>
            </div>
          </div>

          <!-- 支付方式 -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">支付方式</h2>
            <div class="space-y-3">
              <div
                v-for="method in paymentMethods"
                :key="method.id"
                @click="changePaymentMethod(method.id)"
                class="flex items-center py-4 border rounded-lg cursor-pointer transition-all"
                :class="{ 'border-blue-500': paymentMethod === method.id }"
              >
                <component :is="method.icon" class="text-2xl mr-3" />
                <div class="flex-1 flex items-center gap-2">
                  <i
                    v-if="method.id === 'wechat'"
                    class="iconfont icon-zhifu-_weixinzhifu text-[30px] text-green-500"
                  ></i>
                  <i
                    v-else
                    class="iconfont icon-alipay-active text-[30px] text-blue-500"
                  ></i>
                  <div>
                    <p class="font-medium text-gray-900">{{ method.name }}</p>
                    <p class="text-gray-500 text-sm mt-1">
                      {{ method.description }}
                    </p>
                  </div>
                </div>
                <el-icon
                  v-if="paymentMethod === method.id"
                  class="text-red-500 text-xl"
                >
                  <CircleCheck />
                </el-icon>
              </div>
            </div>
          </div>

          <!-- 订单总计 -->
          <div
            class="bg-white rounded-xl shadow-sm p-6 sticky bottom-6 lg:bottom-0"
          >
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">商品金额：</span>
                <span class="text-gray-900">¥{{ totalPrice }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">运费：</span>
                <span class="text-gray-900">¥0.00</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">优惠：</span>
                <span class="text-red-500">-¥0.00</span>
              </div>
              <el-divider />
              <div class="flex justify-between text-lg font-bold">
                <span>应付总额：</span>
                <span class="text-red-500">¥{{ totalPrice }}</span>
              </div>
              <el-button
                type="primary"
                class="w-full !rounded-lg !py-4 !text-base"
                color="rgb(239 68 68)"
                @click="submitOrder"
              >
                提交订单
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import ShopCart from "../books/service/shopCart";
import OrderService from "./service";
import { ImgUtil } from "../../utils/imgUtil";
const { getImg } = ImgUtil;
const { getShopCartListIsSelected } = ShopCart.storeRefs;
const { totalCount, totalPrice } = ShopCart.refreshShopCartList();
const {
  paymentMethod,
  changePaymentMethod,
  submitOrder,
  init,
  goToAddressList,
} = OrderService;

init();

const paymentMethods: any = [
  {
    id: "alipay",
    name: "支付宝支付",
    description: "数亿用户的选择，轻松快捷",
    icon: "icon-alipay", // 需要配置图标组件
  },
  {
    id: "wechat",
    name: "微信支付",
    description: "微信用户首选支付方式",
    icon: "icon-wechat",
  },
];
</script>

<style>
/* 自定义滚动条样式 */
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.custom-scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}
.custom-scrollbar {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded-full;
}
/* 移动端优化 */
@media (max-width: 1024px) {
  .lg\:sticky {
    position: static !important;
  }

  [class*="sticky"] {
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
    margin-bottom: env(safe-area-inset-bottom);
  }
}
</style>
