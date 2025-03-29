<template>
  <div class="shopcartlist h-full">
    <!-- 头部 -->
    <div
      class="header fixed top-0 left-0 right-0 bg-white shadow-sm p-[0.2rem] flex items-center justify-between"
    >
      <div class="back" @click="handleToPage">
        <el-icon class="text-gray-500"><Back /></el-icon>
      </div>
      <div class="flex items-center">
        <el-checkbox
          v-model="isSelectAll"
          class="mr-[0.1rem]"
          @change="selectAll"
        ></el-checkbox>
        <span class="label font-medium text-gray-800 text-[0.18rem]"
          >当当网</span
        >
      </div>
    </div>

    <!-- 商品列表 -->
    <div
      v-if="getShopCartList?.length === 0"
      class="h-full flex items-center justify-center"
    >
      <div class="flex flex-col items-center mt-[3rem]">
        <el-icon class="text-gray-400 text-[0.8rem]"><ShoppingCart /></el-icon>
        <div class="text-gray-500 text-[0.16rem] mt-[0.1rem] text-center">
          <p>购物车是空的，请选购商品吧！！</p>
          <el-button type="danger" class="mt-[0.5rem]" @click="handelToHome"
            >去选购</el-button
          >
        </div>
      </div>
    </div>
    <div
      v-else
      class="items overflow-y-auto h-[calc(100vh-1.6rem)] p-[0.2rem] pt-[1.2rem]"
    >
      <div
        class="item bg-white rounded-lg shadow-sm mb-[0.2rem] p-[0.2rem] flex items-center"
        v-for="item in getShopCartList"
        :key="item.shopcartid"
      >
        <el-checkbox
          v-model="item.checked"
          class="mr-[0.1rem]"
          @change="checkEveryCheckBox"
        ></el-checkbox>
        <div
          class="pic w-[0.8rem] h-[0.8rem] bg-gray-100 rounded overflow-hidden"
        >
          <img
            :src="getImg(item.bookpicname)"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="descri flex-1 ml-[0.1rem]">
          <div
            class="book-title text-gray-800 font-medium text-[0.16rem] line-clamp-2 mb-[0.1rem]"
          >
            {{ item.bookname }}
          </div>
          <div class="price flex justify-between items-center">
            <span class="curprice text-red-500 font-medium text-[0.16rem]"
              >¥{{ item.bookprice }}</span
            >
            <span class="addsubtrcbktosc">
              <addSubtrsc
                :book-item="
                  getCurrentBookItem(item.bookisbn, item.purcharsenum)
                "
              />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算栏 -->
    <div
      class="cal fixed bottom-0 left-0 right-0 bg-white shadow-inner p-[0.2rem] flex items-center justify-between"
    >
      <div class="checkall flex items-center">
        <el-checkbox class="mr-[0.1rem]"></el-checkbox>
        <span class="label text-gray-600 text-[0.16rem]">全选</span>
        <span class="total ml-[0.1rem] text-gray-800 font-medium">
          合计：
          <span class="money text-red-500">¥{{ totalPrice }}</span>
        </span>
      </div>
      <el-button
        class="pay bg-red-500 text-white px-[0.3rem] py-[0.08rem] rounded-full font-medium text-[0.16rem]"
        @click="handleToOrder"
      >
        <span class="mr-[0.05rem]"
          ><el-icon><ShoppingCart /></el-icon
        ></span>
        去结算({{ totalCount }})
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImgUtil } from "../../utils/imgUtil";
import ShopCart from "../books/service/shopCart";
import addSubtrsc from "../books/components/addSubtrsc.vue";
import Books from "../books/service";
import router from "../../router";
import { ElCheckbox, ElButton, ElIcon } from "element-plus";
import { Back, ShoppingCart } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const { getImg } = ImgUtil;
const { isSelectAll, selectAll, checkEveryCheckBox } = ShopCart;
const { getShopCartList } = ShopCart.storeRefs;
const { getCurrentBookItem } = Books;
const { totalCount, totalPrice } = ShopCart.refreshShopCartList();
const handleToPage = () => {
  router.back();
};
const handelToHome = () => {
  router.push({ name: "home" });
};
const handleToOrder = () => {
  if (totalCount.value === 0)
    return ElMessage({
      message: "您还没有选择商品哦！",
      type: "warning",
    });
  router.push({ name: "order" });
};
</script>

<style scoped>
/* 根据你的比例设置，确保文字大小和间距合适 */
.shopcartlist {
  font-size: 0.16rem;
}

.items {
  padding-top: 0.5rem;
}

.item {
  margin-bottom: 0.2rem;
}

.cal {
  font-size: 0.16rem;
}

.pay {
  font-size: 0.16rem;
}
</style>
