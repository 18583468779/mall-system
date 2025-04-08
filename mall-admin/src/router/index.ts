import { createWebHashHistory, createRouter } from "vue-router";

import Layout from "../layout/layout.vue";

const routes = [{ path: "/", component: Layout }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
