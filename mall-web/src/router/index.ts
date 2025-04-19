import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import storage from "../utils/goodStorageUtil";
const layout = () => import("../layout/index.vue");
const home = () => import("../piniaViews/home/index.vue");
const ctgy = () => import("../piniaViews/ctgy/index.vue");
const books = () => import("../piniaViews/books/index.vue");
const order = () => import("../piniaViews/order/index.vue");
const orderSort = () => import("../piniaViews/order/orderSort.vue");

const shopCartList = () =>
  import("../piniaViews/shopCartList/shopCartList.vue");
const search = () => import("../piniaViews/search/index.vue");
const login = () => import("../piniaViews/userInfo/login.vue");

const BookDetail = () => import("../piniaViews/bookDetail/index.vue");
const payPage = () => import("../piniaViews/order/payPage.vue");
const contactUs = () => import("../piniaViews/contactUs/index.vue");
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    component: layout,
    children: [
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
        name: "payPage",
        path: "/payPage",
        component: payPage,
      },
      {
        name: "orderSort",
        path: "/orderSort",
        component: orderSort,
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
        name: "contactUs",
        path: "/contactUs",
        component: contactUs,
      },
      {
        name: "bookdetail",
        path: "/bookdetail/:bookData",
        component: BookDetail,
        // children: [
        //   {
        //     name: "goods",
        //     path: "goods",
        //     component: Goods,
        //   },
        //   {
        //     name: "evaluate",
        //     path: "evaluate",
        //     component: Evaluate,
        //   },
        // ],
      },
    ],
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
