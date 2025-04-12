<template>
  <div>
    <el-card class="!border-0 !shadow-card hover:!shadow-card-hover">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header px-4 py-6 bg-gray-50">
          <!-- 搜索表单 -->
          <search-form :fields="searchFields" @submit="handleSearch" />
          <h2
            class="text-xl font-semibold text-primary-600 flex items-center justify-between"
          >
            <slot name="title">商品分类管理</slot>
            <div>
              <el-button color="#626aef" @click="onOpen">新增</el-button>
            </div>
          </h2>
        </div>
      </template>

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
            <el-button
              link
              type="danger"
              size="small"
              @click.stop="handleEdit(row)"
            >
              删除
            </el-button>
          </template>
        </data-table>
      </div>

      <!-- 分页 -->
      <div class="mt-6 px-4 pb-4">
        <!-- <pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
        /> -->
      </div>
    </el-card>
    <dialog-component
      title="新增分类"
      v-model="dialogFormVisible"
      :footer="false"
    >
      <dialog-form-component
        v-model="formData"
        :fields="formFields"
        :rules="formRules"
        @ok="handleOk"
        ref="formRef"
      />
    </dialog-component>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { TableColumn } from "../../components/tableComponent/types";
import type { SearchField } from "../../components/searchForm/types";
import SearchForm from "../../components/searchForm/SearchForm.vue";
import DataTable from "../../components/tableComponent/TableComponent.vue";
import useVisiblehooks from "../../hooks/useVisblehooks";
import DialogComponent from "../../components/dialogCompoennt/DialogCompoennt.vue";
import DialogFormComponent from "../../components/dialogCompoennt/DialogFormComponent.vue";
import { ElMessage } from "element-plus";
import service from "./service";
import { onMounted } from "vue";
const { init, tableData, firstSecondCtgys } = service;
const { dialogFormVisible, onOk, onOpen, formRef } = useVisiblehooks();
onMounted(() => {
  init();
});
const loading = ref(false);

const formData = reactive({
  name: "",
  category: "",
});
const formFields: any = ref([
  {
    type: "input",
    prop: "name",
    label: "分类名称",
    attrs: {
      placeholder: "请输入分类名称",
      clearable: true,
    },
  },
  {
    type: "treeSelect",
    prop: "category",
    label: "父级分类",
    attrs: computed(() => ({
      placeholder: "请选择分类",
      "check-strictly": true,
      data: firstSecondCtgys.value, // 使用计算属性保持响应式
      clearable: true,
    })),
  },
]);

const formRules = {
  name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
};
const handleOk = async () => {
  try {
    // 1. 执行表单验证
    await formRef.value?.validate();

    // 2. 显示加载状态
    loading.value = true;

    // 3. 提交数据（示例）
    console.log("Form Data:", formData);

    // 4. 处理成功
    ElMessage.success("提交成功");
    onOk(); // 关闭弹窗
  } catch (error: any) {
    // 5. 错误处理
    if (error.message === "表单验证失败") {
      ElMessage.warning("请完善表单信息");
    } else {
      ElMessage.error(`提交失败: ${error.message}`);
    }
  } finally {
    // 6. 重置加载状态
    loading.value = false;
  }
};

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
    placeholder: "请选择商品分类",
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
    placeholder: "请选择创建时间",
    span: 6,
  },
];

const columns: TableColumn[] = [
  { prop: "id", label: "分类ID" },
  { prop: "name", label: "分类名称" },
  { label: "操作", width: 180, slot: "actions", fixed: "right" },
];

// 分页数据
// const currentPage = ref(1);
// const pageSize = ref(10);
// const total = ref(1000);

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
