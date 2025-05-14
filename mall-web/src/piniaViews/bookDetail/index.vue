<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 商品详情主体 -->
    <div class="container mx-auto px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-8">
      <!-- 左侧内容区 -->
      <div class="lg:col-span-8">
        <!-- 返回按钮 -->
        <el-button text class="!px-0 mb-6" @click="">
          <el-icon :size="24">
            <ArrowLeft />
          </el-icon>
        </el-button>

        <!-- 图片展示 -->
        <div class="bg-white p-4 rounded-xl shadow-sm mb-6">
          <el-carousel :interval="5000" height="500px" arrow="always" v-model="activeImageIndex">
            <el-carousel-item v-for="image in store.bookDetail.images" :key="image.url">
              <img :src="image.url" class="w-full h-full object-contain" :alt="image.filename"
                @error="handleImageError" />
            </el-carousel-item>
          </el-carousel>

          <!-- 缩略图导航 -->
          <div class="grid grid-cols-4 gap-3 mt-4">
            <div v-for="(image, index) in store.bookDetail.images" :key="index" class="cursor-pointer relative group"
              @click="activeImageIndex = index">
              <img :src="image.url" class="h-20 w-full object-cover rounded-lg border-2 transition-all" :class="{
                'border-red-500': activeImageIndex === index,
                'border-gray-200': activeImageIndex !== index,
              }" />
              <div class="absolute inset-0 bg-black/30 rounded-lg transition-opacity" :class="activeImageIndex === index
                ? 'opacity-0'
                : 'group-hover:opacity-0'
                " />
            </div>
          </div>
        </div>

        <!-- 商品信息Tabs -->
        <el-tabs v-model="activeTab" class="bg-white rounded-xl shadow-sm">
          <el-tab-pane label="商品详情" name="detail">
            <div class="p-4">
              <h2 class="text-2xl font-bold mb-4">
                {{ store.bookDetail.bookname }}
              </h2>
              <div class="text-gray-600 leading-relaxed whitespace-pre-line">
                {{ store.bookDetail.description || "暂无商品描述" }}
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
            <div class="p-4" id="download-section">
              <div v-for="(file, index) in store.bookDetail.attachments" :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2 hover:bg-gray-100 transition-colors">
                <div class="flex items-center gap-2 min-w-0">
                  <el-icon :size="20" class="text-blue-500 shrink-0">
                    <Document />
                  </el-icon>
                  <span class="text-gray-800 truncate">{{ file?.filename }}</span>
                </div>
                <el-tooltip :content="getDownloadTooltip(file)" placement="top">
                  <el-button :type="file.url ? 'primary' : 'warning'" size="small" @click="handleDownload(file)"
                    class="shrink-0">
                    <template v-if="file.url">
                      <el-icon class="mr-1">
                        <Download />
                      </el-icon>立即下载
                    </template>
                    <template v-else>
                      <el-icon class="mr-1">
                        <Lock />
                      </el-icon>会员专享
                    </template>
                  </el-button>
                </el-tooltip>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 右侧操作区 -->
      <div class="pt-4 lg:col-span-4 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
        <div class="bg-white p-6 pt-10 rounded-xl shadow-sm lg:mt-8">
          <!-- 商品标题 -->
          <h1 class="text-2xl font-bold mb-4">
            {{ store.bookDetail.bookname }}
          </h1>

          <!-- 分类信息 -->
          <div class="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <el-icon>
              <CollectionTag />
            </el-icon>
            <span>{{ store.bookDetail.thirdCtgy?.thirdctgyname }}</span>
          </div>

          <!-- 价格信息 -->
          <div class="space-y-3 mb-6">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold text-red-600">
                ¥{{
                  (store.bookDetail.originalprice * store.bookDetail.discount) /
                  10
                }}
              </span>
              <span class="text-gray-500 line-through">
                定价¥{{ store.bookDetail.originalprice }}
              </span>
              <span class="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                {{ store.bookDetail.discount }}折
              </span>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex justify-start items-center gap-3">
            <div>
              <el-button
                @click="handleDownloadSource"
                class="!px-4 !py-4 !bg-red-100 hover:!bg-red-200 !text-red-600 !rounded-lg transition-colors border-none">
                <el-icon :size="16" class="mr-1">
                  <ShoppingCartFull />
                </el-icon>下载源码</el-button>
            </div>
            <!-- <add-subtrsc v-else :book-item="store.bookDetail" class="mt-0" /> -->

          </div>

          <!-- 促销信息 -->
          <div class="mt-6 pt-6 border-t">
            <div class="space-y-3 text-sm">
              <div class="flex items-center gap-2">
                <span class="text-gray-500">服务：</span>
                <span class="text-gray-800">源码包下载 · 技术支持 · 持续更新</span>
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
import { ref, nextTick } from "vue";
import { useRouter } from 'vue-router';
import {
  ArrowLeft,
  Document,
  CollectionTag,
  Download,
  Lock,
} from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from 'element-plus';
// import addSubtrsc from "../books/components/addSubtrsc.vue";
import Books from "../books/service";
// import userInfo from "../../piniaStore/userInfo";
// const { getRoleInfo } = userInfo();
const router = useRouter();
const { store } = Books;
const { findBooksByISBN } = store;
const activeTab = ref("detail");
const activeImageIndex = ref(0);
findBooksByISBN();

const handleDownloadSource = () => {
  activeTab.value = 'download';
  nextTick(() => {
    const downloadSection = document.getElementById('download-section');
    if (downloadSection) {
      downloadSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  });
};

const getDownloadTooltip = (file: { url?: string }) => {
  return file.url ? '点击下载文件' : '升级会员即可下载';
};

const handleDownload = async (file: { url?: string; filename?: string }) => {
  if (file?.url) {
    try {
      const link = document.createElement('a');
      link.href = file.url;
      link.target = '_blank';
      link.download = file.filename || file.url.split('/').pop() || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      ElMessage({
        message: '文件开始下载，若未自动下载请检查浏览器设置',
        type: 'success',
        duration: 2000
      });
    } catch (error) {
      ElMessage({
        message: '下载失败，请稍后重试',
        type: 'error',
        duration: 3000
      });
      console.error('Download error:', error);
    }
  } else {
    try {
      await ElMessageBox.confirm(
        '此资源为会员专享，立即升级会员享受全部权益',
        '会员专享资源',
        {
          confirmButtonText: '升级会员',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'upgrade-message-box'
        }
      );
      router.push('/vip');
    } catch (cancel) {
      ElMessage({
        type: 'info',
        message: '已取消升级',
        duration: 1500
      });
    }
  }
};

const handleImageError = () => {
  // const img = e.target as HTMLImageElement;
  // img.src = "https://via.placeholder.com/500x300?text=Image+Not+Available";
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

:deep(.upgrade-message-box) {
  width: 400px !important;

  .el-message-box__content {
    @apply text-gray-600 leading-6;
  }

  .el-message-box__btns {
    @apply mt-4;

    button {
      @apply !px-5 !rounded-lg transition-all;
    }

    .el-button--warning {
      @apply !bg-gradient-to-r from-orange-400 to-orange-500 !border-0 !text-white hover:opacity-90;
    }

    .el-button--default {}
  }
}
</style>
