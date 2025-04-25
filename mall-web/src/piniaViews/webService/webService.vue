<template>
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <!-- 主内容区 -->
      <main class="container mx-auto px-4">
        <!-- 个人服务介绍 -->
        <section class="text-center py-16 md:py-24">
          <div class="max-w-2xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              个人网站托管服务
            </h1>
            <p class="text-lg text-gray-600 mb-8">
              提供经济实惠的网站托管方案<br>
              <span class="text-sm opacity-75">（个人开发者，用心做好每个项目）</span>
            </p>
            <el-button 
              type="danger" 
              size="large" 
              class="!px-8 !rounded-full shadow-lg hover:!shadow-xl"
              @click="scrollToPricing"
            >
              查看方案
            </el-button>
          </div>
        </section>
  
        <!-- 服务特色 -->
        <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div 
            v-for="(item, index) in features"
            :key="index"
            class="bg-white p-6 rounded-xl border border-red-100 hover:shadow-md transition-all"
          >
            <el-icon :size="40" class="text-red-500 mb-4">
              <component :is="item.icon" />
            </el-icon>
            <h3 class="text-xl font-semibold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </section>
  
        <!-- 定价方案 -->
        <section class="py-12" id="pricing">
          <h2 class="text-3xl font-bold text-center mb-8">托管方案</h2>
          <div class="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <!-- 基础方案 -->
            <div class="bg-white p-8 rounded-2xl border-2 border-red-100">
              <div class="text-center mb-6">
                <span class="text-sm font-semibold text-red-600">适合小型网站</span>
                <h3 class="text-2xl font-bold my-4">基础托管</h3>
                <p class="text-4xl font-bold text-red-600">
                  ¥99<span class="text-lg text-gray-500">/月</span>
                </p>
              </div>
              <el-divider />
              <ul class="space-y-3 mb-6 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <el-icon class="text-red-500"><Check /></el-icon>
                  PHP/Node.js 环境
                </li>
                <li class="flex items-center gap-2">
                  <el-icon class="text-red-500"><Check /></el-icon>
                  5GB 存储空间
                </li>
                <li class="flex items-center gap-2">
                  <el-icon class="text-red-500"><Check /></el-icon>
                  每月技术支持
                </li>
              </ul>
              <el-button type="danger" plain class="w-full">选择此方案</el-button>
            </div>
  
            <!-- 定制方案 -->
            <div class="bg-red-50 p-8 rounded-2xl border-2 border-red-200">
              <div class="text-center mb-6">
                <span class="text-sm font-semibold text-red-600">按需定制</span>
                <h3 class="text-2xl font-bold my-4">专属方案</h3>
                <p class="text-2xl font-bold text-red-600">
                  面议
                </p>
              </div>
              <el-divider />
              <ul class="space-y-3 mb-6 text-sm text-gray-600">
                <li class="flex items-center gap-2">
                  <el-icon class="text-red-500"><Check /></el-icon>
                  个性化配置
                </li>
                <li class="flex items-center gap-2">
                  <el-icon class="text-red-500"><Check /></el-icon>
                  专属技术支持
                </li>
                <li class="flex items-center gap-2">
                  <el-icon class="text-red-500"><Check /></el-icon>
                  长期合作优惠
                </li>
              </ul>
              <el-button type="danger" class="w-full">联系定制</el-button>
            </div>
          </div>
        </section>
  
        <!-- 技术栈 -->
        <section class="py-12 bg-white rounded-2xl mb-16">
          <div class="max-w-4xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">技术支持</h2>
            <div class="grid grid-cols-3 md:grid-cols-5 gap-4">
              <div 
                v-for="tech in technologies"
                class="flex flex-col items-center p-4 hover:bg-red-50 rounded-lg transition-colors"
              >
                <img 
                  :src="tech.icon" 
                  class="h-12 w-12 object-contain mb-2"
                  :alt="tech.name"
                >
                <span class="text-sm text-gray-600">{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import {
    Check,
    Tools,
    Service,
    Connection
  } from '@element-plus/icons-vue'
  
  const technologies = [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' }
  ]
  
  const features = [
    {
      icon: Tools,
      title: '快速部署',
      desc: '提供主流框架的快速配置（WordPress/Nuxt.js/Express等）'
    },
    {
      icon: Service,
      title: '可靠维护',
      desc: '每月定期安全检查与备份，保障网站稳定运行'
    },
    {
      icon: Connection,
      title: '灵活扩展',
      desc: '根据业务增长随时调整服务器配置'
    }
  ]
  
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }
  </script>
  
  <style scoped>
  .el-button.is-plain {
    @apply hover:!bg-red-50 hover:!text-red-600;
  }
  
  .el-button--danger {
    @apply hover:!bg-red-600/90;
  }
  
  .el-divider {
    --el-border-color: rgb(254 226 226);
  }
  </style>
  