<template>
  <div class="h-screen flex container">
    <!-- 左侧目录导航 -->
    <el-aside width="280px" class="h-full border-r bg-gray-50 overflow-y-auto">
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4">目录</h2>
        <el-menu :default-active="activeChapter" @select="handleSelectChapter">
          <el-menu-item
            v-for="(chapter, index) in processedChapters"
            :key="chapter.chapter_id"
            :index="chapter.chapter_id.toString()"
            :class="{ 'is-free': chapter.is_free }"
          >
            <span class="mr-2">第{{ index + 1 }}章</span>
            {{ chapter.title }}
            <el-tag v-if="chapter.is_free" size="mini" class="ml-2"
              >免费</el-tag
            >
          </el-menu-item>
        </el-menu>

        <!-- 购买提示 -->
        <div
          v-if="!hasPurchased"
          class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <h3 class="font-medium text-yellow-800 mb-2">付费内容</h3>
          <p class="text-sm text-yellow-700 mb-4">
            {{ previewChaptersCount }}章免费试读，升级vip会员后解锁全部{{
              totalChapters
            }}章节
          </p>
          <el-button type="primary" class="w-full" @click="handleToVip">
            升级会员
          </el-button>
        </div>
      </div>
    </el-aside>

    <!-- 右侧内容区域 -->
    <el-main class="h-full overflow-y-auto bg-white">
      <div class="max-w-3xl mx-auto p-6">
        <template v-if="currentChapter">
          <h1 class="text-2xl font-bold mb-6">{{ currentChapter.title }}</h1>
          <div class="prose" v-html="currentChapter.content.content" />
        </template>
        <div v-else class="text-gray-500">请选择左侧章节查看内容</div>
      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import request from "../../utils/axiosUtil";
import { useRouter } from "vue-router";
interface ChapterContent {
  content_id: number;
  chapter_id: number;
  content: string;
}

interface Chapter {
  chapter_id: number;
  booklet_id: number;
  title: string;
  order: number;
  is_free: boolean;
  content: ChapterContent;
}

const { id } = defineProps<{
  id: string;
}>();
const router = useRouter();

// 真实数据结构
const detailData = ref<Chapter[]>([]);
const hasPurchased = ref(true); // 根据实际购买状态修改
const activeChapter = ref("1");

const handleToVip = () => {
  router.push({
    path: "/vip",
  });
};

// 处理章节数据
const processedChapters = computed(() => {
  return detailData.value.map((chapter) => ({
    ...chapter,
    id: chapter.chapter_id, // 适配原有数据结构
    isFree: chapter.is_free,
  }));
});

// 当前选中章节
const currentChapter = computed(() => {
  return detailData.value.find(
    (chapter) => chapter.chapter_id.toString() === activeChapter.value
  );
});

// 章节统计
const previewChaptersCount = computed(() => {
  return detailData.value.filter((c) => c.is_free).length;
});

const totalChapters = computed(() => {
  return detailData.value.length;
});

// 获取数据
const handleGetData = async () => {
  try {
    const res: any = await request.get(
      `/bookletmodule/getBookletAndContent/${id}`,
      false
    );
    if (res.code === 200) {
      detailData.value = res.data.chapters.map((chapter: any) => ({
        ...chapter,
        content: chapter.content || {
          content_id: 0,
          chapter_id: chapter.chapter_id,
          content: "暂无内容",
        },
      }));
      hasPurchased.value = res.data.isShow; // 假设后端返回了购买状态
      console.log("Processed chapters:", detailData.value);
    }
  } catch (error) {
    console.error("数据获取失败:", error);
  }
};

// 初始化
onMounted(() => {
  handleGetData();
});

// 处理章节选择
const handleSelectChapter = (id: string) => {
  activeChapter.value = id;
};
</script>

<style scoped>
/* 自定义菜单项样式 */
.el-menu-item.is-free {
  @apply bg-blue-50 hover:bg-blue-100;
}

.el-menu-item.is-locked {
  @apply text-gray-400 cursor-not-allowed;
}

/* 内容样式 */
.prose :deep(img) {
  @apply my-4 rounded-lg shadow-md;
}

.prose :deep(strong) {
  @apply text-blue-600;
}

.prose :deep(em) {
  @apply text-green-600;
}
</style>
