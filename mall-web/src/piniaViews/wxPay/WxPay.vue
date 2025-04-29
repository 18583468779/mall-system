<template>
  <div class="container">
    <wx-payment
      v-if="showPayment"
      :order-id="currentOrderId"
      :amount="totalAmount"
      @close="showPayment = false"
    />

    <button @click="startPayment" :disabled="showPayment">
      微信支付 {{ totalAmount / 100 }} 元
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WxPayment from "./WxPayment.vue";

const showPayment = ref(false);
const currentOrderId = ref("");
const totalAmount = ref(100); // 单位：分

const startPayment = async () => {
  // 这里可以添加订单创建逻辑
  currentOrderId.value = `ORDER_${Date.now()}`;
  showPayment.value = true;
};
</script>
