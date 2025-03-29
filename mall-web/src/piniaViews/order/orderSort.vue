<template>
  <div class="min-h-full bg-gray-100">
    <!-- 搜索框 -->
    <div class="px-[0.02rem] py-[0.16rem] bg-white shadow-sm flex items-center">
      <div class="z-10 px-[0.2rem] pt-[0.1rem] text-[0.2rem]">
        <el-icon @click="goBack"><ArrowLeftBold /></el-icon>
      </div>
      <el-input
        v-model="searchQuery"
        placeholder="搜索我的订单"
        class="w-full mr-1 px-[0.2rem] py-[0.1rem] text-[0.2rem] rounded-full"
        size="small"
        clearable
        :suffix-icon="Search"
        @keyup.enter="handleSearch"
        @suffix-click="handleSearch"
      >
      </el-input>
    </div>

    <!-- 订单筛选 -->
    <div class="px-[0.32rem] py-[0.16rem] bg-white mt-[0.16rem] shadow-sm">
      <div
        class="flex items-center space-x-[0.24rem] overflow-x-auto no-scrollbar"
      >
        <el-button
          class="px-[0.24rem] py-[0.08rem] text-[0.14rem] font-medium text-gray-600 bg-blue-100 rounded-full hover:bg-blue-200"
          size="small"
        >
          全部订单
        </el-button>
        <el-button
          class="px-[0.24rem] py-[0.08rem] text-[0.14rem] font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
          size="small"
        >
          待付款
        </el-button>
        <el-button
          class="px-[0.24rem] py-[0.08rem] text-[0.14rem] font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
          size="small"
        >
          待发货
        </el-button>
        <el-button
          class="px-[0.24rem] py-[0.08rem] text-[0.14rem] font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
          size="small"
        >
          待收货
        </el-button>
        <el-button
          class="px-[0.24rem] py-[0.08rem] text-[0.14rem] font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
          size="small"
        >
          待评价
        </el-button>
        <el-button
          class="px-[0.24rem] py-[0.08rem] text-[0.14rem] font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-gray-50"
          size="small"
        >
          退款/售后
        </el-button>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="px-[0.32rem] py-[0.16rem] space-y-[0.32rem]">
      <!-- 订单项 -->
      <el-card
        v-for="order in orders"
        :key="order.id"
        class="bg-white rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-center mb-[0.16rem]">
          <div class="text-[0.14rem] text-gray-600">
            <span class="font-medium">订单号: </span>{{ order.orderId }}
          </div>
          <el-tag :type="getTagType(order.status)" size="small" effect="dark">
            {{ order.status }}
          </el-tag>
        </div>

        <div class="space-y-[0.16rem]">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-start space-x-[0.16rem]"
          >
            <div class="w-[0.8rem] h-[0.8rem]">
              <img
                :src="item.image"
                alt="商品图片"
                class="w-full h-full object-cover rounded"
              />
            </div>
            <div class="flex-1 space-y-[0.08rem]">
              <div
                class="text-[0.14rem] font-medium text-gray-800 line-clamp-2"
              >
                {{ item.name }}
              </div>
              <div class="text-[0.12rem] text-gray-500">
                {{ item.spec }}
              </div>
              <div class="flex items-center justify-between">
                <div class="text-[0.14rem] font-medium text-red-500">
                  ¥{{ item.price }}
                </div>
                <div class="text-[0.12rem] text-gray-500">
                  x{{ item.quantity }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-[0.16rem]">
          <div class="flex justify-between items-center">
            <div class="text-[0.14rem] text-gray-600">
              共{{ order.totalItems }}件商品 合计:
            </div>
            <div class="text-[0.14rem] font-medium text-red-500">
              ¥{{ order.totalPrice }}
            </div>
          </div>

          <!-- 倒计时（仅在待付款订单中显示） -->
          <div
            v-if="order.status === '待付款'"
            class="flex items-center justify-between mt-[0.16rem]"
          >
            <div class="text-[0.14rem] text-red-500">
              剩余支付时间: {{ formatCountdown(order.countdown) }}
            </div>
            <el-button type="primary" size="small" @click="payOrder(order.id)">
              立即付款
            </el-button>
          </div>

          <div class="flex justify-end mt-[0.16rem] space-x-[0.16rem]">
            <el-button
              class="px-[0.2rem] py-[0.08rem] text-[0.12rem] text-blue-600 bg-blue-50 rounded hover:bg-blue-100"
              size="small"
            >
              查看详情
            </el-button>
            <el-button
              class="px-[0.2rem] py-[0.08rem] text-[0.12rem] text-gray-600 bg-gray-50 rounded hover:bg-gray-100"
              size="small"
            >
              再次购买
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElInput, ElButton, ElCard, ElTag } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import router from "../../router";
import OrderService from "./service";

const { getOrderInfoByCustomerid } = OrderService;
getOrderInfoByCustomerid();

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  spec: string;
}

interface Order {
  id: number;
  orderId: string;
  status: string;
  countdown: number;
  items: OrderItem[];
  totalItems: number;
  totalPrice: number;
}
// 返回上一页
const goBack = () => {
  router.go(-1);
};
// 模拟订单数据
const orders = ref<Order[]>([
  {
    id: 1,
    orderId: "2023123456789",
    status: "待付款",
    countdown: 300, // 5分钟倒计时
    items: [
      {
        id: 101,
        name: "JavaScript高级程序设计（第4版）",
        image: "https://picsum.photos/200/300",
        price: 79.0,
        quantity: 1,
        spec: "精装版",
      },
      {
        id: 102,
        name: "Vue 3 实战项目开发指南",
        image: "https://picsum.photos/200/301",
        price: 89.0,
        quantity: 2,
        spec: "平装版",
      },
    ],
    totalItems: 3,
    totalPrice: 257.0,
  },
  {
    id: 2,
    orderId: "2023987654321",
    status: "待收货",
    countdown: 0,
    items: [
      {
        id: 201,
        name: "TypeScript实战指南",
        image: "https://picsum.photos/200/302",
        price: 69.0,
        quantity: 1,
        spec: "精装版",
      },
    ],
    totalItems: 1,
    totalPrice: 69.0,
  },
  {
    id: 3,
    orderId: "2023112233445",
    status: "已完成",
    countdown: 0,
    items: [
      {
        id: 301,
        name: "React实战项目开发",
        image: "https://picsum.photos/200/303",
        price: 85.0,
        quantity: 1,
        spec: "精装版",
      },
      {
        id: 302,
        name: "Node.js设计模式",
        image: "https://picsum.photos/200/304",
        price: 75.0,
        quantity: 1,
        spec: "平装版",
      },
    ],
    totalItems: 2,
    totalPrice: 160.0,
  },
]);

const searchQuery = ref("");

// 搜索和倒计时功能保持不变
const handleSearch = () => {
  console.log("搜索订单: ", searchQuery.value);
};

const formatCountdown = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const countdownInterval = setInterval(() => {
  orders.value.forEach((order) => {
    if (order.status === "待付款" && order.countdown > 0) {
      order.countdown--;
    }
  });
}, 1000);

const payOrder = (orderId: number) => {
  console.log("支付订单: ", orderId);
};

const getTagType = (status: string) => {
  switch (status) {
    case "待付款":
      return "danger";
    case "待发货":
      return "warning";
    case "待收货":
      return "info";
    case "待评价":
      return "success";
    case "退款/售后":
      return "danger";
    default:
      return "info";
  }
};

onMounted(() => {
  return () => {
    clearInterval(countdownInterval);
  };
});
</script>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
