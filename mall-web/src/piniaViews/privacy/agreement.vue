<template>
    <div class="agreement-container bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <!-- 页眉区域 -->
      <header class="header-section bg-white shadow-sm">
        <div class="max-w-5xl mx-auto px-4 py-12 text-center">
          <h1 class="title-text relative inline-block">
            <span class="text-red-600">用户服务</span>协议
            <div class="title-underline"></div>
          </h1>
          <div class="flex items-center justify-center mt-6 space-x-4">
            <el-tag type="danger" effect="dark" round>生效日期</el-tag>
            <span class="text-gray-500 font-mono">2023-12-01</span>
          </div>
        </div>
      </header>
  
      <!-- 协议内容 -->
      <main class="max-w-5xl mx-auto px-4 py-12">
        <!-- 服务内容 -->
        <section class="agreement-card group">
          <div class="card-label bg-red-600">第一章</div>
          <h2 class="card-title">
            <el-icon class="icon-red"><Document /></el-icon>
            服务内容
          </h2>
          <div class="card-content">
            <p class="text-gray-600 mb-4">代码小库平台（以下简称"本平台"）向用户提供包括但不限于：</p>
            <ul class="custom-list">
              <li v-for="(item, index) in services" :key="index">
                <div class="list-marker">{{ index + 1 }}</div>
                {{ item }}
              </li>
            </ul>
          </div>
        </section>
  
        <!-- 账号管理 -->
        <section class="agreement-card group">
          <div class="card-label bg-blue-600">第二章</div>
          <h2 class="card-title">
            <el-icon class="icon-blue"><User /></el-icon>
            账号管理
          </h2>
          <div class="card-content">
            <div class="space-y-4">
              <div v-for="(item, index) in accountRules" :key="index" class="rule-item">
                <el-icon class="text-green-500 mr-2"><Select /></el-icon>
                {{ item }}
              </div>
            </div>
          </div>
        </section>
  
        <!-- 知识产权 -->
        <section class="agreement-card group">
          <div class="card-label bg-purple-600">第三章</div>
          <h2 class="card-title">
            <el-icon class="icon-purple"><Warning /></el-icon>
            知识产权
          </h2>
          <div class="card-content">
            <el-collapse v-model="activeCollapse" accordion>
              <el-collapse-item 
                v-for="(item, index) in intellectualProperties" 
                :key="index"
                :title="item.title"
                class="collapse-item"
              >
                <p class="text-gray-600">{{ item.content }}</p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </section>
  
        <!-- 内容版权 -->
        <section class="agreement-card group border-2 border-red-100">
          <div class="card-label bg-orange-600">第四章</div>
          <h2 class="card-title">
            <el-icon class="text-red-600"><BellFilled /></el-icon>
            内容版权
          </h2>
          <div class="card-content">
            <el-alert type="warning" :closable="false" class="!border-l-4 !border-red-600 !bg-red-50">
              <template #title>
                <span class="text-red-800">严禁未授权搬运行为：</span>
              </template>
            </el-alert>
            <ul class="violation-list">
              <li v-for="(item, index) in violations" :key="index">
                <el-icon class="text-red-500"><CircleCloseFilled /></el-icon>
                {{ item }}
              </li>
            </ul>
            <div class="mt-4 p-4 bg-red-50 rounded-lg">
              <p class="text-sm text-red-700">
                ⚖️ 侵权后果包括：账号封禁、民事索赔、刑事报案
              </p>
            </div>
          </div>
        </section>
  
        <!-- 协议解释 -->
        <section class="agreement-card group">
          <div class="card-label bg-green-600">第五章</div>
          <h2 class="card-title">
            <el-icon class="icon-green"><InfoFilled /></el-icon>
            协议解释
          </h2>
          <div class="card-content">
            <div class="explain-list">
              <div v-for="(item, index) in explanations" :key="index">
                <div class="explain-badge">条款 {{ index + 1 }}</div>
                <p class="explain-text">{{ item }}</p>
              </div>
            </div>
            <div class="mt-8 text-center">
              <el-button 
                type="danger" 
                size="large" 
                class="shadow-lg hover:scale-105 transition-transform"
                @click="$router.push('/')"
              >
                <el-icon class="mr-2"><HomeFilled /></el-icon>
                返回首页
              </el-button>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { 
    Document, User, Select, Warning, BellFilled, 
    CircleCloseFilled, InfoFilled, HomeFilled 
  } from '@element-plus/icons-vue'
  
  const activeCollapse = ref(['0'])
  
  const services = [
    '软件源代码的下载服务',
    '技术文档的在线查阅',
    '定制化开发技术支持',
    '技术咨询服务'
  ]
  
  const accountRules = [
    '使用有效手机号或邮箱完成注册',
    '禁止转让、出租账号（违规永久封禁）',
    '连续12个月未登录的休眠账号将被回收'
  ]
  
  const intellectualProperties = [
    {
      title: '授权范围',
      content: '用户购买源码的使用授权范围以具体商品描述为准'
    },
    {
      title: '二次分发',
      content: '未经许可不得将源码用于商业二次分发'
    },
    {
      title: '著作权保护',
      content: '平台界面设计、文档内容受著作权法保护'
    }
  ]
  
  const violations = [
    '未经许可转载、复制本站技术文档',
    '通过爬虫等手段批量获取代码资源',
    '二次分发已购源码（依据具体授权条款）',
    '去除源码中的版权标识进行传播'
  ]
  
  const explanations = [
    '本协议条款如因法律法规变更导致部分无效，不影响其他条款效力',
    '本平台保留对本协议及各项规则的最终解释权',
    '重大条款变更将通过站内公告或邮件通知'
  ]
  </script>
  
  <style scoped>
  .agreement-container {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  .header-section {
    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  }
  
  .title-text {
    @apply text-4xl font-bold text-gray-900 tracking-tight;
  }
  
  .title-underline {
    @apply absolute -bottom-4 left-1/2 w-24 h-1.5 bg-red-600 transform -translate-x-1/2 
           rounded-full opacity-90;
  }
  
  .agreement-card {
    @apply relative bg-white rounded-2xl shadow-sm p-8 mb-8 
           transition-all hover:shadow-lg border border-gray-100;
  }
  
  .card-label {
    @apply absolute -top-4 left-6 px-4 py-1 text-white text-sm 
           font-medium rounded-full shadow-md;
  }
  
  .card-title {
    @apply text-2xl font-bold mb-6 flex items-center space-x-3 
           border-b pb-4 border-gray-100;
    
    .el-icon {
      @apply text-2xl p-2 rounded-lg;
    }
    
    .icon-red { @apply bg-red-100 text-red-600; }
    .icon-blue { @apply bg-blue-100 text-blue-600; }
    .icon-purple { @apply bg-purple-100 text-purple-600; }
    .icon-green { @apply bg-green-100 text-green-600; }
  }
  
  .custom-list {
    @apply space-y-3;
    
    li {
      @apply flex items-start space-x-3 p-3 rounded-lg 
             hover:bg-gray-50 transition-colors;
    }
    
    .list-marker {
      @apply w-6 h-6 flex items-center justify-center bg-red-600 
             text-white text-sm font-medium rounded-full flex-shrink-0;
    }
  }
  
  .violation-list {
    @apply mt-4 space-y-3;
    
    li {
      @apply flex items-center space-x-2 text-red-700 p-2 
             bg-red-50 rounded-lg border border-red-100;
    }
  }
  
  .explain-list {
    @apply space-y-6;
    
    div {
      @apply relative pl-12;
      
      &::before {
        content: '';
        @apply absolute left-0 top-2 w-8 h-8 bg-green-100 
               rounded-full opacity-80;
      }
    }
  }
  
  .explain-badge {
    @apply absolute left-0 top-0 w-8 h-8 flex items-center justify-center 
           bg-green-600 text-white font-medium rounded-full;
  }
  
  .explain-text {
    @apply text-gray-600 leading-relaxed pl-2;
  }
  
  .collapse-item {
    :deep(.el-collapse-item__header) {
      @apply font-medium text-gray-800 bg-gray-50 px-4 rounded-lg;
    }
    
    :deep(.el-collapse-item__content) {
      @apply pb-4 px-4;
    }
  }
  
  @media (max-width: 768px) {
    .title-text {
      @apply text-3xl;
    }
    
    .agreement-card {
      @apply p-6;
    }
    
    .card-title {
      @apply text-xl;
    }
    
    .custom-list li {
      @apply items-center;
    }
  }
  </style>
  