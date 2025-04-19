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
          <el-carousel
            :interval="5000"
            height="500px"
            arrow="always"
            v-model="activeImageIndex"
          >
            <el-carousel-item
              v-for="(image, index) in getDetailBook.images"
              :key="index"
            >
              <img
                :src="image.url"
                class="w-full h-full object-contain"
                :alt="image.filename"
                @error="handleImageError"
              />
            </el-carousel-item>
          </el-carousel>

          <!-- 缩略图导航 -->
          <div class="grid grid-cols-4 gap-3 mt-4">
            <div
              v-for="(image, index) in getDetailBook.images"
              :key="index"
              class="cursor-pointer relative group"
              @click="activeImageIndex = index"
            >
              <img
                :src="image.url"
                class="h-20 w-full object-cover rounded-lg border-2 transition-all"
                :class="{
                  'border-red-500': activeImageIndex === index,
                  'border-gray-200': activeImageIndex !== index,
                }"
              />
              <div
                class="absolute inset-0 bg-black/30 rounded-lg transition-opacity"
                :class="
                  activeImageIndex === index
                    ? 'opacity-0'
                    : 'group-hover:opacity-0'
                "
              />
            </div>
          </div>
        </div>

        <!-- 商品信息Tabs -->
        <el-tabs v-model="activeTab" class="bg-white rounded-xl shadow-sm">
          <el-tab-pane label="商品详情" name="detail">
            <div class="p-4">
              <h2 class="text-2xl font-bold mb-4">
                {{ getDetailBook.bookname }}
              </h2>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ getDetailBook.description || "暂无商品描述" }}
              </div>

              <!-- 技术栈展示 -->
              <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 class="font-bold mb-3">实现技术</h3>
                <div class="flex gap-2">
                  <el-tag type="info">HTML5</el-tag>
                  <el-tag type="info">CSS3</el-tag>
                  <el-tag type="info">JavaScript</el-tag>
                </div>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane label="资源下载" name="download">
            <div class="p-4">
              <div
                v-for="(file, index) in getDetailBook.attachments"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors"
              >
                <div class="flex items-center gap-2">
                  <el-icon :size="20" class="text-blue-500"
                    ><Document
                  /></el-icon>
                  <span class="text-gray-800">{{ file.filename }}</span>
                </div>
                <el-button
                  type="primary"
                  size="small"
                  @click="downloadFile(file.url)"
                >
                  立即下载
                </el-button>
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
          <h1 class="text-2xl font-bold mb-4">{{ getDetailBook.bookname }}</h1>

          <!-- 分类信息 -->
          <div class="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <el-icon><CollectionTag /></el-icon>
            <span>{{ getDetailBook.thirdCtgy?.thirdctgyname }}</span>
          </div>

          <!-- 价格信息 -->
          <div class="space-y-3 mb-6">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold text-red-600">
                ¥{{
                  (getDetailBook.originalprice * getDetailBook.discount) / 10
                }}
              </span>
              <span class="text-gray-500 line-through">
                定价¥{{ getDetailBook.originalprice }}
              </span>
              <span class="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                {{ getDetailBook.discount }}折
              </span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-start items-center gap-3">
            <add-subtrsc :book-item="getDetailBook" class="mt-0" />
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
                <span class="text-gray-500">服务：</span>
                <span class="text-gray-800"
                  >源码包下载 · 技术支持 · 持续更新</span
                >
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-500">文档：</span>
                <span class="text-gray-800">一份</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-gray-500">版本：</span>
                <span class="text-gray-800">v1.0.0（2025-04-19 更新）</span>
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
import {
  ArrowLeft,
  Document,
  CollectionTag,
  Star,
} from "@element-plus/icons-vue";
import addSubtrsc from "../books/components/addSubtrsc.vue";
import Books from "../books/service";
const { store } = Books;
const { getDetailBook } = store;
// console.log("getDetailBook", getDetailBook);
const activeTab = ref("detail");
const activeImageIndex = ref(0);

const downloadFile = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = url.split("/").pop() || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = "https://via.placeholder.com/500x300?text=Image+Not+Available";
};
</script>

<style scoped>
:deep(.el-tabs__nav-wrap) {
  @apply px-6 pt-4;
}

:deep(.el-tabs__item) {
  @apply !text-lg !font-medium;
}

:deep(.el-carousel__arrow) {
  @apply !w-10 !h-10 bg-white/80 hover:bg-white !text-gray-600 shadow-md;
}

:deep(.el-carousel__indicator button) {
  @apply !bg-gray-400;
}

:deep(.el-carousel__indicator.is-active button) {
  @apply !bg-red-500;
}
</style>
