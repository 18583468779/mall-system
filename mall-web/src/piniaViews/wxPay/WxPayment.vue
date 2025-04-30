<template>
  <div class="payment-container">
    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <span class="loader"></span>
      <p>正在生成支付二维码...</p>
    </div>

    <!-- 支付主界面 -->
    <template v-else>
      <div v-if="!isPaid" class="payment-main">
        <h3>微信支付 {{ amount / 100 }} 元</h3>
        <div class="qrcode-wrapper">
          <qrcode-vue :value="qrcodeUrl" :size="240" level="H" class="qrcode" />
          <div class="countdown">支付剩余时间：{{ countdown }} 秒</div>
        </div>
        <p class="order-no">订单号: {{ orderId }}</p>
        <button
          class="retry-btn"
          @click="checkPaymentStatus"
          :disabled="isChecking"
        >
          {{ isChecking ? "正在查询..." : "手动刷新状态" }}
        </button>
      </div>

      <!-- 支付结果 -->
      <div v-else class="payment-result">
        <div class="result-icon" :class="{ success: isPaid }">
          <i v-if="isPaid" class="icon-success"></i>
          <i v-else class="icon-fail"></i>
        </div>
        <h3>{{ paymentResultText }}</h3>
        <button class="back-btn" @click="$emit('close')">返回</button>
      </div>
    </template>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import QrcodeVue from "qrcode.vue";
import axios from "axios";
import request from "../../utils/axiosUtil";



// Props定义
const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

// 响应式数据
const loading = ref(true);
const qrcodeUrl = ref("");
const orderId = ref("");
const isPaid = ref(false);
const errorMessage = ref("");
const isChecking = ref(false);
const countdown = ref(1800); // 30分钟倒计时

// 定时器引用
let pollTimer: number | null = null;

// 初始化支付
const initPayment = async () => {
  try {
    let data = await request.post("/ordersmodule/createNativeOrderDao", false, {
      amount: props.amount,
      description: "商品支付",
    });

    qrcodeUrl.value = data.data.code_url;
    orderId.value = data.data.out_trade_no;
    startPolling();
  } catch (error: any) {
    errorMessage.value =
      "支付初始化失败: " + (error.response?.data?.message || error.message);
  } finally {
    loading.value = false;
  }
};

// 开始轮询支付状态
const startPolling = () => {
  pollTimer = window.setInterval(() => {
    checkPaymentStatus();
  }, 2000); // 每2秒检查一次

  // 倒计时处理
  const countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(countdownTimer);
      handlePaymentTimeout();
    }
  }, 1000);
};

// 检查支付状态
const checkPaymentStatus = async () => {
  if (isChecking.value) return;

  isChecking.value = true;
  try {
    const { data } = await axios.get(`/api/orders/${orderId.value}`);

    if (data.status === "PAID") {
      handlePaymentSuccess();
    } else if (data.status === "CLOSED") {
      handlePaymentTimeout();
    }
  } catch (error) {
    console.error("支付状态查询失败:", error);
  } finally {
    isChecking.value = false;
  }
};

// 支付成功处理
const handlePaymentSuccess = () => {
  if (pollTimer) clearInterval(pollTimer);
  isPaid.value = true;
};

// 支付超时处理
const handlePaymentTimeout = () => {
  if (pollTimer) clearInterval(pollTimer);
  errorMessage.value = "支付超时，订单已自动关闭";
};

// 计算属性
const paymentResultText = computed(() => {
  return isPaid.value ? "支付成功！" : "支付失败";
});

// 生命周期
onMounted(initPayment);
onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer);
});
</script>

<style scoped>
.payment-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.qrcode-wrapper {
  margin: 20px 0;
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.countdown {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.loading {
  padding: 40px 0;
}

.loader {
  /* 添加加载动画样式 */
}

.error-message {
  color: #f56c6c;
  margin-top: 15px;
}

.result-icon {
  font-size: 60px;
  margin: 20px 0;
}

.icon-success {
  color: #67c23a;
}

.icon-fail {
  color: #f56c6c;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn {
  background: #409eff;
  color: white;
}

.back-btn {
  background: #909399;
  color: white;
}
</style>
