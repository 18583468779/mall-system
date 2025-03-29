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
        v-for="order in getOrderList"
        :key="order.orderid"
        class="bg-white rounded-lg shadow-sm"
      >
        <div class="flex justify-between items-center mb-[0.16rem]">
          <div class="text-[0.14rem] text-gray-600">
            <span class="font-medium">订单号: </span>{{ order.orderid }}
          </div>
          <el-tag
            :type="getTagType(order.orderstatus)"
            size="small"
            effect="dark"
          >
            {{ getStatusText(order.orderstatus) }}
          </el-tag>
        </div>

        <div class="space-y-[0.16rem]">
          <div
            v-for="item in order.orderDetailList"
            :key="item.orderdetailid"
            class="flex items-start space-x-[0.16rem]"
          >
            <div class="w-[0.8rem] h-[0.8rem]">
              <img
                :src="ImgUtil.getImg(item.bookpicname)"
                alt="商品图片"
                class="w-full h-full object-cover rounded"
              />
            </div>
            <div class="flex-1 space-y-[0.08rem]">
              <div
                class="text-[0.14rem] font-medium text-gray-800 line-clamp-2"
              >
                {{ item.bookname }}
              </div>
              <div class="flex items-center justify-between pt-[0.15rem]">
                <div class="text-[0.14rem] font-medium text-red-500">
                  ¥{{ item.bookprice }}
                </div>
                <div class="text-[0.12rem] text-gray-500">
                  x{{ item.purcharsenum }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-[0.16rem]">
          <div class="flex justify-between items-center">
            <div class="text-[0.14rem] text-gray-600">
              共{{ sumPurcharsenum(order.orderDetailList!) ?? 0 }}件商品 合计:
            </div>
            <div class="text-[0.14rem] font-medium text-red-500">
              ¥{{ totalPrice(order.orderDetailList!) ?? 0 }}
            </div>
          </div>

          <!-- 倒计时（仅在待付款订单中显示） -->
          <div
            v-if="order.orderstatus === 1"
            class="flex items-center justify-between mt-[0.16rem]"
          >
            <div class="text-[0.14rem] text-red-500">
              剩余支付时间:
              {{ formatCountdown(orderCountdowns[order.orderid!]) }}
            </div>
            <el-button
              type="primary"
              size="small"
              @click="payOrder(order.orderid!)"
            >
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
import { ElInput, ElButton, ElCard, ElTag, ElIcon } from "element-plus";
import { Search, ArrowLeftBold } from "@element-plus/icons-vue";
import router from "../../router";
import OrderService from "./service";
import { ImgUtil } from "../../utils/imgUtil";
import { OrderDetail } from "../../piniaStore/order/state";
const { getOrderInfoByCustomerid, storeRef } = OrderService;
const { getOrderList } = storeRef;
getOrderInfoByCustomerid();

// 为每个待付款订单添加倒计时逻辑
const orderCountdowns = ref<Record<number, number>>({});

function sumPurcharsenum(orders: OrderDetail[]) {
  return orders.reduce((total, order) => total + order.purcharsenum, 0);
}

function totalPrice(orders: OrderDetail[]) {
  return orders.reduce((total, order) => total + order.bookprice, 0);
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

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
