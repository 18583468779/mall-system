<template>
  <div v-if="props.data && props.data.length === 0">
    <el-empty :image-size="200" description="暂无数据" />
  </div>
  <el-table
    v-else
    v-bind="$attrs"
    :data="props.data"
    :loading="props.loading"
    row-key="id"
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
  </el-table>
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
