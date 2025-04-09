<template>
  <header class="h-16 border-b flex items-center px-6">
    <div class="flex-1 h-full">
      <div class="h-full flex items-center">
        <div
          class="p-2 cursor-pointer hover:bg-[#4a4aff11] w-8 transition-all"
          @click="setMenuCollapse"
        >
          <el-icon
            ><Expand color="gray" v-show="menuCollapse" />
            <Fold v-show="!menuCollapse" />
          </el-icon>
        </div>
      </div>
    </div>
    <el-dropdown>
      <span class="flex items-center">
        <el-avatar :size="32" src="https://example.com/avatar.png" />
        <span class="ml-2">管理员</span>
      </span>
    </el-dropdown>
  </header>
</template>

<script setup lang="ts">
import layoutService from "../../layout/service";
const { menuStoreRefs, setMenuCollapse } = layoutService;
const { menuCollapse } = menuStoreRefs;
</script>

<style scoped></style>
