<template>
  <el-menu
    class="h-full w-64 border-r"
    default-active="dashboard"
    router
    active-text-color="#646cff"
  >
    <div class="h-16 flex items-center justify-center">
      <span class="text-[18px] font-bold text-[#4a4aff]"
        >代码小库后台管理系统</span
      >
    </div>

    <template v-for="route in menuRoutes" :key="route.path">
      <el-menu-item :index="route.path">
        <el-icon>
          <component :is="route.meta.icon" />
        </el-icon>
        <span>{{ route.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const menuRoutes: any = computed(() => {
  return (
    router.options.routes
      .find((r) => r.path === "/")
      ?.children?.filter((r) => r.meta?.showInMenu !== false) || []
  );
});
</script>

<style scoped></style>
