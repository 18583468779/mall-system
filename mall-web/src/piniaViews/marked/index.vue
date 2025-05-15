<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-10"
  >
    <!-- 头部 -->
    <header class="mb-12 text-center space-y-4">
      <h1 class="text-5xl font-bold bg-gradient-to-r text-black bg-clip-text">
        项目工坊
      </h1>
      <p class="text-lg text-gray-600">
        探索实战项目，提升开发技能， 在线文档的形式，方便练习
      </p>
      <div class="rounded-lg shadow-sm p-4 mb-4">
        <div class="max-w-3xl mx-auto mb-12 flex gap-3">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索项目名称..."
            size="large"
            clearable
            class="rounded-2xl shadow-lg"
          >
            <template #prefix>
              <el-icon class="text-xl"><search /></el-icon>
            </template>
          </el-input>
          <el-button
            type="primary"
            size="large"
            class="w-28"
            color="#1D4ED8"
            @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </div>
    </header>
    <!-- 空状态展示 -->
    <div
      v-if="dataList.length === 0"
      class="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in"
    >
      <div class="relative max-w-md text-center space-y-6">
        <!-- 动态图标容器 -->
        <div class="flex justify-center mb-8">
          <div class="relative w-32 h-32">
            <!-- 背景渐变圆 -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-lg opacity-75 animate-pulse-slow"
            ></div>

            <!-- 主图标 -->
            <div
              class="relative flex items-center justify-center w-32 h-32 bg-white rounded-3xl shadow-2xl border-8 border-white/10"
            >
              <svg
                class="w-16 h-16 text-blue-500 animate-float"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- 文字内容 -->
        <h2 class="text-3xl font-bold text-gray-800">
          {{ searchKeyword ? "没有找到相关项目" : "空空如也" }}
        </h2>
        <p class="text-lg text-gray-500 leading-relaxed">
          {{
            searchKeyword
              ? `没有找到与“${searchKeyword}”相关的项目，换个关键词试试吧~`
              : "当前还没有添加项目，敬请期待..."
          }}
        </p>

        <!-- 当有搜索关键词时显示重置按钮 -->
        <div v-if="searchKeyword" class="mt-6">
          <el-button
            type="primary"
            size="large"
            class="rounded-xl px-8 shadow-md hover:shadow-lg transition-all"
            @click="resetSearch"
          >
            <template #icon>
              <el-icon><Refresh /></el-icon>
            </template>
            重置搜索
          </el-button>
        </div>
      </div>
    </div>
    <!-- 项目网格 -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
    >
      <div
        v-for="project in dataList"
        :key="project.booklet_id"
        class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        @click="handleProjectClick(project.booklet_id)"
      >
        <!-- 项目封面图 -->
        <div class="relative aspect-video overflow-hidden">
          <img
            :src="project.cover_image"
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div class="absolute top-3 right-3 flex space-x-2"></div>
        </div>

        <!-- 项目内容 -->
        <div class="p-6">
          <div class="flex items-center mb-4">
            <h3 class="text-2xl font-bold text-gray-800">
              {{ project.title }}
            </h3>
          </div>
          <p class="text-gray-600 mb-5 leading-relaxed">
            {{ project.description }}
          </p>

          <!-- 技术栈标签 -->
          <div class="flex flex-wrap gap-2 mb-6">
            <el-tag
              v-for="(tag, index) in project.tags"
              :key="index"
              :type="tagType(tag)"
              effect="plain"
              class="rounded-full px-3 shadow-sm"
            >
              {{ tag }}
            </el-tag>
          </div>

          <!-- 行动按钮 -->
          <div class="flex gap-3">
            <el-button
              type="primary"
              class="flex-1 rounded-xl h-12 shadow-md hover:shadow-lg"
              color="black"
            >
              立即体验
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div v-if="dataList.length > 0" class="flex justify-center">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :background="true"
        layout="prev, pager, next"
        :total="dataList.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import request from "../../utils/axiosUtil";

const router = useRouter();

interface Project {
  booklet_id: number;
  cover_image: string;
  description: string;
  price: number;
  tags?: string[];
  tech?: "vue" | "react" | "js" | "node";
  icon?: any;
  title: string;
}

const searchKeyword = ref("");
const currentPage = ref(1);
const pageSize = 8;
const dataList = ref<Array<Project>>([]);

onMounted(() => {
  handleGetProject();
});
const handleGetProject = async () => {
  let res: any = await request.get("/bookletmodule/getBookletList", false);
  if (res.code == 200) {
    dataList.value = res.data;
  }
};

const handleSearch = async () => {
  if (searchKeyword.value) {
    let res: any = await request.post(
      "/bookletmodule/getBookletListKeyword",
      false,
      {
        keyword: searchKeyword.value,
      }
    );
    if (res.code == 200) {
      dataList.value = res.data;
    }
  }
};
const resetSearch = () => {
  searchKeyword.value = "";
  handleGetProject(); // 重新获取原始数据
};
const tagType = (tag: string) => {
  const typeMap: Record<string, string> = {
    Vue3: "success",
    React18: "primary",
    TypeScript: "",
    "Node.js": "danger",
    "Web Workers": "info",
  };
  return typeMap[tag] || "info";
};

const handleProjectClick = (id: number) => {
  router.push({ name: "marked.detail", params: { id: id.toString() } });
};
</script>

<style scoped>
.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.el-pagination.is-background .el-pager li:not(.is-disabled):hover {
  color: #3b82f6;
}

.el-tag {
  @apply transition-transform duration-200 hover:scale-105;
}

.el-button {
  @apply transition-all duration-300 hover:opacity-90;
}
/* 添加自定义动画 */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>
