<template>
  <div class="min-h-full bg-gray-50">
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
        商品信息
      </div>
      <div class="flex overflow-x-auto custom-scrollbar">
        <div class="min-w-[1.8rem] mx-[0.08rem]">
          <div class="bg-white rounded-[0.08rem] shadow-sm">
            <img
              src="https://picsum.photos/200/300"
              alt="书籍封面"
              class="w-full h-[1.8rem] object-cover"
            />
            <div class="p-[0.1rem]">
              <div
                class="text-[0.14rem] font-medium text-gray-800 line-clamp-2 mb-[0.05rem]"
              >
                JavaScript高级程序设计（第4版）
              </div>
              <div class="flex items-center justify-between">
                <div class="text-[0.13rem] text-gray-600">¥79.00</div>
                <div class="text-[0.13rem] text-gray-600">x1</div>
              </div>
            </div>
          </div>
        </div>
        <div class="min-w-[1.8rem] mx-[0.08rem]">
          <div class="bg-white rounded-[0.08rem] shadow-sm">
            <img
              src="https://picsum.photos/200/301"
              alt="书籍封面"
              class="w-full h-[1.8rem] object-cover"
            />
            <div class="p-[0.1rem]">
              <div
                class="text-[0.14rem] font-medium text-gray-800 line-clamp-2 mb-[0.05rem]"
              >
                Vue 3 实战项目开发指南
              </div>
              <div class="flex items-center justify-between">
                <div class="text-[0.13rem] text-gray-600">¥89.00</div>
                <div class="text-[0.13rem] text-gray-600">x2</div>
              </div>
            </div>
          </div>
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
          <img
            src="https://alicdn.com/alipay/logo.png"
            alt="支付宝"
            class="w-[0.28rem] h-[0.28rem] mr-[0.1rem]"
          />
          <div class="text-[0.14rem] text-gray-800 flex-1">支付宝支付</div>
          <div
            class="w-[0.18rem] h-[0.18rem] rounded-full border-2 border-gray-300"
          >
            <i
              v-if="paymentMethod === 'alipay'"
              class="iconfont icon-check text-green-500 text-[0.14rem]"
              >✓</i
            >
          </div>
        </div>
        <div
          class="flex items-center p-[0.14rem] bg-white rounded-[0.08rem] cursor-pointer"
          @click="changePaymentMethod('wechat')"
        >
          <img
            src="https://wechat.com/favicon.ico"
            alt="微信"
            class="w-[0.28rem] h-[0.28rem] mr-[0.1rem]"
          />
          <div class="text-[0.14rem] text-gray-800 flex-1">微信支付</div>
          <div
            class="w-[0.18rem] h-[0.18rem] rounded-full border-2 border-gray-300"
          >
            <i
              v-if="paymentMethod === 'wechat'"
              class="iconfont icon-check text-green-500 text-[0.14rem]"
              >✓</i
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <div
      class="fixed bottom-0 left-0 right-0 p-[0.16rem] bg-white shadow-t-lg flex items-center justify-between"
    >
      <div>
        <div class="text-[0.14rem] text-gray-600">实付金额</div>
        <div class="text-[0.2rem] font-bold text-red-500">¥197.00</div>
      </div>
      <button
        class="px-[0.3rem] py-[0.12rem] bg-green-500 text-white rounded-[0.32rem] text-[0.14rem] font-medium"
        @click="submitOrder"
      >
        提交订单
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ConfirmOrder",
  setup() {
    // 支付方式
    const paymentMethod = ref<"alipay" | "wechat">("alipay");

    // 改变支付方式
    const changePaymentMethod = (method: "alipay" | "wechat") => {
      paymentMethod.value = method;
    };

    // 跳转到地址列表
    const goToAddressList = () => {
      console.log("跳转到地址列表");
    };

    // 提交订单
    const submitOrder = () => {
      console.log("提交订单");
    };

    return {
      paymentMethod,
      changePaymentMethod,
      goToAddressList,
      submitOrder,
    };
  },
});
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
</style>
