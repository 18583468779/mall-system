<template>
  <div>
    <div class="aspect-square relative">
      <LazyImage
        :src="product?.images[0]?.url"
        class="w-full h-full object-cover"
        alt="图片"
      />
      <div
        v-if="product.thirdCtgy?.thirdctgyname"
        class="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded-full text-xs"
      >
        {{ product.thirdCtgy?.thirdctgyname }}
      </div>
      <div
        v-if="product.discount"
        class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs"
      >
        {{ product.discount }}折
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-medium truncate mb-2">{{ product.bookname }}</h3>
      <div class="flex justify-between items-center">
        <div>
          <span class="text-red-500 font-bold text-lg"
            >¥{{ productPrice }}</span
          >
          <span class="text-gray-400 text-sm line-through ml-2"
            >¥{{ product.originalprice }}</span
          >
        </div>
        <el-button type="danger" size="small" class="!rounded-full !px-4">
          详情
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LazyImage from "../../../components/LazyImage.vue";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const productPrice = computed(() => {
  if (props.product.discount) {
    return (props.product.originalprice * props.product.discount) / 10;
  } else {
    return props.product.originalprice;
  }
});
</script>

<style scoped></style>
