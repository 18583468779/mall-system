import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const ctgy = () => import("../piniaViews/ctgy/index.vue");

const routes: RouteRecordRaw[] = [
  {
    name: "ctgy",
    path: "/ctgy",
    component: ctgy,
  },
  {
    name: "ctgy",
    path: "/",
    component: ctgy,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
