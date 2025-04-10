<template>
  <el-menu
    class="h-full w-64 border-r"
    :default-active="routes.fullPath"
    router
    active-text-color="#646cff"
    :collapse="menuCollapse"
  >
    <div
      class="h-16 flex gap-2 items-center justify-center text-[18px] font-bold text-[#4a4aff]"
    >
      <span class="text-[24px]">D</span>
      <span v-show="!menuCollapse">代码小库后台管理系统</span>
    </div>

    <template v-for="route in menuRoutes" :key="route.path">
      <el-sub-menu :index="route.path" v-if="route.meta.isSubMenu">
        <template #title>
          <el-icon>
            <component :is="route.meta.icon" />
          </el-icon>
          <span>{{ route.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="child in route.children"
          :key="child.name"
          :index="child.path"
        >
          <el-icon>
            <component :is="child.meta.icon" />
          </el-icon>
          <span>{{ child.meta.title }}</span>
        </el-menu-item>
      </el-sub-menu>

      <el-menu-item :index="route.path" v-else>
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
import { useRouter,useRoute } from "vue-router";
import layoutService from "../../layout/service";
const { menuStoreRefs } = layoutService;
const { menuCollapse } = menuStoreRefs;
const router = useRouter();
const routes = useRoute();


console.log('r',)
const menuRoutes: any = computed(() => {
  return (
    router.options.routes
      .find((r) => r.path === "/")
      ?.children?.filter((r) => r.meta?.showInMenu !== false) || []
  );
});
</script>

<style scoped></style>
