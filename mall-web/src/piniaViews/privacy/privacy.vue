<template>
  <div class="privacy-container bg-gradient-to-b from-gray-50 to-white">
    <!-- 页眉区域 -->
    <header class="policy-header bg-white shadow-sm">
      <div class="max-w-5xl mx-auto px-4 py-8 text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-3 relative">
          <span class="text-red-600">隐私</span>权政策
          <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded-full"></div>
        </h1>
        <div class="flex items-center justify-center space-x-4 mt-4">
          <el-tag type="danger" effect="dark">更新日期</el-tag>
          <span class="text-gray-500 font-mono">2023-12-01</span>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="max-w-5xl mx-auto px-4 py-12">
      <!-- 信息收集模块 -->
      <section class="info-section mb-20">
        <div class="text-center mb-12">
          <h2 class="section-title">
            <el-icon :size="28" class="mr-2 text-red-600"><Lock /></el-icon>
            我们如何收集信息
          </h2>
          <p class="text-gray-500 mt-2">遵循最小必要原则，保障您的数据安全</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="info-card group">
            <div class="card-icon bg-red-100">
              <el-icon :size="32" class="text-red-600"><User /></el-icon>
            </div>
            <h3>主动提供</h3>
            <ul class="space-y-2">
              <li v-for="item in activeInfo" :key="item" class="flex items-center">
                <el-icon :size="14" class="mr-2 text-gray-400"><Check /></el-icon>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="info-card group">
            <div class="card-icon bg-blue-100">
              <el-icon :size="32" class="text-blue-600"><Cpu /></el-icon>
            </div>
            <h3>自动收集</h3>
            <ul class="space-y-2">
              <li v-for="item in autoInfo" :key="item" class="flex items-center">
                <el-icon :size="14" class="mr-2 text-gray-400"><Check /></el-icon>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 信息使用时间轴 -->
      <section class="timeline-section mb-20">
        <div class="text-center mb-12">
          <h2 class="section-title">
            <el-icon :size="28" class="mr-2 text-red-600"><Opportunity /></el-icon>
            信息使用场景
          </h2>
          <p class="text-gray-500 mt-2">您的数据只在必要场景下被使用</p>
        </div>

        <div class="relative pl-8 border-l-2 border-gray-200 ml-4">
          <div 
            v-for="(item, index) in usageCases" 
            :key="index"
            class="mb-10 relative timeline-node"
          >
            <div class="timeline-dot bg-red-600"></div>
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div class="flex items-center mb-3">
                <el-tag :type="index%2 ? 'danger' : 'info'" effect="plain" round>
                  {{ `场景 0${index+1}` }}
                </el-tag>
                <span class="ml-3 font-medium text-gray-900">{{ item.title }}</span>
              </div>
              <p class="text-gray-600 leading-relaxed">{{ item.content }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 用户权利模块 -->
      <section class="rights-section">
        <div class="text-center mb-12">
          <h2 class="section-title">
            <el-icon :size="28" class="mr-2 text-red-600"><Key /></el-icon>
            您的数据权利
          </h2>
          <p class="text-gray-500 mt-2">完全掌控个人数据的处理方式</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(right, index) in rights" 
            :key="index"
            class="right-card bg-white p-6 rounded-xl border hover:border-red-100 transition-all"
          >
            <div class="w-12 h-12 mb-4 rounded-lg flex items-center justify-center" 
                 :class="right.bgColor">
              <el-icon :size="24" :color="right.iconColor">{{ right.icon }}</el-icon>
            </div>
            <h3 class="mb-2 font-medium">{{ right.title }}</h3>
            <p class="text-gray-500 text-sm">{{ right.desc }}</p>
          </div>
        </div>

        <div class="mt-12 text-center bg-red-50 p-8 rounded-2xl">
          <p class="text-lg font-medium mb-4">📮 联系我们行使权利</p>
          <el-button 
            type="danger" 
            size="large" 
            class="shadow-lg hover:scale-105 transition-transform"
          >
            <el-icon class="mr-2"><Message /></el-icon>
            legal@codebase.com
          </el-button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Lock, User, Check, Cpu, Opportunity, Key, Message } from '@element-plus/icons-vue'

const activeInfo = [
  '注册账户信息',
  '订单交易记录',
  '客服沟通内容',
  '实名认证资料'
]

const autoInfo = [
  '设备标识信息',
  '服务日志记录',
  'Cookies数据',
  '地理位置信息'
]

const usageCases = [
  {
    title: '订单处理',
    content: '完成商品交易、开具电子发票及售后服务'
  },
  {
    title: '安全防护',
    content: '检测异常登录、防范网络攻击与欺诈行为'
  },
  {
    title: '服务优化',
    content: '分析功能使用情况，持续改进产品体验'
  },
  {
    title: '法律合规',
    content: '配合监管部门进行必要的数据提供'
  }
]

const rights = [
  {
    icon: 'Search',
    title: '访问权',
    desc: '随时查询个人数据的处理情况',
    bgColor: 'bg-red-100',
    iconColor: '#dc2626'
  },
  {
    icon: 'Edit',
    title: '更正权',
    desc: '更新或修改不准确的个人信息',
    bgColor: 'bg-blue-100',
    iconColor: '#2563eb'
  },
  {
    icon: 'Delete',
    title: '删除权',
    desc: '在特定条件下请求删除数据',
    bgColor: 'bg-green-100',
    iconColor: '#16a34a'
  },
  {
    icon: 'Close',
    title: '撤回权',
    desc: '撤回已同意的数据使用授权',
    bgColor: 'bg-purple-100',
    iconColor: '#9333ea'
  }
]
</script>

<style scoped>
.privacy-container {
  min-height: 100vh;
}

.policy-header {
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}

.section-title {
  @apply text-3xl font-bold text-gray-900 inline-flex items-center;
}

.info-card {
  @apply bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all border border-transparent hover:border-red-100;
  
  h3 {
    @apply text-xl font-semibold mb-4 text-gray-900;
  }
  
  ul {
    @apply text-gray-600;
  }
}

.card-icon {
  @apply w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
         transition-transform group-hover:scale-110;
}

.timeline-node {
  &::before {
    content: '';
    @apply absolute w-4 h-4 bg-white border-2 border-red-600 rounded-full -left-8 top-5;
  }
}

/* .timeline-dot {
  @apply absolute w-3 h-3 rounded-full -left-7.5 top-6;
} */

.right-card {
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 768px) {
  .section-title {
    @apply text-2xl;
  }
  
  .policy-header h1 {
    @apply text-3xl;
  }
  
  .timeline-section {
    @apply pl-0 ml-0 border-l-0;
    
 
  }
  .timeline-node::before {
      @apply hidden;
    }
}
</style>
