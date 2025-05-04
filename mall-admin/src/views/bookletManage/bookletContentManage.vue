<template>
  <div>
    <el-card class="!border-0 !shadow-card hover:!shadow-card-hover">
      <template #header>
        <div class="card-header px-4 py-6 bg-gray-50">
          <search-form :fields="searchFields" @submit="handleSearch" />
          <h2
            class="text-xl font-semibold text-primary-600 flex items-center justify-between"
          >
            小册内容管理
            <div>
              <el-button color="#626aef" @click="onOpen"
                >新增小册内容</el-button
              >
            </div>
          </h2>
        </div>
      </template>

      <div class="mt-4 px-4">
        <data-table :columns="columns" :data="contentData" :loading="loading">
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
import bookletChapterService from "./bookletChapter";
import bookletContentService from "./bookletContent";
import type { BookletItem } from "./types";

const { getBookletsChapter, ChapterData } = bookletChapterService();
const {
  deleteBookletContent,
  contentData,
  tablePageData,
  addBookletContent,
  getBookletContent,
} = bookletContentService();

const { dialogFormVisible, onOk, onOpen, formRef } = useVisiblehooks();
const currentBooklet = ref<BookletItem>();
const loading = ref(false);
const bookletList = ref<{ label: string; value: string }[]>([]);
// 状态映射

// 表单数据
const formData = reactive<Partial<any>>({
  chapter_id: "",
  content: "",
});

// 表单字段配置
const formFields: any = ref([
  {
    type: "select",
    prop: "chapter_id",
    label: "所属章节",
    attrs: {
      placeholder: "请选择所属章节",
      clearable: true,
    },
    options: bookletList,
  },
  {
    type: "slot",
    prop: "content",
    label: "内容",
  },
]);

// 表单验证规则
const formRules = {
  chapter_id: [
    { required: true, message: "所属内容不能为空", trigger: "blur" },
  ],
  content: [{ required: true, message: "内容不能为空", trigger: "blur" }],
};

// 表格列配置
const columns = [
  {
    prop: "chapter_id",
    label: "所属章节",
    width: 200,
  },
  {
    prop: "content",
    label: "内容",
    formatter: (row: any) => {
      return row.content.length > 300
        ? row.content.slice(0, 300) + "..."
        : row.content;
    },
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
    placeholder: "请输入标题",
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
    await getBookletsChapter({
      page: tablePageData.currentPage,
      pageSize: tablePageData.pageSize,
    });
    await getBookletContent({
      page: tablePageData.currentPage,
      pageSize: tablePageData.pageSize,
    });
    bookletList.value = ChapterData.value.map((item: any) => ({
      label: item.title,
      value: item.chapter_id,
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
    await addBookletContent(params);

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
    await deleteBookletContent(row.booklet_id!);
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
