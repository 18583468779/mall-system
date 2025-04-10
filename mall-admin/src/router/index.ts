import { createWebHashHistory, createRouter } from "vue-router";
import LayoutService from "../layout/service";


const routes = [
  {
    path: "/",
    component: () => import("../layout/layout.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard.vue"),
        meta: { title: "工作台", icon: "Menu" },
      },
      {
        path: "/baseManage",
        name: "baseManage",
        meta: { title: "基础管理", icon: "Crop", isSubMenu: true },
        children: [
          {
            path: "/baseManage/menuManage",
            name: "menuManage",
            component: () => import("../views/baseManage/menuManage.vue"),
            meta: { title: "菜单管理", icon: "Menu" },
          },
          {
            path: "/baseManage/userManage",
            name: "userManage",
            component: () => import("../views/baseManage/userManage.vue"),
            meta: { title: "用户管理", icon: "User" },
          },
          {
            path: "/baseManage/roleManage",
            name: "roleManage",
            component: () => import("../views/baseManage/roleManage.vue"),
            meta: { title: "角色管理", icon: "Avatar" },
          },
        ],
      },
      {
        path: "/productManage",
        name: "productManage",
        component: () => import("../views/productManage.vue"),
        meta: { title: "商品管理", icon: "Goods" },
      },
      {
        path: "/ordersManage",
        name: "ordersManage",
        component: () => import("../views/ordersManage/ordersManage.vue"),
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

router.beforeEach((to) => {
  const {tabsStore} = LayoutService
  if (to.path === "/login") return true;
  tabsStore.addTab(to);
  return true;
});

export default router;
