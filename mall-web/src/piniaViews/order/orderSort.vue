<template>
  <div class="min-h-screen bg-gray-100">
    <!-- 搜索框 -->
    <div class="container">
      <!-- 订单筛选 -->
      <div class="px-4 py-3 bg-white mt-3 shadow-sm md:px-6">
        <div class="px-4 py-3 bg-white shadow-sm flex items-center md:px-6">
          <div class="z-10 px-2 pt-1 text-sm">
            <el-icon @click="goBack">
              <ArrowLeftBold />
            </el-icon>
          </div>
          <el-input v-model="searchQuery" placeholder="搜索我的订单" class="w-full md:px-4 md:py-2 text-sm rounded-full"
            size="small" clearable :suffix-icon="Search" @keyup.enter="handleSearch" @suffix-click="handleSearch">
          </el-input>
        </div>
        <el-tabs v-model="activeTab" class="w-full" @tab-click="handleGetOrder">
          <el-tab-pane label="全部订单" name="all"></el-tab-pane>
          <el-tab-pane label="待付款" name="pending"></el-tab-pane>
          <el-tab-pane label="已付款" name="reviewing"></el-tab-pane>
        </el-tabs>
        <!-- 订单列表 -->
        <div class="mx-auto py-3 space-y-4">
          <!-- 订单项 -->
          <el-card v-for="order in getOrderList" :key="order.orderid" class="bg-white rounded-lg shadow-sm">
            <div class="flex justify-between items-center mb-3">
              <div class="text-sm text-gray-600">
                <span class="font-medium">订单号: </span>{{ order.orderid }}
              </div>
              <el-tag :type="getTagType(order.orderstatus)" size="small" effect="dark">
                {{ getStatusText(order.orderstatus) }}
              </el-tag>
            </div>

            <div class="space-y-4">
              <div v-for="item in order.orderDetailList" :key="item.orderdetailid" class="flex items-start space-x-4">
                <div class="w-16 h-16">
                  <img :src="item.bookpicname" alt="商品图片" class="w-full h-full object-cover rounded" />
                </div>
                <div class="flex-1 space-y-2">
                  <div class="text-sm font-medium text-gray-800 line-clamp-2">
                    {{ item.bookname }}
                  </div>
                  <div class="flex items-center justify-between pt-2">
                    <div class="text-sm font-medium text-red-500">
                      ¥{{ item.bookprice }}
                    </div>
                    <div class="text-xs text-gray-500">
                      x{{ item.purcharsenum }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4">
              <div class="flex justify-between items-center">
                <div class="text-sm text-gray-600">
                  共{{ sumPurcharsenum(order.orderDetailList!) ?? 0 }}件商品
                  合计:
                </div>
                <div class="text-sm font-medium text-red-500">
                  ¥{{ totalPrice(order.orderDetailList!) ?? 0 }}
                </div>
              </div>

              <!-- 倒计时（仅在待付款订单中显示） -->
              <div v-if="order.orderstatus === 1" class="flex items-center justify-between mt-4">
                <div class="text-sm text-red-500">
                  剩余支付时间:
                  {{ formatCountdown(orderCountdowns[order.orderid!]) }}
                </div>
                <el-button type="primary" size="small" @click="payOrder(order.orderid!)">
                  立即付款
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  ElInput,
  ElButton,
  ElCard,
  ElTag,
  ElIcon,
  ElTabs,
  ElTabPane,
} from "element-plus";
import { Search, ArrowLeftBold } from "@element-plus/icons-vue";
import router from "../../router";
import OrderService from "./service";
import { OrderDetail } from "../../piniaStore/order/state";
const { getOrderInfoByCustomerid, storeRef } = OrderService;
const { getOrderList } = storeRef;
getOrderInfoByCustomerid(4);

// 为每个待付款订单添加倒计时逻辑
const orderCountdowns = ref<Record<number, number>>({});
const activeTab = ref("all");

function sumPurcharsenum(orders: OrderDetail[]) {
  return orders.reduce((total, order) => total + order.purcharsenum, 0);
}

function totalPrice(orders: OrderDetail[]): string {
  const total = orders.reduce((acc, order) => 
    acc + parseFloat(order.bookprice) * order.purcharsenum
  , 0);
  return total.toFixed(2);
}

// 返回上一页
const goBack = () => {
  router.go(-1);
};

// 搜索框和倒计时功能
const searchQuery = ref("");
const handleSearch = () => {
  console.log("搜索订单: ", searchQuery.value);
};

const handleGetOrder = () =>{
  // 查询订单
  if (activeTab.value === 'all') {
    getOrderInfoByCustomerid(4); 
  }
  else if (activeTab.value === 'pending') {
    getOrderInfoByCustomerid(1); 
  }
  else if (activeTab.value === 'reviewing') {
    getOrderInfoByCustomerid(2); 
  }
}


const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const countdownInterval = setInterval(() => {
  getOrderList.value.forEach((order) => {
    if (
      order.orderstatus === 1 &&
      order.orderid &&
      orderCountdowns.value[order.orderid] > 0
    ) {
      orderCountdowns.value[order.orderid]--;
    }
  });
}, 1000);

const payOrder = (orderId: number) => {
  console.log("支付订单: ", orderId);
};

const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "已取消";
    case 1:
      return "待付款";
    case 2:
      return "待发货";
    case 3:
      return "待收货";
    case 4:
      return "待评价";
    case 5:
      return "交易完成";
    case 6:
      return "退款/售后";
    default:
      return "未知状态";
  }
};

const getTagType = (status: number) => {
  switch (status) {
    case 0:
      return "danger";
    case 1:
      return "warning";
    case 2:
      return "info";
    case 3:
      return "success";
    case 4:
      return "danger";
    default:
      return "info";
  }
};

onMounted(() => {
  // 初始化倒计时
  getOrderList.value.forEach((order) => {
    if (order.orderstatus === 1 && order.orderid) {
      orderCountdowns.value[order.orderid] = 300; // 默认5分钟倒计时
    }
  });

  return () => {
    clearInterval(countdownInterval);
  };
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
