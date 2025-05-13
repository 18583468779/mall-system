<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- 头部标题 -->
    <div class="max-w-3xl mx-auto text-center mb-16">
      <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl">
        会员升级计划
      </h1>
      <p class="mt-4 text-xl text-gray-500">
        选择适合您的会员方案，享受专属特权
      </p>
    </div>

    <!-- 价格卡片容器 -->
    <div class="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2 lg:max-w-4xl">
      <!-- 普通会员卡片 -->
      <div
        class="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        <div class="flex flex-col h-full">
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">普通会员</h3>
            <p class="text-4xl font-extrabold text-gray-600 mb-6">
              <span class="align-top text-2xl">¥</span>0
              <span class="text-lg font-medium text-gray-500">/ 永久</span>
            </p>
            <ul class="space-y-3">
              <li
                v-for="feature in freeFeatures"
                :key="feature"
                class="flex items-start"
              >
                <el-icon class="mt-1 mr-3 text-gray-400">
                  <Check />
                </el-icon>
                <span class="text-gray-600">{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="mt-8">
            <el-button
              size="large"
              class="w-full"
              :class="{ 'cursor-not-allowed': currentPlan === 'free' }"
              disabled
            >
              {{ currentPlan === "free" ? "当前方案" : "不可选" }}
            </el-button>
          </div>
        </div>
      </div>

      <!-- VIP会员卡片 -->
      <div
        class="relative bg-gradient-to-b from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white transform lg:scale-105"
      >
        <div
          class="absolute top-0 right-0 bg-amber-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold"
        >
          推荐
        </div>
        <div class="flex flex-col h-full">
          <div class="flex-1">
            <h3 class="text-2xl font-bold mb-4">VIP尊享会员</h3>
            <p class="text-4xl font-extrabold mb-6">
              <span class="align-top text-2xl">¥</span>99
              <span class="text-lg font-medium opacity-80">/ 永久</span>
            </p>
            <ul class="space-y-3">
              <li
                v-for="feature in vipFeatures"
                :key="feature"
                class="flex items-start"
              >
                <el-icon class="mt-1 mr-3 text-amber-400">
                  <Check />
                </el-icon>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
          <div class="mt-8">
            <el-button
              type="primary"
              size="large"
              class="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 border-transparent shadow-lg text-gray-900 font-bold"
              :loading="isPaying"
              @click="handleUpgrade"
            >
              <span>
                {{ currentPlan === "vip" ? "当前方案" : userStoreComputed }}
              </span>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 特权对比表格 -->
    <div class="max-w-7xl mx-auto mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">
        特权对比
      </h2>
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-900"
              >
                会员特权
              </th>
              <th
                class="px-6 py-4 text-center text-sm font-semibold text-gray-900"
              >
                普通会员
              </th>
              <th
                class="px-6 py-4 text-center text-sm font-semibold text-gray-900"
              >
                VIP会员
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="item in compareFeatures" :key="item.feature">
              <td class="px-6 py-4 text-sm text-gray-700">
                {{ item.feature }}
              </td>
              <td class="px-6 py-4 text-center">
                <el-icon v-if="item.free" class="text-green-500">
                  <Check />
                </el-icon>
                <el-icon v-else class="text-gray-300">
                  <Close />
                </el-icon>
              </td>
              <td class="px-6 py-4 text-center">
                <el-icon class="text-green-500">
                  <Check />
                </el-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <el-dialog v-model="showPaymentDialog" title="选择支付方式" width="400px">
      <div class="bg-white rounded-xl shadow-sm p-6">
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
      <template #footer>
        <el-button @click="showPaymentDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmPayment"
          >立即支付 ¥99</el-button
        >
      </template>
    </el-dialog>
    <el-dialog v-model="paymentVisible" title="会员升级支付" width="500px">
      <PaymentQrcode
        :paymentMethod="paymentMethod"
        @success="handlePaymentSuccess"
        @fail="handlePaymentError"
        @cancel="handlePaymentCancel"
      >
        <!-- 自定义提示插槽 -->
        <template #header>
          <h3 class="vip-payment-title">VIP会员升级</h3>
          <p class="vip-payment-tip">支付成功后立即生效</p>
        </template>
      </PaymentQrcode>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Check, Close } from "@element-plus/icons-vue";
import { ElButton, ElDialog, ElIcon, ElMessage } from "element-plus";
import OrderService from "../order/service/index.ts";
import PaymentQrcode from "../../components/PaymentQrcode.vue";
import userInfo from "../../piniaStore/userInfo";
import router from "../../router";
const { paymentMethod, changePaymentMethod } = OrderService;

const paymentVisible = ref(false);
const userStore = userInfo();

const userStoreComputed = computed(() => {
  const perm = userStore.storeLoginUser?.role?.permissions || 1;
  return [2, 3].includes(perm) ? "当前方案" : "立即升级";
});

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
const currentPlan = ref<"free" | "vip">("free");
const isPaying = ref(false);
const showPaymentDialog = ref(false);

const freeFeatures = [
  "基础代码查看权限",
  "每日3次免费下载",
  "社区技术支持",
  "基础学习教程",
];

const vipFeatures = [
  "无限制源代码下载",
  "专属VIP资源库",
  "优先技术支持",
  "高级项目案例",
  "添加作者微信",
];

const compareFeatures = [
  { feature: "项目源代码下载", free: true },
  { feature: "无限制下载次数", free: false },
  { feature: "VIP专属资源", free: false },
  { feature: "优先技术支持", free: false },
  { feature: "添加作者微信", free: false },
];

// 支付回调处理
const handlePaymentSuccess = (orderNo: any) => {
  console.log("支付成功:", orderNo);
  userStore.setUserInfo(); // 更新用户信息
  currentPlan.value = "vip";
  paymentVisible.value = false;
  // 更新用户VIP状态等操作...
};

const handlePaymentError = (error: any) => {
  ElMessage.error(error.message);
};

const handlePaymentCancel = () => {
  ElMessage.warning("已取消支付");
};

const handleUpgrade = () => {
  if (!userStore.storeLoginUser) {
    ElMessage.error("请先登录");
    router.push({ path: "/login" });
  }
  if (userStoreComputed.value === "当前方案") return;
  if (currentPlan.value === "vip") return;
  showPaymentDialog.value = true;
};

const confirmPayment = async () => {
  isPaying.value = true;
  try {
    // 这里调用支付接口
    currentPlan.value = "vip";
    paymentVisible.value = true;
    showPaymentDialog.value = false;
  } finally {
    isPaying.value = false;
  }
};
</script>

<style scoped>
/* 自定义渐变边框 */
.vip-card-border {
  position: relative;

  &::before {
    content: "";
    @apply absolute inset-0 rounded-2xl p-px bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 -z-10;
  }
}

/* 按钮悬停动画 */
.hover-scale {
  @apply transition-transform duration-200 hover:scale-105;
}
</style>
