import { createWebHashHistory, createRouter } from "vue-router";

import Layout from "../layout/layout.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard.vue"),
        meta: { title: "工作台", icon: "Menu" },
      },
      {
        path: "productManage",
        name: "productManage",
        component: () => import("../views/productManage.vue"),
        meta: { title: "商品管理", icon: "Goods" },
      },
      {
        path: "ordersManage",
        name: "ordersManage",
        component: () => import("../views/ordersManage.vue"),
        meta: { title: "订单管理", icon: "Collection" },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
