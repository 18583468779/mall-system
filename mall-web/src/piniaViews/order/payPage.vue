<!-- 新增支付页面 PayPage.vue -->
<template>
  <div class="pt-[10%] bg-gray-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <!-- 支付状态提示 -->
      <div v-if="paymentStatus === 'success'" class="text-center">
        <el-icon class="text-green-500 text-6xl mb-4"><CircleCheck /></el-icon>
        <h2 class="text-2xl font-bold mb-4">支付成功！</h2>
        <el-button type="primary" @click="goToOrderDetail">查看订单</el-button>
      </div>

      <!-- 支付信息 -->
      <div v-else>
        <h2 class="text-2xl font-bold mb-6">订单支付</h2>
        <div class="mb-6">
          <p class="text-gray-600">订单号：{{ orderData.orderId }}</p>
          <p class="text-2xl font-bold text-red-500 mt-2">
            ¥{{ orderData.amount }}
          </p>
        </div>

        <!-- 二维码展示 -->
        <div class="border-2 border-dashed p-4 rounded-lg mb-6">
          <img :src="qrCode" class="w-48 h-48 mx-auto" alt="支付二维码" />
          <p class="text-center mt-4 text-gray-600">
            请使用{{ paymentMethodMap[orderData.payType] }}扫码支付
          </p>
        </div>

        <!-- 支付倒计时 -->
        <div class="text-center text-gray-500">
          剩余支付时间：{{ formatTime(countdown) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

// 模拟支付数据
const qrCode = ref("https://dummyimage.com/200x200/4CAF50/fff&text=Mock+QR");
const paymentStatus = ref("pending"); // pending | success | failed
const countdown = ref(900); // 15分钟倒计时（秒）
const router = useRouter();

// 接收订单数据（从路由参数获取）
const orderData: any = ref({
  orderId: router.currentRoute.value.query.orderId,
  amount: router.currentRoute.value.query.amount,
  payType: router.currentRoute.value.query.payType,
});

const paymentMethodMap: Record<string, string> = {
  alipay: "支付宝",
  wechat: "微信",
};

// 倒计时逻辑
let timer: any;
onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) countdown.value--;
    else handleTimeout();
  }, 1000);

  // 开始轮询支付状态
  checkPaymentStatus();
});

onBeforeUnmount(() => clearInterval(timer));

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// 支付状态轮询（模拟）
const checkPaymentStatus = async () => {
  // 实际应调用API检查支付状态
  if (Math.random() < 0.3) {
    // 30%概率模拟支付成功
    paymentStatus.value = "success";
    clearInterval(timer);
  }
};

const handleTimeout = () => {
  clearInterval(timer);
  ElMessage.error("支付超时，订单已自动取消");
  router.push("/orders");
};

const goToOrderDetail = () => {
  router.push(`/orders/${orderData.value.orderId}`);
};
</script>
