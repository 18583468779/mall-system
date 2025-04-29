<template>
    <div class="h-screen flex">
        <!-- 左侧目录导航 -->
        <el-aside width="280px" class="h-full border-r bg-gray-50 overflow-y-auto">
            <div class="p-4">
                <h2 class="text-xl font-bold mb-4">目录</h2>
                <el-menu :default-active="activeChapter" @select="handleSelectChapter">
                    <template v-for="(chapter, index) in chapters" :key="chapter.id">
                        <!-- 章节标题 -->
                        <el-menu-item :index="chapter.id.toString()" :class="{ 'is-free': chapter.isFree }">
                            <span class="mr-2">第{{ index + 1 }}章</span>
                            {{ chapter.title }}
                            <el-tag v-if="chapter.isFree" size="mini" class="ml-2">免费</el-tag>
                        </el-menu-item>

                        <!-- 子章节 -->
                        <template v-for="sub in chapter.children" :key="sub.id">
                            <el-menu-item :index="sub.id.toString()" class="pl-8!" :class="{
                                'is-locked': !sub.isFree && !hasPurchased,
                                'is-free': sub.isFree
                            }">
                                <span class="text-sm">{{ sub.title }}</span>
                                <el-icon v-if="!sub.isFree && !hasPurchased" class="ml-2">
                                    <Lock />
                                </el-icon>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>

                <!-- 购买提示 -->
                <div v-if="!hasPurchased" class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 class="font-medium text-yellow-800 mb-2">付费小册</h3>
                    <p class="text-sm text-yellow-700 mb-4">
                        {{ previewChaptersCount }}章免费试读，购买后解锁全部{{ totalChapters }}章节
                    </p>
                    <el-button type="primary" class="w-full" @click="showPurchaseDialog = true">
                        立即购买 ￥{{ price }}
                    </el-button>
                </div>
            </div>
        </el-aside>

        <!-- 右侧内容区域 -->
        <el-main class="h-full overflow-y-auto bg-white">
            <div class="max-w-3xl mx-auto p-6">
                <!-- 付费提示 -->
                <div v-if="currentChapter?.needPay" class="mb-8 p-6 border rounded-lg bg-gray-50">
                    <div class="blur-sm pointer-events-none">
                        <h1 class="text-2xl font-bold mb-4">{{ currentChapter.title }}</h1>
                        <div class="prose" v-html="currentChapter.previewContent" />
                    </div>
                    <div class="text-center mt-6">
                        <el-button type="primary" size="large" @click="showPurchaseDialog = true">
                            解锁完整内容
                        </el-button>
                        <p class="mt-2 text-sm text-gray-500">
                            已试读{{ previewChaptersCount }}个章节，剩余{{ lockedChaptersCount }}章待解锁
                        </p>
                    </div>
                </div>

                <!-- 正常内容 -->
                <template v-else>
                    <h1 class="text-2xl font-bold mb-6">{{ currentChapter.title }}</h1>
                    <div class="prose" v-html="currentChapter.content" />
                </template>
            </div>
        </el-main>

        <!-- 购买对话框 -->
        <el-dialog v-model="showPurchaseDialog" title="购买小册" width="500px">
            <div class="p-4">
                <p class="mb-4">您正在购买《{{ title }}》</p>
                <div class="flex items-center mb-6">
                    <span class="mr-2">价格：</span>
                    <span class="text-2xl text-red-600 font-bold">￥{{ price }}</span>
                </div>
                <el-divider />
                <div class="grid grid-cols-3 gap-4">
                    <el-button class="col-span-1">
                        <img src="https://img.icons8.com/color/48/000000/alipay.png" class="h-6 mr-2">
                        支付宝
                    </el-button>
                    <el-button class="col-span-1">
                        <img src="https://img.icons8.com/color/48/000000/wechat.png" class="h-6 mr-2">
                        微信支付
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Lock } from '@element-plus/icons-vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
let { id } = defineProps<{
    id: string
}>();
console.log('id', id)
// 配置Markdown解析
marked.setOptions({
    highlight: (code, lang) => {
        return hljs.highlightAuto(code).value
    }
})

// 静态数据
const title = ref('TypeScript 全面指南')
const price = ref(39.9)
const hasPurchased = ref(false) // 购买状态
const showPurchaseDialog = ref(false)
const activeChapter = ref('1')

// 章节数据
interface Chapter {
    id: number
    title: string
    content: string
    previewContent?: string
    isFree: boolean
    children?: Chapter[]
    needPay?: boolean
}

const chapters = ref<Chapter[]>([
    {
        id: 1,
        title: 'TypeScript 基础',
        isFree: true,
        content: marked(`
  ## 基础类型
  \`\`\`typescript
  let isDone: boolean = false
  let decimal: number = 6
  let color: string = "blue"
  \`\`\`
      `),
        children: [
            {
                id: 11,
                title: '类型注解',
                isFree: true,
                content: marked('## 类型注解内容...')
            }
        ]
    },
    {
        id: 2,
        title: '高级类型',
        isFree: false,
        previewContent: marked('前200字预览内容...'),
        content: marked('完整高级类型内容...'),
        needPay: true,
        children: [
            {
                id: 21,
                title: '联合类型',
                isFree: false,
                content: marked('完整联合类型内容...')
            }
        ]
    }
])

// 计算当前章节
const currentChapter = computed(() => {
    return findChapter(activeChapter.value)
})

// 实用函数：查找章节
const findChapter = (id: string): Chapter => {
    let result: Chapter | undefined
    const search = (items: Chapter[]) => {
        items.forEach(item => {
            if (item.id.toString() === id) result = item
            if (item.children) search(item.children)
        })
    }
    search(chapters.value)
    return result || {
        id: 0,
        title: '未找到',
        content: '',
        isFree: false
    }
}

// 章节统计
const previewChaptersCount = computed(() => {
    return chapters.value.filter(c => c.isFree).length
})

const totalChapters = computed(() => {
    return chapters.value.length
})

const lockedChaptersCount = computed(() => {
    return totalChapters.value - previewChaptersCount.value
})

// 切换章节
const handleSelectChapter = (id: string) => {
    const chapter = findChapter(id)
    if (!chapter.isFree && !hasPurchased.value) {
        chapter.needPay = true
    }
    activeChapter.value = id
}
</script>
  
<style scoped>
/* 自定义菜单项样式 */
.el-menu-item.is-free {
    @apply bg-blue-50 hover:bg-blue-100;
}

.el-menu-item.is-locked {
    @apply text-gray-400 cursor-not-allowed;
}

/* Markdown 内容样式 */
.prose {
    @apply text-gray-800 leading-relaxed;
}

.prose :deep(h2) {
    @apply text-xl font-bold mt-8 mb-4;
}

.prose :deep(pre) {
    @apply bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto;
}

.prose :deep(code) {
    @apply bg-gray-100 text-red-600 px-1 py-0.5 rounded;
}
</style>
  