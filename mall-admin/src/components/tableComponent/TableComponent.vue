<template>
  <!-- <el-table
    v-bind="$attrs"
    :data="props.data"
    :loading="props.loading"
    highlight-current-row
    @row-click="handleRowClick"
  >
    <template v-for="col in props.columns" :key="col.prop || col.label">
      <el-table-column v-bind="col">
        <template v-if="col.slot" #default="scope">
          <slot :name="col.slot" :row="scope.row" />
        </template>
      </el-table-column>
    </template>
  </el-table> -->
  1
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { TableProps } from "./types";

const props = defineProps<TableProps>();

const emit = defineEmits<{
  (e: "row-click", row: any): void;
}>();

const handleRowClick = (row: any) => {
  emit("row-click", row);
};
</script>
