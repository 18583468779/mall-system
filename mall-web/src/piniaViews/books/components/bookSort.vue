<template></template>

<script setup lang="ts">
import { ref } from "vue";
import Books from "../service";
</script>

<style scoped>
.el-radio-group :deep(.el-radio-button__inner) {
  @apply px-4;
}

.el-dropdown {
  @apply ml-2;
}
</style>
