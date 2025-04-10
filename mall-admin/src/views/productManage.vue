<template>
  <el-card
    class="!border-0 !shadow-card hover:!shadow-card-hover transition-all duration-300"
  >
    <!-- 卡片头部 -->
    <template #header>
      <div class="card-header px-4 py-3 bg-gray-50">
        <h2 class="text-2xl font-semibold text-primary-600">
          <slot name="title">商品管理</slot>
        </h2>
      </div>
    </template>

    <!-- 搜索表单 -->
    <div class="px-4 pb-4 border-b border-gray-200">
      <search-form :fields="searchFields" @submit="handleSearch" />
    </div>

    <!-- 数据表格 -->
    <div class="mt-4 px-4">
      <data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        @row-click="handleRowClick"
      >
        <template #actions="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click.stop="handleDetail(row)"
          >
            详情
          </el-button>
          <el-button
            link
            type="warning"
            size="small"
            @click.stop="handleEdit(row)"
          >
            编辑
          </el-button>
        </template>
      </data-table>
    </div>

    <!-- 分页 -->
    <div class="mt-6 px-4 pb-4">
      <pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TableColumn } from "../components/tableComponent/types";
import type { SearchField } from "../components/searchForm/types";
import SearchForm from "../components/searchForm/SearchForm.vue";
import DataTable from "../components/tableComponent/TableComponent.vue";
const loading = ref(false);
const tableData = ref([]); // 你的数据

const handleRowClick = (row: any) => {
  console.log("Row clicked:", row);
};
const searchFields: SearchField[] = [
  {
    type: "input",
    prop: "user",
    label: "创建人",
    placeholder: "请输入创建人",
    span: 6,
  },
  {
    type: "select",
    prop: "region",
    label: "商品分类",
    options: [
      { label: "电子产品", value: "electronics" },
      { label: "家用电器", value: "appliances" },
    ],
    span: 6,
  },
  {
    type: "date",
    prop: "date",
    label: "创建时间",
    span: 6,
  },
];

const columns: TableColumn[] = [
  { prop: "date", label: "创建日期", width: 150, sortable: true },
  { prop: "name", label: "商品名称", width: 120 },
  { prop: "state", label: "状态", width: 120 },
  { prop: "city", label: "城市", width: 120 },
  { prop: "address", label: "详细地址", minWidth: 200 },
  { prop: "zip", label: "邮编", width: 120 },
  { label: "操作", width: 180, slot: "actions", fixed: "right" },
];

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(1000);

// 操作方法
const handleSearch = (form: any) => {
  console.log("Search:", form);
};

const handleDetail = (row: any) => {
  console.log("Detail:", row);
};

const handleEdit = (row: any) => {
  console.log("Edit:", row);
};
</script>

<style scoped>
:deep(.el-card__header) {
  @apply border-b border-gray-200 !py-3;
}

:deep(.el-table) {
  @apply border border-gray-200 rounded-lg overflow-hidden;

  th {
    @apply bg-gray-50 !text-gray-600 font-medium;
  }

  td {
    @apply !py-3;
  }
}

:deep(.el-pagination) {
  @apply justify-end;

  .btn-prev,
  .btn-next {
    @apply border border-gray-300 rounded-md;
  }

  .number {
    @apply border border-gray-300 rounded-md;
  }

  .active {
  }
}
</style>
