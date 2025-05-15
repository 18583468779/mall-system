<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 搜索和筛选区域 -->
    <div class="sticky top-0 bg-white z-10 shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center space-x-2">
          <el-icon class="cursor-pointer" @click="goBack">
            <ArrowLeftBold />
          </el-icon>
          <el-input
            v-model="searchQuery"
            placeholder="搜索订单号或商品名称"
            class="flex-1"
            size="large"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <el-tabs v-model="activeTab" class="mt-4" @tab-click="handleTabChange">
          <el-tab-pane label="全部订单" name="all"></el-tab-pane>
          <el-tab-pane label="待支付" name="pending"></el-tab-pane>
          <el-tab-pane label="已完成" name="completed"></el-tab-pane>
          <el-tab-pane label="已关闭" name="closed"></el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="container mx-auto px-4 py-6">
      <template v-if="filteredOrders.length > 0">
        <div class="space-y-4">
          <!-- 订单卡片 -->
          <el-card
            v-for="order in filteredOrders"
            :key="order.id"
            class="transition-all hover:shadow-lg"
          >
            <div class="flex flex-col space-y-4">
              <!-- 订单头 -->
              <div class="flex justify-between items-start">
                <div class="space-y-1">
                  <div class="text-sm text-gray-500">
                    订单号：{{ order.outTradeNo }}
                  </div>
                  <div class="text-lg font-semibold">
                    {{ order.description }}
                  </div>
                </div>
                <el-tag
                  :type="getStatusTagType(order.status)"
                  effect="light"
                  class="rounded-full"
                >
                  {{ getStatusText(order.status) }}
                </el-tag>
              </div>

              <!-- 订单内容 -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- 支付信息 -->
                <div class="space-y-1">
                  <div class="text-sm text-gray-500">支付方式</div>
                  <div class="flex items-center space-x-2">
                    <el-icon
                      v-if="order.paymentChannel === 'wechat'"
                      class="text-green-500"
                    >
                      <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em">
                        <path
                          fill="currentColor"
                          d="M598.58 766.784q26.88-20.48 51.2-42.496t43.52-49.152q-35.84-25.6-73.728-25.6-43.008 0-74.24 30.72t-31.232 74.752q0 44.032 30.72 75.264t74.752 31.232q41.984 0 71.68-28.672t40.96-70.656h-85.504v-54.272h143.872q5.12 40.96 5.12 81.92t-5.12 81.92h-156.16q-67.072 0-115.2-46.08t-48.128-112.128q0-66.56 46.592-113.152t113.152-46.592q64.512 0 109.568 43.008t54.272 104.448l131.072-20.48q-15.36-83.968-82.944-137.728t-155.648-53.76q-97.28 0-166.4 68.608t-69.12 165.888q0 97.28 68.608 166.4t165.888 69.12q80.896 0 144.384-49.152t84.992-124.928H598.528zM214.4 572.8q-32.768 0-55.808-23.04t-23.04-55.808q0-32.768 23.04-55.808t55.808-23.04q32.768 0 55.808 23.04t23.04 55.808q0 32.768-23.04 55.808t-55.808 23.04zm597.12 0q-32.768 0-55.808-23.04t-23.04-55.808q0-32.768 23.04-55.808t55.808-23.04q32.768 0 55.808 23.04t23.04 55.808q0 32.768-23.04 55.808t-55.808 23.04z"
                        />
                      </svg>
                    </el-icon>
                    <el-icon v-else class="text-blue-500">
                      <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em">
                        <path
                          fill="currentColor"
                          d="M789.6 385.6c-47.6-110.2-132-194.6-241.7-242.2-111.8-48.4-231.8-30.1-324.6 49-90.5 77.4-131.2 197.4-106.3 313 22.4 103.6 97.6 190.2 200.4 228.8v132.6h85.6V763c63.3 7.8 128.3-6.5 181.9-39.9 38.8-24.5 69.2-58.5 88.2-97.3 7.8-15.8 15.2-32.3 22.1-49.5 3-7.3 1.7-15.5-3.3-21.2-5-5.7-13.1-7.6-20.4-4.6-15.8 6.4-32.3 12-49.2 16.4-36.8 9.6-75.5 11.1-113.3 4.4-70.4-12.4-129.4-57.9-159.1-121.5-29.7-63.6-25.1-138 12.2-197.2 38.7-61.8 107.4-101 182.3-107.7 72.8-6.4 144.7 15.3 193.7 58.9 24.6 21.9 44.2 48.5 57.6 78.1 14.8 32.7 22 68.2 20.9 104.1h-324c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h372c4.4 0 8-3.6 8-8v-56c0-151.6-99-284-243.3-333.3z"
                        />
                      </svg>
                    </el-icon>
                    <span class="font-medium">
                      {{ getPaymentChannel(order.paymentChannel) }}
                    </span>
                  </div>
                </div>

                <!-- 金额信息 -->
                <div class="space-y-1">
                  <div class="text-sm text-gray-500">订单金额</div>
                  <div class="text-xl font-bold text-red-500">
                    ¥{{ (order.totalFee / 100).toFixed(2) }}
                  </div>
                </div>

                <!-- 时间信息 -->
                <div class="space-y-1">
                  <div class="text-sm text-gray-500">创建时间</div>
                  <div class="text-gray-600">
                    {{ formatDate(order.createTime) }}
                  </div>
                </div>
              </div>

              <!-- 操作按钮 -->
              <div class="flex justify-end space-x-2 border-t pt-4">
                <el-button
                  v-if="order.status === 'PENDING'"
                  type="primary"
                  size="small"
                  @click="handlePay(order)"
                >
                  立即支付
                </el-button>
                <el-button
                  v-if="order.status === 'COMPLETED'"
                  size="small"
                  @click="handleViewDetail(order)"
                >
                  查看详情
                </el-button>
                <el-button
                  v-if="order.status === 'CLOSED'"
                  size="small"
                  @click="handleDelete(order)"
                >
                  删除订单
                </el-button>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 分页 -->
        <div class="mt-6 flex justify-center">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="totalOrders"
            hide-on-single-page
          />
        </div>
      </template>

      <!-- 空状态 -->
      <div v-else class="flex flex-col items-center py-20">
        <el-empty description="暂无相关订单">
          <template #image>
            <div class="relative w-48 h-48">
              <div
                class="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-50"
              ></div>
              <el-icon class="text-6xl text-gray-400 relative">
                <Box />
              </el-icon>
            </div>
          </template>
          <el-button type="primary" @click="goBack">返回首页</el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";
import userInfo from "../../piniaStore/userInfo";
const userInfoStore = userInfo();
import { Search, ArrowLeftBold, Box } from "@element-plus/icons-vue";
import request from "../../utils/axiosUtil";

interface Order {
  id: number;
  outTradeNo: string;
  paymentChannel: string;
  userId: number;
  productType: string;
  totalFee: number;
  status: string;
  createTime: string;
  description: string;
}

// 模拟数据
const resData: any = ref([]);

const searchQuery = ref("");
const activeTab = ref("all");
const currentPage = ref(1);
const pageSize = 10;

onMounted(() => {
  queryOrderDao();
});
const queryOrderDao = async () => {
  // 查询订单
  let res: any = await request.get(
    `/ordersmodule/queryOrderDao/${userInfoStore.storeLoginUser?.userid}`,
    false
  );
  if (res.code === 200) {
    resData.value = res.data;
  }
};

const filteredOrders = computed(() => {
  return resData.value.filter((order: any) => {
    const matchesSearch =
      order.outTradeNo.includes(searchQuery.value) ||
      order.description.includes(searchQuery.value);

    const matchesTab =
      activeTab.value === "all" ||
      order.status.toLowerCase() === activeTab.value.toUpperCase();

    return matchesSearch && matchesTab;
  });
});

const totalOrders = computed(() => filteredOrders.value.length);

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    PENDING: "待支付",
    COMPLETED: "已完成",
    CLOSED: "已关闭",
    REFUNDED: "已退款",
  };
  return statusMap[status] || "未知状态";
};

const getStatusTagType = (status: string) => {
  const typeMap: Record<string, string> = {
    PENDING: "warning",
    COMPLETED: "success",
    CLOSED: "info",
    REFUNDED: "danger",
  };
  return typeMap[status] || "";
};

const getPaymentChannel = (channel: string) => {
  const channelMap: Record<string, string> = {
    wechat: "微信支付",
    alipay: "支付宝",
  };
  return channelMap[channel] || "其他支付";
};

const formatDate = (dateString: string) => {
  return dayjs(dateString).format("YYYY-MM-DD HH:mm:ss");
};

const handlePay = (order: Order) => {
  ElMessage.info(`正在跳转到支付页面：${order.outTradeNo}`);
};

const handleViewDetail = (order: Order) => {
  ElMessage.info(`查看订单详情：${order.outTradeNo}`);
};

const handleDelete = (order: Order) => {
  ElMessage.success(`已删除订单：${order.outTradeNo}`);
};

const handleSearch = () => {
  currentPage.value = 1;
};

const handleTabChange = () => {
  currentPage.value = 1;
};

const goBack = () => {
  window.history.back();
};
</script>

<style scoped>
.el-card {
  @apply rounded-xl;
}

.el-tabs {
  @apply border-b-0;
}

.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  @apply bg-blue-500 text-white rounded-full;
}

.el-pagination.is-background .el-pager li:not(.is-disabled):hover {
  @apply text-blue-500;
}
</style>
