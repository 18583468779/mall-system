<template>
  <!-- 二三级分类 -->
  <div class="col-span-3 grid grid-cols-3 gap-6">
    <div
      v-for="second in secondCtgyList"
      :key="second.secondctgyid"
      class="space-y-4"
    >
      <div class="flex justify-between items-center group">
        <h3 class="font-semibold text-lg">{{ second.secctgyname }}</h3>
        <span
          class="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <el-icon><ArrowRight /></el-icon>
        </span>
      </div>

      <ul class="space-y-2">
        <li
          v-for="third in second.thirdctgys"
          :key="third.thirdctgyid"
          @click="toBookInfo(third, second)"
          class="text-gray-600 hover:text-blue-500 transition-colors cursor-pointer"
        >
          {{ third.thirdctgyname }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { FstToThrdCtgy } from "../service";
const { storeRefs, toBookInfo } = FstToThrdCtgy;

const { secondCtgyList } = storeRefs;
</script>

<style scoped></style>
