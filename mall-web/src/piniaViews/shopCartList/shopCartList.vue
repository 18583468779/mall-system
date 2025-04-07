<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 空状态 -->
    <div
      v-if="getShopCartList?.length === 0"
      class="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]"
    >
      <el-icon class="text-gray-300 mb-6" :size="80"><ShoppingCart /></el-icon>
      <p class="text-gray-500 mb-4">您的购物车是空的</p>
      <el-button
        type="primary"
        class="!rounded-full px-8"
        @click="handelToHome"
      >
        立即选购
      </el-button>
    </div>

    <!-- 商品列表 -->
    <main
      v-else
      class="container mx-auto px-4 py-6 lg:grid lg:grid-cols-12 lg:gap-8"
    >
      <div class="lg:col-span-8">
        <!-- 全选控制 -->
        <div class="bg-white p-4 rounded-xl shadow-sm mb-4 flex items-center">
          <el-checkbox
            v-model="isSelectAll"
            @change="selectAll"
            class="mr-3"
          ></el-checkbox>
          <span class="text-gray-600"
            >全选（{{ getShopCartList.length }}件）</span
          >
        </div>

        <!-- 商品项 -->
        <div class="space-y-4">
          <div
            v-for="item in getShopCartList"
            :key="item.shopcartid"
            class="bg-white rounded-xl shadow-sm p-4 flex items-start transition-all hover:shadow-md"
          >
            <el-checkbox
              v-model="item.checked"
              @change="checkEveryCheckBox"
              class="mr-4 mt-2"
            ></el-checkbox>
            <img
              :src="getImg(item.bookpicname)"
              class="w-24 h-24 object-cover rounded-lg"
            />
            <div class="ml-4 flex-1">
              <h3 class="font-medium text-gray-900 line-clamp-2 mb-2">
                {{ item.bookname }}
              </h3>
              <div class="flex items-center justify-between">
                <p class="text-red-500 font-bold text-lg">
                  ¥{{ item.bookprice }}
                </p>
                <add-subtrsc
                  :book-item="
                    getCurrentBookItem(item.bookisbn, item.purcharsenum)
                  "
                  class="w-32"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算栏 -->
      <div class="lg:col-span-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
        <div class="bg-white rounded-xl shadow-sm p-6 mt-4 lg:mt-0">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">商品合计：</span>
              <span class="text-red-500 font-bold text-lg"
                >¥{{ totalPrice }}</span
              >
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">优惠折扣：</span>
              <span class="text-red-500">-¥0.00</span>
            </div>
            <el-divider />
            <div class="flex justify-between items-center font-bold">
              <span>应付总额：</span>
              <span class="text-red-500 text-xl">¥{{ totalPrice }}</span>
            </div>
            <el-button
              type="primary"
              class="w-full !px-4 !py-5 !bg-red-100 hover:!bg-red-200 !text-red-600 !rounded-lg transition-colors border-none text-sm font-bold"
              @click="handleToOrder"
            >
              立即结算（{{ totalCount }}件）
            </el-button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 保持原有脚本逻辑不变，仅添加样式相关响应式处理
import { ImgUtil } from "../../utils/imgUtil";
import ShopCart from "../books/service/shopCart";
import addSubtrsc from "../books/components/addSubtrsc.vue";
import Books from "../books/service";
import router from "../../router";
import { ElCheckbox, ElButton, ElIcon } from "element-plus";
import { ShoppingCart } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const { getImg } = ImgUtil;
const { isSelectAll, selectAll, checkEveryCheckBox } = ShopCart;
const { getShopCartList } = ShopCart.storeRefs;
const { getCurrentBookItem } = Books;
const { totalCount, totalPrice } = ShopCart.refreshShopCartList();

const handelToHome = () => router.push({ name: "home" });
const handleToOrder = () => {
  if (totalCount.value === 0) {
    ElMessage.warning("请先选择要结算的商品");
    return;
  }
  router.push({ name: "order" });
};
</script>

<style scoped>
/* 优化移动端显示 */
@media (max-width: 1024px) {
  .lg\:grid {
    display: block;
  }

  .lg\:col-span-4 {
    margin-top: 2rem;
  }
}
</style>
