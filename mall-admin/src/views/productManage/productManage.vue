<template>
  <div>
    <el-card class="!border-0 !shadow-card hover:!shadow-card-hover">
      <!-- 卡片头部 -->
      <template #header>
        <div class="card-header px-4 py-6 bg-gray-50">
          <!-- 搜索表单 -->
          <search-form :fields="searchFields" @submit="handleSearch" />
          <h2 class="text-xl font-semibold text-primary-600 flex items-center justify-between">
            <slot name="title">商品管理</slot>
            <div>
              <el-button color="#626aef" @click="onOpen">新增</el-button>
            </div>
          </h2>
        </div>
      </template>

      <!-- 数据表格 -->
      <div class="mt-4 px-4">
        <data-table :columns="columns" :data="tableData" :loading="loading">
          <template #actions="{ row }">
            <el-button link type="warning" size="small" @click.stop="handleEdit(row)">
              编辑
            </el-button>
            <el-button link type="danger" size="small" @click.stop="handleDelete(row)">
              删除
            </el-button>
          </template>
        </data-table>
      </div>

      <!-- 分页 -->
      <div class="mt-6 px-4 pb-4">
        <pagination
          v-model:current-page="tablePageData.currentPage"
          v-model:page-size="tablePageData.totalPages"
          :total="tablePageData.total"
        />
      </div>
    </el-card>
    <dialog-component title="新增商品" v-model="dialogFormVisible" :footer="false">
      <dialog-form-component v-model="formData" :fields="formFields" :rules="formRules" @ok="handleOk" ref="formRef" />
    </dialog-component>
  </div>
</template>

<script setup lang="ts">
import { computed, h, reactive, ref } from "vue";
import type { SearchField } from "../../components/searchForm/types";
import SearchForm from "../../components/searchForm/SearchForm.vue";
import DataTable from "../../components/tableComponent/TableComponent.vue";
import useVisiblehooks from "../../hooks/useVisblehooks";
import DialogComponent from "../../components/dialogCompoennt/DialogCompoennt.vue";
import DialogFormComponent from "../../components/dialogCompoennt/DialogFormComponent.vue";
import { ElIcon, ElImage, ElLink, ElMessage } from "element-plus";
import ctgyService from "../ctgyManage/service";
import service from "./service";
import useUserStore from "../../store/useUserStore";
import { Document } from '@element-plus/icons-vue'
import { onMounted } from "vue";
const userStore = useUserStore();
const {
  init,
  allCtgys,
  handleCtgys,
} = ctgyService;
const { saveBooks,getTableData,tableData,tablePageData ,deleteBooks} = service;
const { dialogFormVisible, onOk, onOpen, formRef } = useVisiblehooks();
onMounted(() => {
  init();
  getTableData();
});
const loading = ref(false);
const formData: any = reactive({
  name: "",
  category: "",
  bookpicname: [], // 初始化为数组
  code: [],        // 初始化为数组
});
const formFields: any = ref([
  {
    type: "input",
    prop: "name",
    label: "商品名称",
    attrs: {
      placeholder: "请输入商品名称",
      clearable: true,
    },
  },
  {
    type: "treeSelect",
    prop: "category",
    label: "分类",
    attrs: computed(() => ({
      placeholder: "请选择分类",
      data: allCtgys.value, // 使用计算属性保持响应式
      clearable: true,
    })),
  },

  {
    type: "input",
    prop: "originalprice",
    label: "原价",
    attrs: {
      placeholder: "请输入原价",
      clearable: true,
    },
  },
  {
    type: "input",
    prop: "discount",
    label: "折扣",
    attrs: {
      placeholder: "请输入折扣",
      clearable: true,
    },
  },
  {
    type: "upload",
    prop: "imageUrlList",
    label: "商品封面",
    attrs: {
      accept: ".png,.jpg,.jpeg",
      listType: "picture-card",
      tip: "建议尺寸：800x800px，支持PNG/JPG格式",
      multiple: false, // 明确单文件
      beforeUpload: (file: File) => {
        const isImage = ["image/jpeg", "image/png"].includes(file.type);
        if (!isImage) {
          ElMessage.error("只能上传图片文件!");
          return false;
        }
        return true;
      },
    },
    listeners: {
      "on-success": (res: any) => {
        console.log("上传成功", res);
      },
    },
  },
  {
    type: "upload",
    prop: "attachmentUrlList",
    label: "源码附件",
    attrs: {
      accept: ".zip,.rar",
      multiple: true,
      tip: "文件大小不超过50MB",
      beforeUpload: (file: File) => {
        const isZip = [
          "application/x-zip-compressed",
          "application/x-rar-compressed",
        ].includes(file.type);
        if (!isZip) {
          ElMessage.error("只能上传ZIP/RAR压缩包!");
          return false;
        }
        return true;
      },
    },
  },
  {
    type: "textarea",
    prop: "description",
    label: "简介",
    attrs: {
      placeholder: "请输入简介",
      clearable: true,
    },
  },
]);

const formRules = {
  name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "change" }],
  price: [{ required: true, message: "价格不能为空", trigger: "blur" }],
  originalprice: [{ required: true, message: "原价不能为空", trigger: "blur" }],
  author: [{ required: true, message: "作者不能为空", trigger: "blur" }],
  bookpicurl: [{ required: true, message: "请上传商品封面", trigger: "change" }],
  code: [{ required: true, message: "请上传源码附件", trigger: "change" }],
  description: [{ required: true, message: "简介不能为空", trigger: "blur" }],
};
const handleOk = async () => {
  try {
    // 1. 执行表单验证
    await formRef.value?.validate();
    loading.value = true;
    const { id } = handleCtgys(formRef.value.value.category);
    let params = {
      bookname: formRef.value.value.name,
      author: userStore.userInfo.username,
      thirdctgyid: Number(id),
      originalprice: formRef.value.value.originalprice,
      discount: formRef.value.value.discount,
      imageUrlList: handleDealFile(formRef.value.value.imageUrlList), // 图片list
      attachmentUrlList: handleDealFile(formRef.value.value.attachmentUrlList), // 附件list
      description: formRef.value.value.description,
    }
    await saveBooks(params);

    ElMessage.success("提交成功");
    getTableData();
    formData.name = "";
    formData.category = "";
    formData.bookpicname = []; // 清空数组
    formData.code = [];        // 清空数组
    formData.price = "";
    formData.originalprice = "";
    formData.author = "";
    formData.description = "";
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

const handleDealFile = (list: any) => {
  if (!list || list.length === 0) {
    return [];
  }
  return list.map((item: any) => {
    return {
      url: item.url,
      filename: item.name,
      filetype: item.type,
    }
  })
}


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

const columns: any[] = [
  {
    prop: "bookname",
    label: "商品名称",
  }
  ,
  {
    prop: "category",
    label: "分类",
    formatter: (row: any) => {
      return row.thirdCtgy.thirdctgyname;
    }
  },
  {
    prop: "price",
    label: "价格",
    formatter: (row: any) => {
      return row.originalprice * row.discount / 10; 
    }
  },
  {
    prop: "originalprice",
    label: "原价",
  },
  {
    prop: "author",
    label: "作者",
  },
  {
    prop: "discount",
    label: "折扣",
  },
  {
  prop: "images",
  label: "封面",
  formatter: (row: any) => {
    return h('div', { class: 'flex gap-2' }, 
      row.images?.map((img: any) => 
        h(ElImage, {
          style: { width: '40px', height: '40px' },
          src: img.url,
          fit: 'cover',
          previewSrcList: [img.url],
          hideOnClickModal: true,
          previewTeleported: true
        })
      )
    )
  }
},
{
  prop: "attachments",
  label: "源码附件",
  formatter: (row: any) => {
    return h('div', { class: 'flex flex-col gap-1' }, 
      row.attachments?.map((file: any) => 
        h(ElLink, {
          type: 'primary',
          underline: false,
          href: file.url,
          target: '_blank',
          class: 'inline-flex items-center'
        }, [
          h(ElIcon, { class: 'mr-1' }, () => h(Document)),
          `${file.filename} (${file.fileType || '未知类型'})`
        ])
      )
    )
  }
},
  {
    prop: "description",
    label: "简介",
    formatter: (row: any) => {
      return row.description.length > 10 ? row.description.slice(0, 10) + "..." : row.description;
    },
  },
  { label: "操作", width: 180, slot: "actions", fixed: "right" },
];



// 操作方法
const handleSearch = (form: any) => {
  console.log("Search:", form);
};

const handleDelete = async (row: any) => {
  let res: any = await deleteBooks(row.ISBN);
  if (res.code === 200 && res.data) {
    getTableData();
    ElMessage.success("删除成功");
  }
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

}
</style>
