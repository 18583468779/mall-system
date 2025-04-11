<template>
  <el-dialog v-model="model" :title="title" width="500">
    <slot></slot>
    <template #footer v-if="footer">
      <div class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onOk"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
type Props = {
  title?: string; // 标题
  footer?: boolean; // 是否显示底部按钮
};
const { title = "默认标题", footer = true } = defineProps<Props>(); // 定义属性
const model = defineModel();
const emit = defineEmits(["cancel", "ok"]); // 定义事件

function onCancel() {
  emit("cancel");
}

function onOk() {
  emit("ok");
}
</script>

<style scoped></style>
