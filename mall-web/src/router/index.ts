import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import storage from "../utils/goodStorageUtil";

const ctgy = () => import("../piniaViews/ctgy/index.vue");
const books = () => import("../piniaViews/books/index.vue");
const shopCartList = () =>
  import("../piniaViews/shopCartList/shopCartList.vue");
const search = () => import("../piniaViews/search/index.vue");
const login = () => import("../piniaViews/userInfo/login.vue");

const routes: RouteRecordRaw[] = [
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
    name: "ctgy",
    path: "/",
    component: ctgy,
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
