<template>
  <el-form
    :inline="true"
    :model="formModel"
    class="gap-4 mb-7 demo-form-inline"
  >
    <template :key="field.prop" v-for="field in fields">
      <el-form-item :label="field.label" class="!mr-4 !mb-0">
        <component
          :is="getComponent(field.type)"
          v-model="formModel[field.prop]"
          v-bind="field.props"
          :placeholder="field.placeholder"
          clearable
          class="w-48"
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
    </template>

    <el-form-item class="!mr-0 !mb-0">
      <el-button color="#626aef" @click="handleSubmit">查询</el-button>
      <el-button @click="console.log(11)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type SearchField } from "./types";

defineProps<{
  fields: SearchField[];
}>();

const emit = defineEmits(["submit"]);

const formModel = ref<Record<string, any>>({});

const getComponent = (type: string) => {
  const componentMap: Record<string, any> = {
    input: "el-input",
    select: "el-select",
    date: "el-date-picker",
  };

  return componentMap[type] || "ElInput";
};

const handleSubmit = () => {
  emit("submit", formModel.value);
};
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
