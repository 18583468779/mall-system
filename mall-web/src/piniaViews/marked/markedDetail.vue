<template>
  <div class="h-screen flex container">
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
          <el-button type="primary" class="w-full" @click="handleToVip"
            >升级会员</el-button
          >
        </div>
      </div>
    </el-aside>

    <el-main class="h-full overflow-y-auto bg-white">
      <div class="max-w-3xl mx-auto p-6">
        <template v-if="currentChapter">
          <h1 class="text-2xl font-bold mb-6">{{ currentChapter.title }}</h1>

          <div class="relative" :class="{ 'blur-container': shouldBlur }">
            <div
              class="prose markdown-content transition-all duration-300"
              :class="{ 'blur-sm': shouldBlur }"
              v-html="renderedContent"
            />

            <div
              v-if="shouldBlur"
              class="absolute inset-0 bg-white/80 flex flex-col items-center justify-center cursor-pointer backdrop-blur-[2px]"
              @click="handleToVip"
            >
              <LockClosedIcon class="h-8 w-8 text-blue-600 mb-2" />
              <p class="text-lg font-medium text-blue-600">
                订阅后查看完整内容
              </p>
              <p class="text-sm text-gray-600 mt-1">
                已提供{{ previewChaptersCount }}章试读
              </p>
            </div>
          </div>
        </template>
      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import request from "../../utils/axiosUtil";
import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
// 类型定义
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

// 配置Markdown解析器
marked.setOptions({
  breaks: true,
  gfm: true,
  highlight: (code, lang) => {
    // 添加Vue语言识别
    const validLang = lang || "vue";
    return hljs.getLanguage(validLang)
      ? hljs.highlight(code, { language: validLang }).value
      : hljs.highlightAuto(code).value;
  },
  // 关闭自动转义
  mangle: false,
});

// 初始化
const { id } = defineProps<{ id: string }>();
const detailData = ref<Chapter[]>([]);
const hasPurchased = ref(true);
const activeChapter = ref("1");

// 内容渲染逻辑
const renderedContent = computed(() => {
  if (!currentChapter.value?.content?.content) return "";

  // 直接解析Markdown，不再清理HTML标签
  const parsed = marked.parse(currentChapter.value.content.content);

  return DOMPurify.sanitize(parsed, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allowfullscreen", "frameborder", "scrolling"],
  });
});

// 其他计算属性
const processedChapters = computed(() =>
  detailData.value.map((chapter) => ({
    ...chapter,
    id: chapter.chapter_id,
    isFree: chapter.is_free,
  }))
);

const currentChapter = computed(() =>
  detailData.value.find(
    (ch) => ch.chapter_id.toString() === activeChapter.value
  )
);

const shouldBlur = computed(
  () => !hasPurchased.value && !currentChapter.value?.is_free
);

// 数据获取
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
      hasPurchased.value = res.data.isShow;
    }
  } catch (error) {
    console.error("数据获取失败:", error);
  }
};

// 生命周期
onMounted(handleGetData);
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

/* 模糊容器 */
.blur-container {
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

/* 禁用文本选择 */
.blur-container :deep(*) {
  user-select: none;
  -webkit-user-select: none;
}

/* 保持标题清晰 */
.blur-container h1 {
  filter: none !important;
}

/* 优化模糊过渡效果 */
.prose {
  transition: filter 0.3s ease;
}

/* 自定义锁图标（如果使用Element Plus图标需调整） */
.lock-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Markdown 样式增强 */
.markdown-content {
  @apply leading-relaxed text-gray-800;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  @apply font-bold mt-6 mb-3;
}

.markdown-content h1 {
  @apply text-2xl;
}

.markdown-content h2 {
  @apply text-xl;
}

.markdown-content h3 {
  @apply text-lg;
}

.markdown-content p {
  @apply mb-4;
}

.markdown-content ul,
.markdown-content ol {
  @apply mb-4 ml-6;
}

.markdown-content ul {
  @apply list-disc;
}

.markdown-content ol {
  @apply list-decimal;
}

.markdown-content pre {
  @apply bg-gray-800 text-white p-4 rounded my-4 overflow-x-auto;
  tab-size: 4;
}

.markdown-content code {
  @apply font-mono text-sm bg-gray-100 px-1 py-0.5 rounded;
}

.markdown-content pre code {
  @apply bg-transparent p-0 text-white;
}

.markdown-content blockquote {
  @apply border-l-4 border-gray-300 pl-4 italic my-4;
}

.markdown-content a {
  @apply text-blue-600 hover:underline;
}

.markdown-content table {
  @apply w-full border-collapse my-4;
}

.markdown-content th,
.markdown-content td {
  @apply border border-gray-300 p-2;
}

.markdown-content th {
  @apply bg-gray-100 font-bold;
}
.markdown-content {
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.2em 0 0.6em;
    font-weight: 600;
  }

  img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  pre {
    background: #f6f8fa;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;

    code {
      background: transparent !important;
      font-family: "Fira Code", monospace;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;

    th,
    td {
      padding: 0.8rem;
      border: 1px solid #e4e7ed;
    }

    th {
      background-color: #f8f9fa;
    }
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  blockquote {
    border-left: 4px solid #409eff;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #666;
  }
}

.blur-container {
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  :deep(*) {
    user-select: none;
    -webkit-user-select: none;
  }
}
/* 原有样式保持不变 */

/* 优化图片样式 */
.prose :deep(img) {
  @apply w-full h-auto my-4 rounded-lg shadow-md;
  max-width: 100% !important;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* 深度选择器优化代码块样式 */
.prose :deep(pre) {
  @apply bg-gray-900 p-4 rounded-lg my-6 overflow-x-auto;
  position: relative;

  &::before {
    content: attr(data-lang);
    @apply absolute right-4 top-2 text-sm text-gray-400;
  }

  code {
    @apply text-gray-100 font-mono text-sm;
    background: transparent !important;
  }
}

/* 合并Markdown样式 */
.markdown-content {
  @apply leading-relaxed text-gray-800;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-bold mt-6 mb-3;
  }

  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }

  /* 优化表格样式 */
  table {
    @apply w-full my-6 shadow-sm;

    th {
      @apply bg-gray-50 text-gray-700 font-medium;
    }

    td {
      @apply bg-white;
    }

    th,
    td {
      @apply px-4 py-3 border border-gray-200 align-top;
    }
  }

  /* 优化列表样式 */
  ul,
  ol {
    @apply pl-8 my-4;

    li {
      @apply mb-2;
    }
  }

  /* 优化引用块 */
  blockquote {
    @apply border-l-4 border-blue-500 bg-blue-50 text-gray-700 px-4 py-3 my-6;
  }
}

/* 响应式优化 */
@media (max-width: 768px) {
  .prose :deep(img) {
    @apply rounded-none -mx-4;
    width: calc(100% + 2rem);
    max-width: calc(100% + 2rem);
  }
}
.prose :deep(img) {
  @apply w-full h-auto my-4 rounded-lg shadow-md;
  display: block;
  max-width: 100% !important;
  object-fit: contain;
}

/* 增强代码块样式 */
.prose :deep(pre) {
  @apply bg-gray-900 p-4 rounded-lg my-6 overflow-x-auto relative;

  &::before {
    content: attr(data-lang);
    @apply absolute right-4 top-2 text-sm text-gray-400;
  }

  code {
    @apply text-gray-100 font-mono text-sm leading-relaxed;
    background: transparent !important;
  }
}

/* 优化Markdown整体排版 */
.markdown-content {
  @apply leading-relaxed text-gray-800;

  h1,
  h2,
  h3 {
    @apply text-2xl font-bold mt-8 mb-4 border-b pb-2;
  }

  h2 {
    @apply text-xl;
  }
  h3 {
    @apply text-lg;
  }

  p {
    @apply my-4 leading-7;
  }

  /* 优化列表样式 */
  ul,
  ol {
    @apply pl-8 my-4;

    li {
      @apply mb-2;

      &::marker {
        @apply text-gray-500;
      }
    }
  }

  /* 优化表格样式 */
  table {
    @apply w-full my-6 shadow-sm border-collapse;

    th {
      @apply bg-gray-50 text-gray-700 font-medium p-3 text-left;
    }

    td {
      @apply bg-white p-3 border-t border-gray-200;
    }
  }

  /* 优化引用块 */
  blockquote {
    @apply border-l-4 border-blue-500 bg-blue-50 text-gray-700 px-4 py-3 my-6;
  }
}

/* 移动端优化 */
@media (max-width: 768px) {
  .prose :deep(img) {
    @apply rounded-none -mx-4;
    width: calc(100% + 2rem);
    max-width: calc(100% + 2rem);
  }

  .markdown-content {
    h1 {
      @apply text-xl;
    }
    h2 {
      @apply text-lg;
    }
    h3 {
      @apply text-base;
    }
  }
}
.prose :deep(pre) {
  .hljs-tag,
  .hljs-name,
  .hljs-attr {
    color: #7dd3fc; /* 调整标签颜色 */
  }

  .hljs-template-variable {
    color: #f472b6; /* 添加模板变量高亮 */
  }
}
.prose :deep(pre[data-lang="vue"]) {
  @apply border-l-4 border-purple-500;
}
</style>
