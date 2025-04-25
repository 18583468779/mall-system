import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import storage from "../utils/goodStorageUtil";

// 布局组件
const layout = () => import("../layout/index.vue");

// 公共组件（动态导入）
const home = () => import("../piniaViews/home/index.vue");
const books = () => import("../piniaViews/books/index.vue");
const search = () => import("../piniaViews/search/index.vue");
const contactUs = () => import("../piniaViews/contactUs/index.vue");
const marked = () => import("../piniaViews/marked/index.vue");

// 需要登录的组件
const order = () => import("../piniaViews/order/index.vue");
const orderSort = () => import("../piniaViews/order/orderSort.vue");
const shopCartList = () => import("../piniaViews/shopCartList/shopCartList.vue");
const payPage = () => import("../piniaViews/order/payPage.vue");
const userCenter = () => import("../piniaViews/userInfo/userCenter.vue");

// 其他组件
const login = () => import("../piniaViews/userInfo/login.vue");
const BookDetail = () => import("../piniaViews/bookDetail/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    component: layout,
    children: [
      // 公共访问路由
      {
        name: "home",
        path: "/home",
        component: home,
        meta: { requiresAuth: false }
      },
      {
        name: "books",
        path: "/books",
        component: books,
        meta: { requiresAuth: false }
      },
      {
        name: "search",
        path: "/search",
        component: search,
        meta: { requiresAuth: false }
      },
      {
        name: "contactUs",
        path: "/contactUs",
        component: contactUs,
        meta: { requiresAuth: false }
      },
      {
        name: "bookdetail",
        path: "/bookdetail/:bookData",
        component: BookDetail,
        meta: { requiresAuth: false }
      },
      {
        name: "marked",
        path: "/marked",
        component: marked,
        meta: { requiresAuth: false }
      },
      // 需要登录的路由
      {
        name: "order",
        path: "/order",
        component: order,
        meta: { requiresAuth: true }
      },
      {
        name: "payPage",
        path: "/payPage",
        component: payPage,
        meta: { requiresAuth: true }
      },
      {
        name: "orderSort",
        path: "/orderSort",
        component: orderSort,
        meta: { requiresAuth: true }
      },
      {
        name: "shopCartList",
        path: "/shopCartList",
        component: shopCartList,
        meta: { requiresAuth: true }
      },
      {
        name: "userCenter",
        path: "/userCenter",
        component: userCenter,
        meta: { requiresAuth: true }
      },

      // 其他信息类页面
      {
        name: "vip",
        path: "/vip",
        component: () => import("../piniaViews/vip/index.vue"),
        meta: { requiresAuth: false }
      },
      {
        name: "webService",
        path: "/webService",
        component: () => import("../piniaViews/webService/webService.vue"),
        meta: { requiresAuth: false }
      },
      {
        name: "agreement",
        path: "/agreement",
        component: () => import("../piniaViews/privacy/agreement.vue"),
        meta: { requiresAuth: false }
      },
      {
        name: "copyrightPolicy",
        path: "/copyrightPolicy",
        component: () => import("../piniaViews/privacy/copyrightPolicy.vue"),
        meta: { requiresAuth: false }
      },
      {
        name: "disclaimer",
        path: "/disclaimer",
        component: () => import("../piniaViews/privacy/disclaimer.vue"),
        meta: { requiresAuth: false }
      },
      {
        name: "privacy",
        path: "/privacy",
        component: () => import("../piniaViews/privacy/privacy.vue"),
        meta: { requiresAuth: false }
      }
    ]
  },

  // 登录页
  {
    name: "login",
    path: "/login",
    component: login,
    beforeEnter(to, from, next) {
      const token = storage.get("token");
      token ? next({ name: "home" }) : next();
    }
  },

  // 404处理
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../piniaViews/notFound/index.vue"),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = storage.get("token");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !token) {
    // 需要认证且未登录时跳转到登录页
    next({
      name: "login",
      query: { redirect: to.fullPath }
    });
  } else if (to.name === "login" && token) {
    // 已登录时禁止访问登录页
    next({ name: "home" });
  } else {
    // 其他情况正常放行
    next();
  }
});

export default router;
