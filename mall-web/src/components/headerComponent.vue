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
          >
            {{ totalCount }}
          </span>
        </div>
        <el-icon class="hidden lg:inline-block text-2xl"><User /></el-icon>
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
import logo from "../assets/image/logo.png";
const { handleToCart } = ShopCart;
const { totalCount } = ShopCart.refreshShopCartList();
import { ref } from "vue";
const showSearch = ref(false);

const handleShowSearch = () => {
  showSearch.value = !showSearch.value;
};

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
    name: "新品",
    type: "link",
    path: "/new",
  },
  {
    name: "热卖",
    type: "link",
    path: "/hot",
  },
  {
    name: "联系我们",
    type: "link",
    path: "/contactUs",
  },
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
