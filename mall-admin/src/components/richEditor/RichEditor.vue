<!-- components/RichEditor/RichEditor.vue -->
<template>
  <div class="rich-editor">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
      class="toolbar"
    />
    <Editor
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      class="editor-content"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onBeforeUnmount } from "vue";
// @ts-ignore
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import type { IDomEditor } from "@wangeditor/editor";
import request from "../../utils/axiosUtil";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const editorRef = shallowRef<IDomEditor | null>(null);
const valueHtml = ref(props.modelValue);

// MinIO上传核心方法
const uploadImageToMinIO = async (file: File) => {
  try {
    // 获取预签名URL
    const presignedRes = await request.post(
      "filemodule/generatePresignedUrl",
      false,
      {
        fileName: file.name,
        fileType: file.type,
      }
    );

    // 上传到MinIO
    await request.put(
      presignedRes.data.presignedUrl,
      false,
      file,
      {
        headers: { "Content-Type": file.type },
      },
      true
    );

    // 返回可直接访问的URL
    const urlObj = new URL(presignedRes.data.presignedUrl);
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch (error) {
    console.error("图片上传失败:", error);
    throw new Error("图片上传失败，请检查控制台日志");
  }
};

// 工具栏配置（强制使用上传功能）
const toolbarConfig: Partial<any> = {
  toolbarKeys: [
    "bold",
    "italic",
    "underline",
    "color",
    "bgColor",
    "|",
    "fontSize",
    "fontFamily",
    "lineHeight",
    "|",
    "bulletedList",
    "numberedList",
    "todo",
    "|",
    "emotion",
    "insertLink",
    {
      key: "insertImage",
      menuKeys: ["uploadImage"], // 强制显示上传菜单
    },
    "insertTable",
    "codeBlock",
    "|",
    "undo",
    "redo",
  ],
};

// 编辑器配置（完全自定义上传）
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      // 禁用默认行为
      server: "",
      // 自定义上传逻辑
      customUpload: async (file: File, insertFn: (url: string) => void) => {
        try {
          const url = await uploadImageToMinIO(file);
          insertFn(url);
        } catch (error) {
          console.error("图片插入失败:", error);
        }
      },
      // 允许的文件类型
      allowedFileTypes: ["image/jpeg", "image/png", "image/gif"],
      // 最大文件大小（5MB）
      maxFileSize: 5 * 1024 * 1024,
      // 隐藏网络图片选项
      showLinkImage: false,
      // 隐藏网络图片选项卡
      showLinkImageAlt: false,
    },
    codeBlock: {
      codeSelectLanguages: [
        { text: "JavaScript", value: "javascript" },
        { text: "TypeScript", value: "typescript" },
        { text: "HTML", value: "html" },
        { text: "CSS", value: "css" },
      ],
    },
  },
};

// 初始化编辑器
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor;

  // 强制隐藏网络图片选项
  const menuConfig = editor.getMenuConfig("insertImage");
  menuConfig.showLinkImage = false;
};

// 数据同步
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== valueHtml.value && editorRef.value) {
      editorRef.value.setHtml(newVal);
    }
  }
);

watch(valueHtml, (newVal) => {
  emit("update:modelValue", newVal);
});

// 组件销毁时清理
onBeforeUnmount(() => {
  if (editorRef.value) {
    editorRef.value.destroy();
    editorRef.value = null;
  }
});
</script>

<style lang="scss">
@import "@wangeditor/editor/dist/css/style.css";

.rich-editor {
  @apply border rounded-lg overflow-hidden;

  .toolbar {
    @apply border-b border-gray-200 bg-gray-100 p-1 flex flex-wrap gap-1;

    .w-e-bar-item {
      button {
        @apply h-8 w-8 hover:bg-gray-200 rounded;
      }
    }

    // 强制显示上传按钮
    .w-e-menu-tooltip {
      .w-e-upoad-container {
        position: relative;
        input[type="file"] {
          @apply absolute inset-0 w-full h-full opacity-0 cursor-pointer;
        }
      }
    }
  }

  .editor-content {
    @apply min-h-[400px] p-4 overflow-auto;

    .w-e-text-container {
      [data-slate-editor] {
        @apply min-h-[380px] max-w-none;
      }
    }

    .w-e-code-block {
      @apply bg-gray-800 text-gray-100 p-4 rounded overflow-auto;
    }
  }
}
</style>
