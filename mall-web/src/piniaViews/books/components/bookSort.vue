<template>
  <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
    <!-- 主排序区域 -->
    <div class="flex flex-wrap gap-2 items-center">
      <el-radio-group v-model="sortField" @change="handleSortChange">
        <el-radio-button label="compsive">综合</el-radio-button>
        <el-radio-button label="monthsalecount">
          销量 <SortAsc v-if="isReadAsc" class="ml-1" /><SortDesc v-else />
        </el-radio-button>
        <el-radio-button label="price">
          价格 <SortAsc v-if="isReadAsc" class="ml-1" /><SortDesc v-else />
        </el-radio-button>
      </el-radio-group>

      <!-- 筛选下拉 -->
      <el-dropdown trigger="click" @visible-change="isAutoComSearch = $event">
        <el-button class="!px-4">
          筛选<el-icon class="ml-1"><Filter /></el-icon>
        </el-button>
        <template #dropdown>
          <div class="w-72 p-4">
            <!-- 出版社筛选 -->
            <div class="mb-4">
              <div class="flex justify-between items-center mb-2">
                <span class="font-medium">出版社</span>
                <el-button link type="primary" @click="findBksByPublishIds"
                  >搜索</el-button
                >
              </div>
              <div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                <div
                  v-for="item in publisherList"
                  :key="item.publishid"
                  class="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                  @click="togglePublisher(item)"
                >
                  <span>{{ item.publishername }}</span>
                  <el-icon
                    v-if="selectedPublishers.includes(item.publishid)"
                    color="#F56C6C"
                  >
                    <Check />
                  </el-icon>
                </div>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex justify-between border-t pt-4">
              <el-button @click="resetPublishers">重置</el-button>
              <el-button type="primary" @click="confirmFilter">确认</el-button>
            </div>
          </div>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Filter } from "@element-plus/icons-vue";
import Books from "../service";
import { ref } from "vue";

const { sortBook, isReadAsc, sortField, isAutoComSearch, findBksByPublishIds } =
  Books;

const { publisherList } = Books.storeRefs;

const selectedPublishers = ref<number[]>([]);

const handleSortChange = (value: string) => {
  sortBook(value);
};

const togglePublisher = (item: any) => {
  const index = selectedPublishers.value.indexOf(item.publishid);
  if (index > -1) {
    selectedPublishers.value.splice(index, 1);
  } else {
    selectedPublishers.value.push(item.publishid);
  }
};

const resetPublishers = () => {
  selectedPublishers.value = [];
};

const confirmFilter = () => {
  // 执行筛选逻辑
  isAutoComSearch.value = false;
};
</script>

<style scoped>
.el-radio-group :deep(.el-radio-button__inner) {
  @apply px-4;
}

.el-dropdown {
  @apply ml-2;
}
</style>
