<template>
  <div
    v-if="paymentStatus === PaymentStatus.SUCCESS"
    class="success-message flex justify-center items-center flex-col gap-5"
  >
    <h3 class="flex justify-center items-center gap-1">
      <el-icon class="success-icon"><CircleCheck /></el-icon>支付成功！您现在是
      <span class="text-red-500">VIP用户</span>
    </h3>
    <p>订单号：{{ orderNo }}</p>
    <el-button type="success" @click="handleToCenter">查看订单</el-button>
  </div>

  <div class="payment-container" v-else>
    <!-- 支付宝支付提示 -->
    <div v-if="isAlipay && !isTimeout" class="alipay-prompt">
      <div class="alipay-icon">
        <img
          src="https://img.alicdn.com/imgextra/i3/O1CN01Zw4QzW1b3rZq4wQ7y_!!6000000003413-2-tps-200-200.png"
        />
      </div>
      <h3 class="alipay-title">请在支付宝页面完成支付</h3>
      <p class="alipay-tip">支付页面已在新窗口打开，如未自动跳转请点击按钮</p>
      <el-button type="primary" @click="openAlipayWindow"
        >重新打开支付页面</el-button
      >
    </div>

    <!-- 微信支付二维码 -->
    <div class="payment-qrcode" v-else-if="!isAlipay">
      <div class="payment-header">
        <slot name="header"></slot>
      </div>

      <div class="qrcode-wrapper">
        <div v-if="loading" class="loading">
          <el-icon class="loading-icon"><Loading /></el-icon>
          <span>正在生成支付二维码...</span>
        </div>

        <template v-else-if="!isTimeout">
          <qrcode-vue
            :value="qrcodeUrl"
            :size="size"
            level="H"
            class="qrcode-img"
          />
          <div class="countdown">
            剩余支付时间：{{ formattedCountdown }}
            <el-icon v-if="countdown <= 60" class="warning-icon">
              <Warning />
            </el-icon>
          </div>
        </template>

        <div v-else class="timeout-message">
          <el-icon class="timeout-icon"><CircleClose /></el-icon>
          <p class="timeout-text">二维码已过期</p>
        </div>
      </div>

      <div class="payment-footer">
        <el-button @click="handleCancel">取消支付</el-button>
        <el-button
          type="primary"
          @click="handleRefresh"
          :loading="refreshing"
          :disabled="isTimeout"
        >
          {{ isTimeout ? "重新生成" : "刷新二维码" }}
        </el-button>
      </div>
    </div>

    <!-- 支付宝超时提示 -->
    <div v-if="isAlipay && isTimeout" class="timeout-message">
      <el-icon class="timeout-icon"><CircleClose /></el-icon>
      <p class="timeout-text">订单已超时，请重新下单</p>
      <el-button type="primary" @click="handleRefresh">重新下单</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import { Loading, Warning, CircleClose } from "@element-plus/icons-vue";
import request from "../utils/axiosUtil";
import { ElMessage } from "element-plus";
import router from "../router";

enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  CLOSED = "closed",
}

const props = defineProps({
  paymentMethod: {
    type: String,
    default: "wechat",
    validator: (v: string) => ["wechat", "alipay"].includes(v),
  },
  expires: {
    type: Number,
    default: 300, // 5分钟
    validator: (v: number) => v > 0,
  },
  size: {
    type: Number,
    default: 220,
    validator: (v: number) => v >= 100 && v <= 500,
  },
  pollInterval: {
    type: Number,
    default: 3000,
    validator: (v: number) => v >= 1000 && v <= 10000,
  },
});

const emit = defineEmits<{
  (e: "success", orderNo: string): void;
  (e: "fail", error: Error): void;
  (e: "cancel"): void;
  (e: "refresh"): void;
}>();

// 响应式状态
const qrcodeUrl = ref("");
const orderNo = ref("");
const countdown = ref(props.expires);
const loading = ref(true);
const refreshing = ref(false);
const isTimeout = ref(false);
const paymentStatus = ref<PaymentStatus>(PaymentStatus.PENDING);
const alipayWindow = ref<Window | null>(null);
// 定时器引用
let countdownTimer: number | null = null;
let pollingTimer: number | null = null;

// 格式化倒计时显示
const formattedCountdown = computed(() => {
  const minutes = Math.floor(countdown.value / 60);
  const seconds = countdown.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
const isAlipay = computed(() => props.paymentMethod === "alipay");
// 初始化支付流程
const initPayment = async () => {
  try {
    resetState();
    loading.value = true;

    const { data } = await request.post(
      "/ordersmodule/createNativeOrderDao",
      false,
      {
        amount: 1, // 测试金额
        type: "vip",
        channel: props.paymentMethod,
        description: "VIP会员升级",
      }
    );
    orderNo.value = data.outTradeNo;

    if (isAlipay.value) {
      openAlipayWindow(data.qrcodeUrl);
    } else {
      qrcodeUrl.value = data.qrcodeUrl;
    }

    startTimers();
    startPolling();
  } catch (error) {
    handlePaymentError(new Error("创建支付订单失败"));
  } finally {
    loading.value = false;
  }
};
// 打开支付宝窗口
const openAlipayWindow = (url?: string) => {
  if (url) {
    alipayWindow.value = window.open(url, "_blank", "width=600,height=800");
  } else if (alipayWindow.value) {
    alipayWindow.value.focus();
  }
};
// 启动倒计时
const startTimers = () => {
  countdownTimer = window.setInterval(() => {
    if (countdown.value <= 0) {
      handleTimeout();
      return;
    }
    countdown.value--;
  }, 1000);
};

// 修改后的轮询方法
const startPolling = async () => {
  const poll = async () => {
    try {
      const endpoint = isAlipay.value
        ? "/ordersmodule/queryAlipayPayment"
        : "/ordersmodule/queryWechatPayment";

      const { data } = await request.post(endpoint, false, {
        orderNo: orderNo.value,
      });

      if (data.detail.data.trade_state === "SUCCESS") {
        handleSuccess();
      } else if (data.status === "CLOSED") {
        handleTimeout();
      }
    } catch (error) {
      console.error("支付状态查询失败:", error);
    }
  };

  pollingTimer = window.setInterval(poll, props.pollInterval);
  poll(); // 立即执行第一次查询
};

// 处理支付成功
const handleSuccess = () => {
  cleanup();
  paymentStatus.value = PaymentStatus.SUCCESS;
  if (alipayWindow.value) {
    alipayWindow.value.close();
  }
  emit("success", orderNo.value);
  // 显示成功提示
  ElMessage.success({
    message: "支付成功",
    duration: 5000,
    onClose: () => {
      router.push("/vip"); // 跳转到成功页面
    },
  });

  // 更新本地订单状态
  // store.commit('orders/updateStatus', {
  //   orderNo: orderNo.value,
  //   status: PaymentStatus.SUCCESS
  // });
};

// 处理支付超时
const handleTimeout = async () => {
  isTimeout.value = true;
  cleanup();

  try {
    await request.post("/ordersmodule/closeOrder", false, {
      orderNo: orderNo.value,
    });
  } catch (error) {
    console.error("关闭订单失败:", error);
  }

  emit("fail", new Error("支付超时，请重新下单"));
};

// 用户取消支付
const handleCancel = () => {
  cleanup();
  emit("cancel");
};

// 刷新二维码
const handleRefresh = async () => {
  try {
    refreshing.value = true;

    if (!isTimeout.value) {
      await request.post("/ordersmodule/closeOrder", false, {
        orderNo: orderNo.value,
      });
    }

    await initPayment();
    emit("refresh");
  } catch (error) {
    handlePaymentError(new Error("刷新二维码失败"));
  } finally {
    refreshing.value = false;
  }
};

// 异常统一处理
const handlePaymentError = (error: Error) => {
  cleanup();
  emit("fail", error);
};
const handleToCenter = () => {
  router.push({ path: "/userCenter" });
};
// 清理资源
const cleanup = () => {
  if (countdownTimer) clearInterval(countdownTimer);
  if (pollingTimer) clearInterval(pollingTimer);
  countdownTimer = null;
  pollingTimer = null;
};

// 重置组件状态
const resetState = () => {
  qrcodeUrl.value = "";
  orderNo.value = "";
  countdown.value = props.expires;
  isTimeout.value = false;
};

// 监听有效期参数变化
watch(
  () => props.expires,
  (newVal) => {
    countdown.value = newVal;
  }
);

// 组件卸载时清理
onUnmounted(cleanup);

// 初始化支付
initPayment();
</script>

<style scoped lang="scss">
.payment-qrcode {
  @apply flex flex-col items-center p-6 bg-white rounded-lg shadow-md;

  .payment-header {
    @apply mb-6 text-center;

    .title {
      @apply text-xl font-semibold text-gray-800 mb-2;
    }

    .tip {
      @apply text-sm text-gray-500;
    }
  }

  .qrcode-wrapper {
    @apply relative mb-6;

    .loading {
      @apply w-64 h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg;

      .loading-icon {
        @apply text-4xl text-blue-500 mb-3 animate-spin;
      }

      span {
        @apply text-gray-400 text-sm;
      }
    }

    .qrcode-img {
      @apply border-4 border-gray-100 rounded-lg p-2 bg-white;
    }

    .countdown {
      @apply mt-3 text-sm text-gray-600 flex items-center justify-center;

      .warning-icon {
        @apply ml-1 text-yellow-500 animate-pulse;
      }
    }

    .timeout-message {
      @apply w-64 h-64 flex flex-col items-center justify-center bg-red-50 rounded-lg;

      .timeout-icon {
        @apply text-4xl text-red-500 mb-3;
      }

      .timeout-text {
        @apply text-red-500 font-medium;
      }
    }
  }

  .payment-footer {
    @apply flex gap-3;

    .el-button {
      @apply px-6;
    }
  }
}
.payment-container {
  @apply max-w-md mx-auto;

  .alipay-prompt {
    @apply text-center p-6 bg-white rounded-lg shadow-md;

    .alipay-icon {
      @apply mb-4;

      img {
        @apply w-24 h-24 mx-auto;
      }
    }

    .alipay-title {
      @apply text-lg font-semibold text-gray-800 mb-2;
    }

    .alipay-tip {
      @apply text-sm text-gray-500 mb-4;
    }
  }

  .timeout-message {
    @apply text-center p-6 bg-red-50 rounded-lg;

    .timeout-icon {
      @apply text-4xl text-red-500 mb-3;
    }

    .timeout-text {
      @apply text-red-500 font-medium mb-4;
    }
  }
}
</style>
