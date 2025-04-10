<template>
    <div>
        <el-breadcrumb separator="/" class="cursor-pointer">
            <transition-group name="fade">
              <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path || index" :to="item.path">
                <template v-if="item.children">
                  <span>{{ item.name }}</span>
                </template>
                <template v-else>
                  <span>{{ item.name }}</span>
                </template>
              </el-breadcrumb-item>
            </transition-group>
          </el-breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, type RouteRecordRaw } from "vue-router";

const routes = useRoute();

const breadcrumbs = computed(() => {
  const breadcrumbs: Array<{
    name: any;
    path?: string;
    children?: RouteRecordRaw[];
  }> = [];
  routes.matched.forEach((route) => {
    if (route.path !== "/")
      if (route.meta.isSubMenu) {
        // 如果是二级菜单，返回子菜单的名称和路径
        breadcrumbs.push({ name: route.meta.title, children: route.children });
      } else {
        // 如果是一级菜单，返回菜单的名称和路径
        breadcrumbs.push({ name: route.meta.title, path: route.path });
      }
  });
  return breadcrumbs
});
</script>

<style scoped>

</style>