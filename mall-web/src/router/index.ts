import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import storage from "../utils/goodStorageUtil";
const home = () => import("../piniaViews/home/index.vue");
const ctgy = () => import("../piniaViews/ctgy/index.vue");
const books = () => import("../piniaViews/books/index.vue");
const order = () => import("../piniaViews/order/index.vue");
const shopCartList = () =>
  import("../piniaViews/shopCartList/shopCartList.vue");
const search = () => import("../piniaViews/search/index.vue");
const login = () => import("../piniaViews/userInfo/login.vue");

const BookDetail = () => import("../piniaViews/bookDetail/index.vue");
const Goods = () => import("../piniaViews/bookDetail/component/goods.vue");
const Evaluate = () =>
  import("../piniaViews/bookDetail/component/evaluate/index.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    name: "home",
    path: "/home",
    component: home,
  },
  {
    name: "ctgy",
    path: "/ctgy",
    component: ctgy,
  },
  {
    name: "books",
    path: "/books",
    component: books,
  },
  {
    name: "order",
    path: "/order",
    component: order,
  },
  {
    name: "shopCartList",
    path: "/shopCartList",
    component: shopCartList,
  },
  {
    name: "search",
    path: "/search",
    component: search,
  },
  {
    name: "login",
    path: "/login",
    component: login,
    beforeEnter(to, from, next) {
      const token = storage.get("token");
      if (token) {
        next({ name: "ctgy" });
      } else {
        next();
      }
    },
  },

  {
    name: "bookdetail",
    path: "/bookdetail",
    component: BookDetail,
    children: [
      // {
      //   path: "", // 默认子路由
      //   redirect: "goods",
      // },
      {
        name: "goods",
        path: "goods",
        component: Goods,
      },
      {
        name: "evaluate",
        path: "evaluate",
        component: Evaluate,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const token = storage.get("token");
  if (token || to.name === "login") {
    next();
  } else {
    next({ name: "login" });
  }
});
export default router;
