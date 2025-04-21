<template>
    <div class="disclaimer-container bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <!-- 页眉区域 -->
      <header class="header-section bg-white shadow-sm">
        <div class="max-w-5xl mx-auto px-4 py-12 text-center">
          <h1 class="title-text relative inline-block">
            <span class="text-gradient">免责声明</span>
            <div class="title-underline"></div>
          </h1>
          <div class="flex items-center justify-center mt-6 space-x-3">
            <el-tag type="danger" effect="dark" round>当前版本</el-tag>
            <span class="text-gray-500 font-mono tracking-wide">v1.0</span>
          </div>
        </div>
      </header>
  
      <!-- 主要内容 -->
      <main class="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <!-- 技术免责 -->
        <section class="disclaimer-card group">
          <div class="card-label bg-red-600">
            <el-icon><Warning /></el-icon>
          </div>
          <h2 class="card-title">
            <el-icon class="icon-red"><Cpu /></el-icon>
            技术免责声明
          </h2>
          <div class="card-content">
            <div class="warning-notice !border-l-4 !border-red-600 !bg-red-50">
              <div class="flex items-start">
                <el-icon class="text-red-600 mr-3"><Warning /></el-icon>
                <div>
                  <h3 class="text-red-800 font-medium mb-2">不可抗力因素免责</h3>
                  <p class="text-red-700">因下列技术原因造成的损失，我们不承担责任：</p>
                </div>
              </div>
            </div>
            <ul class="tech-list">
              <li v-for="(item, index) in techDisclaimers" :key="index">
                <div class="list-marker">{{ index + 1 }}</div>
                <div>
                  <p class="list-title">{{ item.title }}</p>
                  <p class="list-desc">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </section>
  
        <!-- 知识产权 -->
        <section class="disclaimer-card group">
          <div class="card-label bg-purple-600">
            <el-icon><Copyright /></el-icon>
          </div>
          <h2 class="card-title">
            <el-icon class="icon-purple"><Files /></el-icon>
            知识产权条款
          </h2>
          <div class="card-content">
            <p class="clause-prompt">用户使用服务即表示承诺：</p>
            <div class="checkbox-grid">
              <div 
                v-for="(item, index) in ipClauses" 
                :key="index"
                class="clause-card"
              >
                <el-icon class="check-icon"><Check /></el-icon>
                <span class="clause-text">{{ item }}</span>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 支持边界 -->
        <section class="disclaimer-card group">
          <div class="card-label bg-blue-600">
            <el-icon><QuestionFilled /></el-icon>
          </div>
          <h2 class="card-title">
            <el-icon class="icon-blue"><Headset /></el-icon>
            技术支持边界
          </h2>
          <div class="card-content">
            <el-collapse v-model="activeCollapse" accordion>
              <el-collapse-item 
                v-for="(item, index) in supportScopes" 
                :key="index"
                :name="index"
                class="collapse-item"
              >
                <template #title>
                  <div class="collapse-title">
                    <el-icon :class="item.iconClass" class="mr-3">{{ item.icon }}</el-icon>
                    {{ item.title }}
                  </div>
                </template>
                <div class="collapse-content">
                  <p class="support-desc">{{ item.desc }}</p>
                  <ul class="support-list" v-if="item.features">
                    <li v-for="(feature, fIndex) in item.features" :key="fIndex">
                      <el-icon class="mr-2 text-green-600"><Select /></el-icon>
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </section>
  
        <!-- 侵权声明 -->
        <section class="disclaimer-card group border-2 border-red-100">
          <div class="card-label bg-orange-600">
            <el-icon><Lawyer /></el-icon>
          </div>
          <h2 class="card-title">
            <el-icon class="text-red-600"><ScaleToOriginal /></el-icon>
            内容侵权声明
          </h2>
          <div class="card-content">
            <div class="checkbox-grid">
              <div 
                v-for="(item, index) in copyrightClauses" 
                :key="index"
                class="clause-card bg-red-50"
              >
                <el-icon class="check-icon text-red-600"><Check /></el-icon>
                <span class="clause-text text-red-800">{{ item }}</span>
              </div>
            </div>
            
            <div class="report-box">
              <div class="flex items-start mb-3">
                <el-icon class="text-red-600 mr-2"><Bell /></el-icon>
                <h3 class="text-red-800 font-medium">侵权举报通道</h3>
              </div>
              <p class="text-gray-700 mb-4">如发现侵权内容，请通过以下任一方式联系：</p>
              <div class="flex flex-col sm:flex-row gap-4">
                <el-button 
                  type="danger" 
                  class="flex-1" 
                  @click="handleEmailClick"
                >
                  <el-icon class="mr-2"><Message /></el-icon>
                  legal@codebase.com
                </el-button>
                <el-button 
                  type="info" 
                  class="flex-1"
                  @click="handlePhoneClick"
                >
                  <el-icon class="mr-2"><Iphone /></el-icon>
                  400-800-1234
                </el-button>
              </div>
              <p class="mt-4 text-sm text-gray-500">响应时效：工作日24小时内处理</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'

  
  const activeCollapse = ref([0])
  
  const techDisclaimers = [
    {
      title: '支付接口故障',
      desc: '第三方支付通道异常导致的交易失败或延迟'
    },
    {
      title: '网络攻击防御',
      desc: '由DDoS等网络攻击引发的服务不可用情况'
    },
    {
      title: '平台访问限制',
      desc: '代码托管平台（GitHub/GitLab等）的访问策略变更'
    }
  ]
  
  const ipClauses = [
    '不侵犯第三方知识产权',
    '严格遵守开源协议限制条款',
    '禁止将代码用于非法用途'
  ]
  
  const supportScopes = [
    {
      title: '基础技术支持',
      desc: '包含以下基础服务支持：',
      icon: 'HelpFilled',
      iconClass: 'text-blue-600',
      features: [
        '开发环境搭建指导',
        '基础配置问题咨询',
        '文档使用问题解答',
        'API接口调试协助'
      ]
    },
    {
      title: '高级技术服务',
      desc: '需购买专项服务包：',
      icon: 'MagicStick',
      iconClass: 'text-purple-600',
      features: [
        '系统集成方案设计',
        '定制化功能开发',
        '私有化部署支持',
        '专属技术顾问服务'
      ]
    }
  ]
  
  const copyrightClauses = [
    '不上传侵犯他人知识产权的材料',
    '不进行反向工程、反编译等行为',
    '不利用本站服务从事盗版分发'
  ]
  
  const handleEmailClick = () => {
    window.location.href = 'mailto:legal@codebase.com'
  }
  
  const handlePhoneClick = () => {
    window.location.href = 'tel:4008001234'
  }
  </script>
  
  <style scoped>
  .disclaimer-container {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  .header-section {
    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  }
  
  .title-text {
    @apply text-4xl font-bold tracking-tight;
  }
  
  .text-gradient {
    background: linear-gradient(45deg, #dc2626, #9333ea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .title-underline {
    @apply absolute -bottom-4 left-1/2 w-24 h-1 bg-gradient-to-r from-red-600 to-purple-600 
           transform -translate-x-1/2 rounded-full;
  }
  
  .disclaimer-card {
    @apply relative bg-white rounded-2xl shadow-sm p-8 
           transition-all hover:shadow-lg border border-gray-100;
  }
  
  .card-label {
    @apply absolute -top-4 left-6 w-9 h-9 flex items-center justify-center 
           rounded-full shadow-lg text-white;
  }
  
  .card-title {
    @apply text-2xl font-bold mb-6 flex items-center space-x-3 
           border-b pb-4 border-gray-100;
    
    .el-icon {
      @apply text-2xl p-2 rounded-lg;
    }
    
    .icon-red { @apply bg-red-100 text-red-600; }
    .icon-purple { @apply bg-purple-100 text-purple-600; }
    .icon-blue { @apply bg-blue-100 text-blue-600; }
  }
  
  .tech-list {
    @apply mt-6 space-y-4;
    
    li {
      @apply flex items-start space-x-4 p-4 rounded-lg bg-gray-50 
             hover:bg-white transition-colors border border-gray-200;
    }
    
    .list-marker {
      @apply w-7 h-7 flex items-center justify-center bg-red-600 
             text-white font-medium rounded-full flex-shrink-0;
    }
    
    .list-title {
      @apply font-medium text-gray-900;
    }
    
    .list-desc {
      @apply text-gray-600 text-sm mt-1;
    }
  }
  
  .checkbox-grid {
    @apply grid grid-cols-1 md:grid-cols-2 gap-4 mt-6;
  }
  
  .clause-card {
    @apply flex items-start p-4 rounded-lg border border-gray-200 
           bg-gray-50 hover:bg-white transition-colors;
    
    .check-icon {
      @apply mt-1 mr-3 text-green-600 flex-shrink-0;
    }
    
    .clause-text {
      @apply text-gray-700 leading-relaxed;
    }
  }
  
  .collapse-item {
    :deep(.el-collapse-item__header) {
      @apply h-auto py-4 !important;
    }
    
    :deep(.el-collapse-item__content) {
      @apply pb-4;
    }
  }
  
  .collapse-title {
    @apply flex items-center text-gray-900 font-medium;
  }
  
  .support-list {
    @apply mt-3 pl-6 space-y-2;
    
    li {
      @apply text-gray-700;
    }
  }
  
  .report-box {
    @apply mt-6 p-6 rounded-xl bg-red-50 border border-red-200;
  }
  
  @media (max-width: 768px) {
    .title-text {
      @apply text-3xl;
    }
    
    .disclaimer-card {
      @apply p-6;
    }
    
    .card-title {
      @apply text-xl;
    }
    
    .checkbox-grid {
      @apply grid-cols-1;
    }
  }
  </style>
  