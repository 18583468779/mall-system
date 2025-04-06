<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 商品详情主体 -->
    <div class="container mx-auto px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- 左侧内容区 -->
      <div class="lg:col-span-8">
        <!-- 返回按钮 -->
        <el-button text class="!px-0 mb-6" @click="">
          <el-icon :size="24"><ArrowLeft /></el-icon>
        </el-button>

        <!-- 图片展示 -->
        <div class="bg-white p-4 rounded-xl shadow-sm mb-6">
          <img
            :src="ImgUtil.getImg(bookData.bookpicname)"
            class="w-full h-96 object-contain"
          />
          <!-- 缩略图轮播（假数据示例） -->
          <div class="grid grid-cols-4 gap-3 mt-4">
            <div
              v-for="i in 4"
              :key="i"
              class="h-20 bg-gray-100 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <!-- 商品信息Tabs -->
        <el-tabs v-model="activeTab" class="bg-white rounded-xl shadow-sm">
          <el-tab-pane label="商品详情" name="detail">
            <div class="p-4">
              <h2 class="text-2xl font-bold mb-4">
                {{ bookData.bookname }}
              </h2>
              <div class="text-gray-600 leading-relaxed">
                {{ bookData || "暂无商品描述" }}
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="商品评价" name="review">
            <div class="p-4">
              <!-- 评价筛选 -->
              <div class="mb-6">
                <el-radio-group v-model="filterType">
                  <el-radio-button label="all"
                    >全部（{{ totalReviews }}）</el-radio-button
                  >
                  <el-radio-button label="good"
                    >好评（{{ goodEvalNum }}）</el-radio-button
                  >
                  <el-radio-button label="medium"
                    >中评（{{ mediumEvalNum }}）</el-radio-button
                  >
                  <el-radio-button label="bad"
                    >差评（{{ negativeEvalNum }}）</el-radio-button
                  >
                </el-radio-group>
              </div>

              <!-- 评价列表 -->
              <div class="space-y-6">
                <div
                  v-for="item in evalRplLst"
                  :key="item.evaluateid"
                  class="border-b pb-6"
                >
                  <!-- 评价头部 -->
                  <div class="flex items-center gap-3 mb-3">
                    <img
                      :src="ImgUtil.getImg(item.headportrait)"
                      class="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 class="font-medium">
                        {{ item.isanonymous ? "匿名用户" : item.evaluator }}
                      </h3>
                      <div class="text-sm text-gray-500">
                        {{ dayjs(item.pubdate).format("YYYY-MM-DD") }}
                      </div>
                    </div>
                  </div>

                  <!-- 评价内容 -->
                  <div class="text-gray-800 leading-relaxed">
                    {{ item.content }}
                  </div>

                  <!-- 互动操作 -->
                  <div class="flex items-center gap-4 mt-3 text-sm">
                    <button
                      class="text-gray-500 hover:text-black transition-colors"
                    >
                      <el-icon :size="16"><ChatDotRound /></el-icon>
                      <span class="ml-1">回复</span>
                    </button>
                    <button
                      class="text-gray-500 hover:text-black transition-colors"
                    >
                      <el-icon :size="16"><Thumb /></el-icon>
                      <span class="ml-1">{{ item.isbn || 0 }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 右侧操作区 -->
      <div
        class="pt-4 lg:col-span-4 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]"
      >
        <div class="bg-white p-6 pt-10 rounded-xl shadow-sm lg:mt-8">
          <!-- 商品标题 -->
          <h1 class="text-2xl font-bold mb-4">{{ bookData.bookname }}</h1>

          <!-- 价格信息 -->
          <div class="space-y-3 mb-6">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold text-red-600">
                ¥{{ bookData.discountprice }}
              </span>
              <span class="text-gray-500 line-through">
                定价¥{{ bookData.originalprice }}
              </span>
              <span class="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                {{ bookData.discount }}折
              </span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-start items-center gap-3">
            <add-subtrsc :book-item="bookData" class="mt-0" />
            <div>
              <el-button
                class="!px-4 !py-4 hover:!bg-red-200 hover:!text-red-600 hover:border-transparent !rounded-lg"
              >
                <el-icon :size="16" class="mr-1">
                  <Star />
                </el-icon>
                收藏商品
              </el-button>
            </div>
          </div>

          <!-- 促销信息 -->
          <div class="mt-6 pt-6 border-t">
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-gray-500">促销：</span>
                <span class="text-red-600">每满1000减50</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-500">服务：</span>
                <span class="text-gray-800">正品保证 · 极速退款</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ArrowLeft, ChatDotRound } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { EvaluateClass } from "../bookDetail/service";
// import shopCart from "../books/service/shopCart";
import { ImgUtil } from "../../utils/imgUtil";
import { useRoute } from "vue-router";
import addSubtrsc from "../books/components/addSubtrsc.vue";
const { evalRplLst } = EvaluateClass.storeRef;
const route = useRoute();

const bookData = JSON.parse(
  decodeURIComponent(route.params.bookData as string)
);
// 假数据
const activeTab = ref("detail");
const filterType = ref("all");
const totalReviews = ref(132);
const goodEvalNum = ref(120);
const mediumEvalNum = ref(8);
const negativeEvalNum = ref(4);
</script>

<style scoped>
:deep(.el-tabs__nav-wrap) {
  @apply px-6 pt-4;
}

:deep(.el-tabs__item) {
  @apply !text-lg !font-medium;
}

:deep(.el-button.is-active) {
  @apply !bg-black !text-white;
}
</style>
