<template>
  <div>
    <el-form
      :model="modelValue"
      :label-width="labelWidth"
      :rules="rules"
      ref="formRef"
    >
      <div v-for="(field, index) in fields" :key="index">
        <el-form-item :prop="field.prop" :label="field.label">
          <!-- 上传组件特殊处理 -->
          <template v-if="field.type === 'upload'">
            <el-upload
              v-model:file-list="modelValue[field.prop]"
              v-bind="field.attrs"
              :http-request="(opt: any) => customUpload(opt, field)"
              v-on="field.listeners || {}"
              class="w-full"
            >
              <template #trigger>
                <el-button type="primary" v-if="!field.attrs?.listType"
                  >选择文件</el-button
                >
                <el-icon v-else>
                  <Plus />
                </el-icon>
              </template>
              <template #tip>
                <div class="text-gray-400 text-xs mt-1">
                  {{ field.attrs?.tip || "支持扩展名：.png/.jpg/.zip" }}
                </div>
              </template>
            </el-upload>
          </template>

          <!-- 富文本编辑器 -->
          <template v-else-if="field.type === 'slot'">
            <RichEditor
              v-model="modelValue[field.prop]"
              class="min-h-[400px]"
            />
          </template>
          <!-- 其他组件 -->

          <component
            v-else
            :is="getComponent(field.type)"
            v-model="modelValue[field.prop]"
            v-bind="field.attrs"
            v-on="field.listeners || {}"
            :type="field.type === 'textarea' ? 'textarea' : 'text'"
          >
            <template v-if="field.type === 'select'">
              <el-option
                v-for="opt in field.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </template>
          </component>
        </el-form-item>
      </div>
      <div class="flex justify-end">
        <el-button type="primary" color="#626aef" @click="onOk">确认</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { ref } from "vue";
import RichEditor from "../richEditor/RichEditor.vue";
import request from "../../utils/axiosUtil";
import type { UploadRequestOptions } from "element-plus/es/components/upload/src/upload";

type FormFieldType =
  | "input"
  | "select"
  | "date"
  | "radio"
  | "checkbox"
  | "treeSelect"
  | "upload"
  | "textarea"
  | "slot";

export interface FormField {
  type: FormFieldType;
  prop: string;
  label: string;
  slot?: HTMLElement;
  attrs?: Record<string, any>;
  options?: Record<string, any>[];
  listeners?: Record<string, any>;
}

withDefaults(
  defineProps<{
    fields: FormField[];
    rules?: FormRules;
    labelWidth?: string;
  }>(),
  {
    labelWidth: "120px",
    rules: () => ({}),
  }
);

const emit = defineEmits(["ok"]);
const formRef = ref<FormInstance>();
const modelValue = defineModel<Record<string, any>>({ required: true });

const onOk = () => emit("ok", modelValue.value);

const customUpload = async (
  options: UploadRequestOptions,
  field: FormField
) => {
  try {
    // 1. 获取预签名URL
    const presignedRes: any = await request.post(
      "filemodule/generatePresignedUrl",
      false,
      {
        fileName: options.file.name,
        fileType: options.file.type,
      }
    );
    const url = presignedRes.data.presignedUrl;

    if (presignedRes.code === 200) {
      // 2. 上传到MinIO
      await request.put(
        url,
        false,
        options.file,
        {
          headers: { "Content-Type": options.file.type },
        },
        true
      );
      const urlObj = new URL(url);
      const baseUrlObj = `${urlObj.origin}${urlObj.pathname}`;
      // 3. 构建文件项
      const fileItem = {
        uid: options.file.uid, // 必须包含uid
        name: options.file.name,
        url: baseUrlObj,
        type: options.file.type,
        status: "success" as const,
      };

      // 4. 更新文件列表（处理多文件）
      const currentFiles = Array.isArray(modelValue.value[field.prop])
        ? [...modelValue.value[field.prop]]
        : [];

      modelValue.value[field.prop] = [
        ...currentFiles.filter((f) => f.uid !== fileItem.uid), // 去重
        fileItem,
      ];

      // 5. 触发成功回调
      options.onSuccess({
        code: 200,
        data: { url: fileItem.url, name: fileItem.name },
      });
    }
  } catch (error: any) {
    options.onError(error);
    ElMessage.error("文件上传失败");
  }
};

const componentMap: Partial<Record<FormFieldType, any>> = {
  input: "el-input",
  select: "el-select",
  date: "el-date-picker",
  checkbox: "el-checkbox-group",
  radio: "el-radio-group",
  treeSelect: "el-tree-select",
  upload: "el-upload",
  textarea: "el-input",
};

const getComponent = (type: FormFieldType) => componentMap[type] || "el-input";

defineExpose({
  value: modelValue,
  validate: () =>
    new Promise((resolve, reject) => {
      formRef.value?.validate((valid) =>
        valid ? resolve(true) : reject(new Error("表单验证失败"))
      );
    }),
  resetFields: () => formRef.value?.resetFields(),
});
</script>
