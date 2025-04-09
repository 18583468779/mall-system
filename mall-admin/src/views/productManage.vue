<template>
  <div class="product-list">
    <div class="flex justify-between mb-4">
      <el-input
        v-model="searchKey"
        placeholder="搜索商品"
        class="w-64"
        clearable
      />
      <el-button type="primary" @click="handleCreate"> 新增商品 </el-button>
    </div>

    <el-table :data="filteredList" height="calc(100vh - 220px)">
      <el-table-column prop="name" label="商品名称" width="300" />
      <el-table-column prop="price" label="价格" width="120">
        <template #default="{ row }"> ¥{{ row.price.toFixed(2) }} </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="120" />
      <el-table-column label="操作" width="200">
        <template #default="{ row }">
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const searchKey = ref("");
const products = ref<Product[]>([
  { id: 1, name: "商品1", price: 100, stock: 50 },
  { id: 2, name: "商品2", price: 200, stock: 30 },
]);

const filteredList = computed(() => {
  return products.value.filter((p) => p.name.includes(searchKey.value));
});

const handleCreate = () => {
  // 创建逻辑
};
</script>
