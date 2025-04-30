<template>
  <div class="payment-qrcode">
    <!-- 头部提示 -->
    <div class="payment-header">
      <slot name="header">
        <h3 class="title">{{ title }}</h3>
        <p class="tip">{{ tip }}</p>
      </slot>
    </div>

    <!-- 二维码主体 -->
    <div class="qrcode-wrapper">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading">
        <el-icon class="loading-icon">
          <Loading />
        </el-icon>
        <span>正在生成支付二维码...</span>
      </div>

      <!-- 二维码显示 -->
      <template v-else>
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
    </div>

    <!-- 底部操作 -->
    <div class="payment-footer">
      <slot name="footer" :cancel="cancel">
        <el-button @click="cancel">取消支付</el-button>
        <el-button type="primary" @click="refreshQrcode" :loading="refreshing">
          刷新二维码
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from "vue";
import QrcodeVue from "qrcode.vue";
import { Loading, Warning } from "@element-plus/icons-vue";
import request from "../utils/axiosUtil";
enum ProductType {
  vip = "vip",
  file = "file",
  bundle = "bundle",
}
const props = defineProps({
  paymentMethod: {
    type: String,
    default: "wechat",
  },
  // 支付有效期（秒）
  expires: {
    type: Number,
    default: 300,
  },
  // 二维码尺寸
  size: {
    type: Number,
    default: 220,
  },
  // 轮询间隔
  pollInterval: {
    type: Number,
    default: 3000,
  },
  // 自定义标题
  title: {
    type: String,
    default: "微信扫码支付",
  },
  // 自定义提示
  tip: {
    type: String,
    default: "请使用微信扫一扫完成支付",
  },
});

const emit = defineEmits(["success", "fail", "cancel", "refresh"]);

// 组件状态
const qrcodeUrl = ref("");
const orderNo = ref("");
const countdown = ref(props.expires);
const loading = ref(true);
const refreshing = ref(false);

// 定时器
let countdownTimer: NodeJS.Timeout | null = null;
let pollingTimer: NodeJS.Timeout | null = null;

// 格式化倒计时显示
const formattedCountdown = computed(() => {
  const minutes = Math.floor(countdown.value / 60);
  const seconds = countdown.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

// 初始化支付
const initPayment = async () => {
  try {
    loading.value = true;
    await createOrderApi();
    startTimers();
  } catch (error) {
    emit("fail", error);
  } finally {
    loading.value = false;
  }
};
const createOrderApi = async () => {
  try {
    const { data } = await request.post(
      "/ordersmodule/createNativeOrderDao",
      false,
      {
        amount: 1,
        type: ProductType.vip,
        channel: props.paymentMethod, // 支付方式 wechat | alipay
        description: "VIP会员升级",
      }
    );
    qrcodeUrl.value = data.qrcodeUrl;
    orderNo.value = data.outTradeNo;
  } catch (error) {
    throw new Error("创建订单失败，请重试");
  }
};

// 开启计时器
const startTimers = () => {
  // 倒计时
  countdownTimer = setInterval(() => {
    if (countdown.value <= 0) {
      handleTimeout();
      return;
    }
    countdown.value--;
  }, 1000);
  // 支付状态轮询
  pollingTimer = setInterval(async () => {
    try {
      const { paid } = await request.post(
        "/ordersmodule/queryWechatPayment",
        false,
        { orderNo: orderNo.value }
      );
      if (paid) {
        handleSuccess();
      }
    } catch (error) {
      console.error("支付状态查询失败:", error);
    }
  }, props.pollInterval);
};

// 检查支付状态API（父组件侧）
const checkPaymentApi = async (
  orderNo: string
): Promise<{
  paid: boolean;
}> => {
  try {
    const { data } = await request.post(
      "/ordersmodule/queryWechatPayment",
      false,
      orderNo
    );

    return {
      paid: data.paid_status === 1,
    };
  } catch (error) {
    throw new Error("支付状态查询失败");
  }
};

// 处理支付成功
const handleSuccess = () => {
  clearTimers();
  emit("success", orderNo.value);
};

// 处理超时
const handleTimeout = () => {
  clearTimers();
  emit("fail", new Error("支付超时"));
};

// 取消支付
const cancel = () => {
  clearTimers();
  emit("cancel");
};

// 刷新二维码
const refreshQrcode = async () => {
  try {
    refreshing.value = true;
    await initPayment();
    emit("refresh");
  } finally {
    refreshing.value = false;
  }
};

// 清理定时器
const clearTimers = () => {
  countdownTimer && clearInterval(countdownTimer);
  pollingTimer && clearInterval(pollingTimer);
};

// 监听有效期变化
watch(
  () => props.expires,
  (newVal) => {
    countdown.value = newVal;
  }
);

// 生命周期
onUnmounted(clearTimers);
initPayment();
</script>

<style scoped>
.payment-qrcode {
  @apply text-center;

  .payment-header {
    @apply mb-6;

    .title {
      @apply text-xl font-bold text-gray-900 mb-2;
    }

    .tip {
      @apply text-gray-500 text-sm;
    }
  }

  .qrcode-wrapper {
    @apply mb-6;

    .loading {
      @apply h-64 flex flex-col items-center justify-center text-gray-400;

      .loading-icon {
        @apply text-4xl mb-3 animate-spin;
      }
    }

    .qrcode-img {
      @apply mx-auto border rounded-lg p-4;
    }

    .countdown {
      @apply mt-4 text-sm text-gray-600 flex items-center justify-center;

      .warning-icon {
        @apply ml-1 text-yellow-500;
      }
    }
  }

  .payment-footer {
    @apply flex justify-center gap-3;
  }
}
</style>
