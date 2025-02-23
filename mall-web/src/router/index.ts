import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const ctgy = () => import("../views/ctgy/index.vue");

const routes: RouteRecordRaw[] = [
  {
    name: "ctgy",
    path: "/ctgy",
    component: ctgy,
  },
  {
    name: "testpinia",
    path: "/testpinia",
    component: () => import("../pinaexam/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
