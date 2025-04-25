<template>
  <header
    class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16 backdrop-blur-md"
  >
    <div
      class="container mx-auto px-4 h-full flex items-center justify-between"
    >
      <el-icon class="lg:hidden">
        <Menu />
      </el-icon>

      <h1 class="text-xl font-bold text-red-500 mx-4 flex items-center gap-2">
        <img :src="logo" alt="" class="w-10" />
        <p>代码小库</p>
      </h1>

      <nav class="hidden lg:flex space-x-8 flex-1 justify-center">
        <template v-for="navItem in navItems" :key="navItem.name">
          <!-- 普通导航项 -->
          <router-link
            v-if="navItem.type === 'link'"
            :to="navItem.path!"
            class="nav-item"
          >
            {{ navItem.name }}
          </router-link>

          <!-- 分类下拉项 -->
          <div v-else>
            <CategoryDropdown />
          </div>
        </template>
      </nav>

      <div class="flex items-center space-x-6">
        <el-icon class="text-2xl" @click="handleShowSearch">
          <Search />
        </el-icon>
        <div class="relative cursor-pointer" @click="handleToCart">
          <el-icon class="text-2xl">
            <ShoppingCart />
          </el-icon>
          <span
            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            v-if="totalCount > 0"
          >
            {{ totalCount }}
          </span>
        </div>
        <el-dropdown :hide-on-click="false" class="cursor-pointer text-lg">
          <span class="el-dropdown-link flex items-center">
            {{ store?.storeLoginUser?.username || "游客"
            }}<el-icon class="el-icon--right"><User /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleToCenter">个人中心</el-dropdown-item>
              <el-dropdown-item>
                <el-popconfirm
                  title="确认要退出登录吗?"
                  @confirm="handleLogout"
                >
                  <template #reference> 退出登录 </template>
                </el-popconfirm>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <Transition>
      <div v-show="showSearch">
        <SearchComponent @handleShowSearch="handleShowSearch" />
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { Menu, Search, ShoppingCart, User } from "@element-plus/icons-vue";
import CategoryDropdown from "../piniaViews/ctgy/components/Ctgy.vue";
import SearchComponent from "../piniaViews/search/index.vue";
import ShopCart from "../piniaViews/books/service/shopCart";
import userInfo from "../piniaStore/userInfo";
import logo from "../assets/image/logo.png";
const { handleToCart } = ShopCart;
const store = userInfo();
const router = useRouter();
const { logout } = store;
const { totalCount } = ShopCart.refreshShopCartList();
import { ref } from "vue";
import { useRouter } from "vue-router";
const showSearch = ref(false);

const handleShowSearch = () => {
  showSearch.value = !showSearch.value;
};

const handleLogout = () => {
  logout();
};
const handleToCenter = () => {
  router.push({ path: "/userCenter" });
}
// 导航项数据结构
const navItems = [
  {
    name: "首页",
    type: "link",
    path: "/",
  },
  {
    name: "分类",
    type: "dropdown",
  },
  {
    name: "升级VIP",
    type: "link",
    path: "/vip",
  },
  {
    name: "联系我们",
    type: "link",
    path: "/contactUs",
  },
  {
    name: "个人网站托管服务",
    type: "link",
    path: "/webService",
  }
];
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.nav-item {
  @apply px-3 py-2 text-gray-600 hover:text-red-500 transition-colors 
   flex items-center text-[15px] font-medium;
}
</style>
