<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6 md:p-10">
    <!-- 头部 -->
    <header class="mb-12 text-center space-y-4">
      <h1 class="text-5xl font-bold bg-gradient-to-r text-black bg-clip-text text-transparent">
        项目工坊
      </h1>
      <p class="text-lg text-gray-600">探索实战项目，提升开发技能， 在线文档的形式，方便练习</p>

    </header>

    <!-- 搜索栏 -->
    <div class="max-w-3xl mx-auto mb-12">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索项目名称、技术栈或描述..."
        size="large"
        clearable
        class="rounded-2xl shadow-lg"
      >
        <template #prefix>
          <el-icon class="text-xl"><search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 项目网格 -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
      <div 
        v-for="project in paginatedProjects"
        :key="project.id"
        class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        @click="handleProjectClick(project.id)"
      >
        <!-- 项目封面图 -->
        <div class="relative aspect-video overflow-hidden">
          <img 
            :src="project.cover" 
            :alt="project.name"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div class="absolute top-3 right-3 flex space-x-2">
            <el-tag 
              :type="techTypeMap[project.tech]" 
              effect="dark" 
              class="rounded-full shadow-sm"
            >
              {{ project.tech.toUpperCase() }}
            </el-tag>
          </div>
        </div>

        <!-- 项目内容 -->
        <div class="p-6">
          <div class="flex items-center mb-4">
            <el-icon :size="28" class="mr-3" :class="iconColor[project.tech]">
              <component :is="project.icon" />
            </el-icon>
            <h3 class="text-2xl font-bold text-gray-800">{{ project.name }}</h3>
          </div>
          <p class="text-gray-600 mb-5 leading-relaxed">{{ project.description }}</p>
          
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
    <div class="flex justify-center">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :background="true"
        layout="prev, pager, next"
        :total="filteredProjects.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MagicStick as VueIcon,
  Opportunity as ReactIcon,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const router = useRouter()
// 示例图片地址（实际项目需替换为真实地址）
const demoCovers = {
  vue: 'https://source.unsplash.com/random/800x600?vue',
  react: 'https://source.unsplash.com/random/800x600?react',
  js: 'https://source.unsplash.com/random/800x600?javascript',
  node: 'https://source.unsplash.com/random/800x600?nodejs'
}

interface Project {
  id: number
  name: string
  description: string
  tags: string[]
  tech: 'vue' | 'react' | 'js' | 'node'
  icon: any
  cover: string
}

const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = 8

const projects = ref<Project[]>([
  {
    id: 1,
    name: 'Vue3 智能记账本',
    description: '全栈式记账应用，集成数据可视化与多设备同步功能',
    tags: ['Vue3', 'TypeScript', 'ECharts', 'Node.js'],
    tech: 'vue',
    icon: VueIcon,
    cover: demoCovers.vue
  },
  {
    id: 2,
    name: 'React 极简计时器',
    description: '基于React 18的时间管理工具，支持多任务计时',
    tags: ['React18', 'Hooks', 'Tailwind', 'Web Workers'],
    tech: 'react',
    icon: ReactIcon,
    cover: demoCovers.react
  },
  // 更多项目...
])

const techTypeMap = {
  vue: 'success',
  react: 'primary',
  js: 'warning',
  node: 'danger'
}

const iconColor = {
  vue: 'text-green-500',
  react: 'text-blue-500',
  js: 'text-yellow-500',
  node: 'text-red-500'
}

const tagType = (tag: string) => {
  const typeMap: Record<string, string> = {
    'Vue3': 'success',
    'React18': 'primary',
    'TypeScript': '',
    'Node.js': 'danger',
    'Web Workers': 'info'
  }
  return typeMap[tag] || 'info'
}

const filteredProjects = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  return projects.value.filter(proj =>
    proj.name.toLowerCase().includes(keyword) ||
    proj.description.toLowerCase().includes(keyword) ||
    proj.tags.some(tag => tag.toLowerCase().includes(keyword))
  )
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredProjects.value.slice(start, end)
});

const handleProjectClick = (id: number) => {
  router.push({ name: 'marked.detail', params: { id: id.toString() } });
}
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
</style>
