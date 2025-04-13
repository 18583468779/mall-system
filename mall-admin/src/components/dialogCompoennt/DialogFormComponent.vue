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
              v-on="field.listeners || {}"
              class="w-full"
            >
              <template #trigger>
                <el-button type="primary" v-if="!field.attrs?.listType"
                  >选择文件</el-button
                >
                <el-icon v-else><Plus /></el-icon>
              </template>
              <template #tip>
                <div class="text-gray-400 text-xs mt-1">
                  {{ field.attrs?.tip || "支持扩展名：.png/.jpg/.zip" }}
                </div>
              </template>
            </el-upload>
          </template>

          <component
            v-else
            :is="getComponent(field.type)"
            v-model="modelValue[field.prop]"
            v-bind="field.attrs"
            v-on="field.listeners || {}"
          >
            <!-- 下拉选项 -->
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
        <el-button type="primary" color="#626aef" @click="onOk">
          确认
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { type FormInstance, type FormRules } from "element-plus";
import { ref } from "vue";

type FormFieldType =
  | "input"
  | "select"
  | "date"
  | "radio"
  | "checkbox"
  | "treeSelect"
  | "upload";

export interface FormField {
  type: FormFieldType; // 表单类型
  prop: string; // 表单属性
  label: string; // 表单标签
  attrs?: Record<string, any>; // 表单属性
  options?: Record<string, any>[]; // 表单选项
  listeners?: Record<string, any>; // 表单事件
}

withDefaults(
  defineProps<{
    fields: FormField[]; // 表单字段
    rules?: FormRules; // 表单验证规则
    labelWidth?: string; // label 宽度
  }>(),
  {
    labelWidth: "120px",
    rules: () => ({}),
  }
);

const emit = defineEmits(["ok"]);
const onOk = () => {
  emit("ok", modelValue);
};
const formRef = ref<FormInstance>();
const modelValue: Record<string, any> = defineModel();

const componentMap: Record<FormFieldType, any> = {
  input: "el-input",
  select: "el-select",
  date: "el-date-picker",
  checkbox: "el-checkbox-group",
  radio: "el-radio-group",
  treeSelect: "el-tree-select",
  upload: "el-upload",
};
const getComponent = (type: FormFieldType) => {
  return componentMap[type] || "el-input";
};

// 暴露表单验证方法
defineExpose({
  value: modelValue,
  validate: () => {
    return new Promise((resolve, reject) => {
      formRef.value?.validate((valid: boolean) => {
        valid ? resolve(true) : reject(new Error("表单验证失败"));
      });
    });
  },
  resetFields: () => formRef.value?.resetFields(),
});
</script>

<style scoped></style>
