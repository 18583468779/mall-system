<template>
  <div class="min-h-full bg-white">
    <!-- 返回按钮 -->
    <div class="z-10 px-[0.2rem] pt-[0.2rem] text-[0.3rem]">
      <el-icon @click="goBack"><ArrowLeftBold /></el-icon>
    </div>
    <!-- 地址选择 -->
    <div class="px-[0.32rem] py-[0.24rem] bg-white">
      <div class="flex items-center justify-between">
        <div class="text-[0.16rem] font-medium text-gray-800">收货地址</div>
        <div
          class="flex items-center text-[0.14rem] text-blue-600"
          @click="goToAddressList"
        >
          <span>修改地址</span>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <div
        class="flex items-center p-[0.16rem] mt-[0.1rem] bg-white rounded-[0.08rem] shadow-sm"
      >
        <div class="mr-[0.1rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[0.24rem] w-[0.24rem]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div class="flex-1 overflow-hidden">
          <div class="text-[0.14rem] text-gray-800">张三 138****1234</div>
          <div class="text-[0.13rem] text-gray-600 line-clamp-1">
            北京市朝阳区望京街道阜荣街10号方恒时代中心A座1201室
          </div>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="px-[0.32rem] py-[0.24rem] bg-white mt-[0.16rem]">
      <div class="text-[0.16rem] font-medium text-gray-800 mb-[0.16rem]">
        商品信息（共{{ totalCount }}件）
      </div>

      <div class="relative group">
        <div
          ref="swiperContainer"
          class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth custom-scrollbar"
          @scroll.passive="handleScroll"
        >
          <div
            v-for="item in getShopCartListIsSelected"
            :key="item.bookisbn"
            class="flex-shrink-0 w-[2.6rem] mx-[0.08rem] snap-start"
          >
            <div class="bg-white rounded-[0.08rem] shadow-sm overflow-hidden">
              <div class="relative h-[1.8rem]">
                <img
                  :src="getImg(item.bookpicname)"
                  alt="书籍封面"
                  class="w-full h-full object-contain"
                />
                <div
                  class="absolute bottom-1 right-1 px-[0.08rem] py-[0.04rem] bg-black/50 text-white text-[0.12rem] rounded-[0.04rem]"
                >
                  x{{ item.purcharsenum }}
                </div>
              </div>
              <div class="p-[0.1rem]">
                <div
                  class="text-[0.14rem] font-medium text-gray-800 line-clamp-2 mb-[0.05rem]"
                >
                  {{ item.bookname }}
                </div>
                <div class="flex items-center justify-between">
                  <div class="text-[0.13rem] text-red-500">
                    ¥{{ item.bookprice }}
                  </div>
                  <div class="text-[0.13rem] text-gray-600">
                    小计：¥{{ item.bookprice * item.purcharsenum }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 导航箭头 -->
        <button
          v-show="showPrevButton"
          @click="scrollTo('prev')"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-[0.32rem] h-[0.32rem] rounded-full flex items-center justify-center backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100"
        >
          <el-icon><ArrowLeftBold /></el-icon>
        </button>
        <button
          v-show="showNextButton"
          @click="scrollTo('next')"
          class="absolute right-0 top-1/2 -translate-y-1/2 w-[0.32rem] h-[0.32rem] b shadow-md rounded-full flex items-center justify-center backdrop-blur-sm transition-opacity opacity-0 group-hover:opacity-100"
        >
          <el-icon><ArrowRightBold /></el-icon>
        </button>

        <!-- 分页指示器 -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center space-x-[0.06rem] mt-[0.16rem]"
        >
          <div
            v-for="page in totalPages"
            :key="page"
            class="w-[0.12rem] h-[0.12rem] rounded-full transition-colors"
            :class="currentPage === page ? 'bg-gray-800' : 'bg-gray-300'"
          ></div>
        </div>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="px-[0.32rem] py-[0.24rem] bg-white mt-[0.16rem]">
      <div class="text-[0.16rem] font-medium text-gray-800 mb-[0.16rem]">
        支付方式
      </div>
      <div class="space-y-[0.1rem]">
        <div
          class="flex items-center p-[0.14rem] bg-white rounded-[0.08rem] cursor-pointer"
          @click="changePaymentMethod('alipay')"
        >
          <i class="iconfont icon-alipay-active mr-[0.05rem] text-blue"></i>
          <div class="text-[0.14rem] text-gray-800 flex-1">支付宝支付</div>
          <div
            class="w-[0.18rem] h-[0.18rem] rounded-full border-2 border-gray-300"
          >
            <i
              v-if="paymentMethod === 'alipay'"
              class="iconfont icon-xuanzhong text-green-500 text-[0.14rem]"
            ></i>
          </div>
        </div>
        <div
          class="flex items-center p-[0.14rem] bg-white rounded-[0.08rem] cursor-pointer"
          @click="changePaymentMethod('wechat')"
        >
          <i
            class="iconfont icon-zhifu-_weixinzhifu text-green mr-[0.05rem]"
          ></i>

          <div class="text-[0.14rem] text-gray-800 flex-1">微信支付</div>
          <div
            class="w-[0.18rem] h-[0.18rem] rounded-full border-2 border-gray-300"
          >
            <i
              v-if="paymentMethod === 'wechat'"
              class="iconfont icon-xuanzhong text-green-500 text-[0.14rem]"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <div
      class="fixed bottom-0 left-0 right-0 p-[0.16rem] bg-white rounded-t-[0.2rem] shadow-[0_-0.1rem_0.3rem_rgba(0,0,0,0.1)] flex items-center justify-between"
    >
      <div class="space-y-[0.08rem]">
        <div class="text-[0.14rem] text-gray-600">实付金额</div>
        <div class="text-[0.24rem] font-bold text-red-500">
          ¥{{ totalPrice }}
        </div>
      </div>
      <button
        class="px-[0.4rem] py-[0.16rem] border-none bg-gradient-to-r from-red-500 to-red-600 text-white rounded-[0.4rem] text-[0.16rem] font-medium shadow-[0_0.05rem_0.15rem_rgba(255,69,58,0.3)]"
        @click="submitOrder"
      >
        提交订单
      </button>
    </div>
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
  goBack,
  paymentMethod,
  changePaymentMethod,
  submitOrder,
  swiperContainer,
  currentPage,
  showPrevButton,
  showNextButton,
  init,
  goToAddressList,
  handleScroll,
  scrollTo,
  totalPages,
} = OrderService;

init();
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
</style>
