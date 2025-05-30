<template>
  <div>
    <el-card class="!border-0 !shadow-card hover:!shadow-card-hover">
      <template #header>
        <div class="card-header px-4 py-6 bg-gray-50">
          <search-form :fields="searchFields" @submit="handleSearch" />
          <h2
            class="text-xl font-semibold text-primary-600 flex items-center justify-between"
          >
            小册章节管理
            <div>
              <el-button color="#626aef" @click="onOpen"
                >新增小册章节</el-button
              >
            </div>
          </h2>
        </div>
      </template>

      <div class="mt-4 px-4">
        <data-table :columns="columns" :data="ChapterData" :loading="loading">
          <template #actions="{ row }">
            <el-button
              link
              type="primary"
              size="small"
              @click.stop="handleChapter(row)"
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
              @click.stop="handleDelete(row)"
            >
              删除
            </el-button>
          </template>
        </data-table>
      </div>

      <div class="mt-6 px-4 pb-4">
        <pagination
          v-model:current-page="tablePageData.currentPage"
          v-model:page-size="tablePageData.pageSize"
          :total="tablePageData.total"
        />
      </div>
    </el-card>

    <!-- 小册编辑对话框 -->
    <dialog-component
      :title="`${currentBooklet?.booklet_id ? '编辑' : '新增'}小册章节`"
      v-model="dialogFormVisible"
      :footer="false"
      width="800px"
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
import { onMounted, reactive, ref } from "vue";
import type { SearchField } from "../../components/searchForm/types";
import SearchForm from "../../components/searchForm/SearchForm.vue";
import DataTable from "../../components/tableComponent/TableComponent.vue";
import useVisiblehooks from "../../hooks/useVisblehooks";
import DialogComponent from "../../components/dialogCompoennt/DialogCompoennt.vue";
import DialogFormComponent from "../../components/dialogCompoennt/DialogFormComponent.vue";
import { ElMessage } from "element-plus";
import bookletService from "./service";
import bookletChapterService from "./bookletChapter";
import type { BookletItem } from "./types";

const { getBookletList, tableData } = bookletService();

const {
  getBookletsChapter,
  addBookletChapter,
  deleteBookletChapter,
  ChapterData,
  tablePageData,
} = bookletChapterService();

const { dialogFormVisible, onOk, onOpen, formRef } = useVisiblehooks();
const currentBooklet = ref<BookletItem>();
const loading = ref(false);
const bookletList = ref<{ label: string; value: string }[]>([]);
// 状态映射

// 表单数据
const formData = reactive<Partial<BookletItem>>({
  title: "",
  description: "",
  cover_image: "",
  price: 0,
  status: "draft",
});

// 表单字段配置
const formFields: any = ref([
  {
    type: "select",
    prop: "booklet_id",
    label: "所属小册",
    attrs: {
      placeholder: "请选择所属小册",
      clearable: true,
    },
    options: bookletList,
  },
  {
    type: "input",
    prop: "title",
    label: "标题",
    attrs: {
      placeholder: "请输入标题",
      clearable: true,
    },
  },
  {
    type: "input-number",
    prop: "order",
    label: "序号",
    attrs: {
      placeholder: "请输入序号",
      clearable: true,
    },
  },
  {
    type: "select",
    prop: "is_free",
    label: "是否免费",
    attrs: {
      placeholder: "请选择是否免费",
      clearable: true,
    },
    options: [
      { label: "是", value: true },
      { label: "否", value: false },
    ],
  },
]);

// 表单验证规则
const formRules = {
  booklet_id: [
    { required: true, message: "所属小册不能为空", trigger: "blur" },
  ],
  order: [{ required: true, message: "序号不能为空", trigger: "blur" }],
  is_free: [{ required: true, message: "是否免费不能为空", trigger: "blur" }],
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
};

// 表格列配置
const columns = [
  {
    prop: "booklet_id",
    label: "所属小册",
    width: 200,
  },
  {
    prop: "title",
    label: "章节标题",
  },
  {
    prop: "order",
    label: "序号",
  },
  {
    prop: "is_free",
    label: "是否免费",
  },
  {
    label: "操作",
    width: 200,
    slot: "actions",
    fixed: "right",
  },
];

// 搜索字段
const searchFields: SearchField[] = [
  {
    type: "input",
    prop: "title",
    label: "标题",
    placeholder: "请输入章节标题",
    span: 6,
  },
];

// 初始化加载
onMounted(() => {
  loadData();
});

const loadData = async () => {
  loading.value = true;
  try {
    await getBookletList();
    await getBookletsChapter();
    bookletList.value = tableData.value.map((item: any) => ({
      label: item.title,
      value: item.booklet_id,
    }));
  } finally {
    loading.value = false;
  }
};

// 提交表单
const handleOk = async () => {
  try {
    await formRef.value?.validate();
    loading.value = true;
    let params: any = {
      ...formData,
    };
    await addBookletChapter(params);

    ElMessage.success("操作成功");
    loadData();
    onOk();
  } catch (error) {
    ElMessage.error("操作失败");
  } finally {
    loading.value = false;
  }
};
const handleSearch = async (formData: any) => {
  console.log("搜索条件:", formData);
};
// 编辑
const handleEdit = (row: BookletItem) => {
  currentBooklet.value = row;
  Object.assign(formData, row);
  onOpen();
};

// 删除
const handleDelete = async (row: BookletItem) => {
  try {
    await deleteBookletChapter(row.booklet_id!);
    ElMessage.success("删除成功");
    loadData();
  } catch (error) {
    ElMessage.error("删除失败");
  }
};

// 章节管理
const handleChapter = (row: BookletItem) => {
  // 跳转到章节管理页面
  console.log("打开章节管理:", row.booklet_id);
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
</style>
