<template>
  <div>
    <el-card class="!border-0 !shadow-card hover:!shadow-card-hover">
      <template #header>
        <div class="card-header px-4 py-6 bg-gray-50">
          <search-form :fields="searchFields" @submit="handleSearch" />
          <h2 class="text-xl font-semibold text-primary-600 flex items-center justify-between">
            小册管理
            <div>
              <el-button color="#626aef" @click="onOpen">新增小册</el-button>
            </div>
          </h2>
        </div>
      </template>

      <div class="mt-4 px-4">
        <data-table :columns="columns" :data="tableData" :loading="loading">
          <template #status="{ row }">
            <el-tag :type="statusType[row.status]">
              {{ statusMap[row.status] }}
            </el-tag>
          </template>
          <template #actions="{ row }">
            <el-button link type="primary" size="small" @click.stop="handleChapter(row)">
              详情
            </el-button>
            <el-button link type="warning" size="small" @click.stop="handleEdit(row)">
              编辑
            </el-button>
            <el-button link type="danger" size="small" @click.stop="handleDelete(row)">
              删除
            </el-button>
          </template>
        </data-table>
      </div>

      <div class="mt-6 px-4 pb-4">
        <pagination v-model:current-page="tablePageData.currentPage" v-model:page-size="tablePageData.pageSize"
          :total="tablePageData.total" />
      </div>
    </el-card>

    <!-- 小册编辑对话框 -->
    <dialog-component :title="`${currentBooklet?.booklet_id ? '编辑' : '新增'}小册`" v-model="dialogFormVisible" :footer="false"
      width="800px">
      <dialog-form-component v-model="formData" :fields="formFields" :rules="formRules" @ok="handleOk" ref="formRef" />
    </dialog-component>
  </div>
</template>

<script setup lang="ts">
import { h, onMounted, reactive, ref } from "vue";
import type { SearchField } from "../../components/searchForm/types";
import SearchForm from "../../components/searchForm/SearchForm.vue";
import DataTable from "../../components/tableComponent/TableComponent.vue";
import useVisiblehooks from "../../hooks/useVisblehooks";
import DialogComponent from "../../components/dialogCompoennt/DialogCompoennt.vue";
import DialogFormComponent from "../../components/dialogCompoennt/DialogFormComponent.vue";
import { ElMessage, ElTag } from "element-plus";
import bookletService from "./service";
import type { BookletItem } from "./types";

const {
  getBookletList,
  createBooklet,
  deleteBooklet,
  tableData,
  tablePageData
} = bookletService();

const { dialogFormVisible, onOk, onOpen, formRef } = useVisiblehooks();
const currentBooklet = ref<BookletItem>();
const loading = ref(false);

// 状态映射
const statusMap = {
  draft: '草稿',
  published: '已发布',
  archived: '已归档'
};

const statusType:any = {
  draft: 'info',
  published: 'success',
  archived: 'warning'
};

// 表单数据
const formData = reactive<Partial<BookletItem>>({
  title: '',
  description: '',
  cover_image: '',
  price: 0,
  status: 'draft',
});

// 表单字段配置
const formFields = ref([
  {
    type: "input",
    prop: "title",
    label: "小册标题",
    attrs: {
      placeholder: "请输入小册标题",
      clearable: true,
    },
  },
  {
    type: "textarea",
    prop: "description",
    label: "小册描述",
    attrs: {
      placeholder: "请输入详细描述",
      rows: 4,
    },
  },
  {
    type: "upload",
    prop: "cover_image",
    label: "封面图片",
    attrs: {
      accept: "image/*",
      listType: "picture-card",
      tip: "建议尺寸：800x600px，支持PNG/JPG格式",
      multiple: false,
      beforeUpload: (file: File) => {
        const isImage = ["image/jpeg", "image/png"].includes(file.type);
        if (!isImage) {
          ElMessage.error("只能上传图片文件!");
          return false;
        }
        return true;
      },
    },
  },
  {
    type: "input-number",
    prop: "price",
    label: "价格（元）",
    attrs: {
      min: 0,
      precision: 2,
      controlsPosition: "right",
    },
  },
  {
    type: "select",
    prop: "status",
    label: "状态",
    options: [
      { label: '草稿', value: 'draft' },
      { label: '已发布', value: 'published' },
      { label: '已归档', value: 'archived' }
    ]
  }
]);

// 表单验证规则
const formRules = {
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
  description: [{ required: true, message: "描述不能为空", trigger: "blur" }],
  price: [{ required: true, message: "价格不能为空", trigger: "blur" }]
};

// 表格列配置
const columns = [
  {
    prop: "title",
    label: "标题",
    width: 200
  },
  {
    prop: "description",
    label: "描述",
    formatter: (row: BookletItem) => {
      return row.description.length > 30 ?
        row.description.slice(0, 30) + "..." :
        row.description;
    }
  },
  {
    prop: "cover_image",
    label: "封面",
    formatter: (row: BookletItem) => {
      return h('img', {
        class: 'h-20 object-cover rounded',
        src: row.cover_image,
        alt: row.title
      });
    }
  },
  {
    prop: "price",
    label: "价格",
  },
  {
    prop: "status",
    label: "状态",
    slot: "status"
  },
  {
    label: "操作",
    width: 200,
    slot: "actions",
    fixed: "right"
  }
];

// 搜索字段
const searchFields: SearchField[] = [
  {
    type: "input",
    prop: "title",
    label: "标题",
    placeholder: "请输入小册标题",
    span: 6,
  },
  {
    type: "select",
    prop: "status",
    label: "状态",
    placeholder: "请选择状态",
    options: Object.entries(statusMap).map(([value, label]) => ({ label, value })),
    span: 6,
  }
];

// 初始化加载
onMounted(() => {
  loadData();
});

const loadData = async () => {
  loading.value = true;
  try {
    await getBookletList({
      page: tablePageData.currentPage,
      pageSize: tablePageData.pageSize
    });
  } finally {
    loading.value = false;
  }
};

// 提交表单
const handleOk = async () => {
  try {
    await formRef.value?.validate();
    loading.value = true;

    // const api = currentBooklet.value?.booklet_id ? 
    //   updateBooklet : 
    //   createBooklet;
    let params:any = {
      ...formData,
      cover_image: formData.cover_image?.[0]?.url || ''
    }
    await createBooklet(params)

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
  console.log('搜索条件:', formData); 
}
// 编辑
const handleEdit = (row: BookletItem) => {
  currentBooklet.value = row;
  Object.assign(formData, row);
  onOpen();
};

// 删除
const handleDelete = async (row: BookletItem) => {
  try {
    await deleteBooklet(row.booklet_id!);
    ElMessage.success("删除成功");
    loadData();
  } catch (error) {
    ElMessage.error("删除失败");
  }
};

// 章节管理
const handleChapter = (row: BookletItem) => {
  // 跳转到章节管理页面
  console.log('打开章节管理:', row.booklet_id);
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
