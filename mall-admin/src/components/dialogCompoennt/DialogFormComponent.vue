<template>
    <div>
        <el-form :model="modelValue" :label-width="labelWidth" :rules="rules" ref="formRef">
            <div v-for="(field, index) in fields" :key="index">
                <el-form-item :prop="field.prop" :label="field.label">
                    <component :is="getComponent(field.type)" v-model="modelValue[field.prop]" v-bind="field.attrs"
                        v-on="field.listeners">
                        <!-- 下拉选项 -->
                        <template v-if="field.type === 'select'">
                            <el-option v-for="opt in field.options" :key="opt.value" :label="opt.label"
                                :value="opt.value" />
                        </template>
                    </component>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ref } from "vue";

type FormFieldType = "input" | "select" | "date" | "radio" | "checkbox";

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

const formRef = ref<FormInstance>();
const modelValue: Record<string, any> = defineModel();

const componentMap: Record<FormFieldType, any> = {
    input: "el-input",
    select: "el-select",
    date: "el-date-picker",
    checkbox: "el-checkbox-group",
    radio: "el-radio-group",
};
const getComponent = (type: FormFieldType) => {
    return componentMap[type] || "el-input";
};

// 暴露表单验证方法
defineExpose({
    value: modelValue,
    validate: () => formRef.value?.validate(),
    resetFields: () => formRef.value?.resetFields()
})
</script>

<style scoped></style>
