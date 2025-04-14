import { createWebHashHistory, createRouter } from "vue-router";
import LayoutService from "../layout/service";

const routes = [
  {
    path: "/",
    component: () => import("../layout/layout.vue"),
    redirect: "/dashboard",
    meta: { requiresAuth: true }, // 添加鉴权标记
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
        path: "/ctgyManage",
        name: "ctgyManage",
        component: () => import("../views/ctgyManage/CtgyManage.vue"),
        meta: { title: "商品分类管理", icon: "Grid" },
      },
      {
        path: "/productManage",
        name: "productManage",
        component: () => import("../views/productManage/productManage.vue"),
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
    meta: { guestOnly: true } // 仅游客可访问
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const { tabsStore } = LayoutService;
  const isAuthenticated = checkAuthStatus(); // 检查登录状态
  
  // 标签页管理逻辑
  if (to.path !== '/login') {
    tabsStore.addTab(to);
  }

  // 权限检查逻辑
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { 
      path: '/login',
      query: { redirect: to.fullPath } // 记录原始目标路径
    };
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return from || { path: '/' }; // 阻止已登录用户访问登录页
  }

  return true;
});


function checkAuthStatus(): boolean {
  // 1. 检查本地是否存在有效token
  const token = localStorage.getItem('userInfo');
  if (!(token && JSON.parse(token).access_token)) return false;
  return true;

}

export default router;
