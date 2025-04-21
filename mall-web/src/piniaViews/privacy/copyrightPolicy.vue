<template>
  <div class="copyright-container bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <!-- 页眉区域 -->
    <header class="header-section bg-white shadow-sm">
      <div class="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 class="title-text relative inline-block">
          <span class="text-gradient">版权政策</span>
          <div class="title-underline"></div>
        </h1>
        <div class="flex items-center justify-center mt-6 space-x-3">
          <el-tag type="danger" effect="dark" round>当前版本</el-tag>
          <div class="version-info">
            <span class="font-mono">v2.1</span>
            <span class="text-gray-500 ml-2">更新于2023-12-15</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <!-- 授权体系 -->
      <section class="policy-card group">
        <div class="card-label bg-blue-600">
          <el-icon><DocumentChecked /></el-icon>
        </div>
        <h2 class="card-title">
          <el-icon class="icon-blue"><ScaleToOriginal /></el-icon>
          授权范围与使用规范
        </h2>
        <div class="card-content">
          <div class="license-steps">
            <div 
              v-for="(item, index) in licenseScopes" 
              :key="index"
              class="license-step"
              :class="[`step-${index + 1}`]"
            >
              <div class="step-header">
                <div class="step-icon">
                  <component :is="item.icon" />
                </div>
                <h3 class="step-title">{{ item.title }}</h3>
                <el-tag :type="item.tagType" effect="plain" class="!ml-2">
                  {{ item.tag }}
                </el-tag>
              </div>
              <p class="step-desc">{{ item.desc }}</p>
              <div class="step-details" v-if="item.details">
                <p class="detail-title">包含权利：</p>
                <ul class="detail-list">
                  <li v-for="(detail, dIndex) in item.details" :key="dIndex">
                    <el-icon class="text-green-600 mr-2"><Select /></el-icon>
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 侵权处理流程 -->
      <section class="policy-card group border-2 border-red-50">
        <div class="card-label bg-red-600">
          <el-icon><Warning /></el-icon>
        </div>
        <h2 class="card-title">
          <el-icon class="icon-red"><Timer /></el-icon>
          侵权处理流程
        </h2>
        <div class="card-content">
          <div class="process-timeline">
            <div 
              v-for="(step, index) in infringementProcess" 
              :key="index"
              class="process-step"
              :class="[`step-${index + 1}`]"
            >
              <div class="timeline-marker">
                <div class="timeline-icon">
                  <component :is="step.icon" />
                </div>
                <div class="timeline-line"></div>
              </div>
              <div class="step-content">
                <div class="step-header">
                  <h3 class="step-title">{{ step.title }}</h3>
                  <div class="step-time">
                    <el-icon class="mr-1"><Clock /></el-icon>
                    {{ step.time }}
                  </div>
                </div>
                <p class="step-desc">{{ step.desc }}</p>
                <div class="step-actions" v-if="step.actions">
                  <el-button 
                    v-for="(action, aIndex) in step.actions" 
                    :key="aIndex"
                    :type="action.type" 
                    size="small"
                    class="!rounded-full"
                  >
                    {{ action.text }}
                  </el-button>
                </div>
                <div class="legal-clause" v-if="step.clause">
                  <el-icon class="text-red-600 mr-2"><Document /></el-icon>
                  法律依据：{{ step.clause }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { 
  DocumentChecked, ScaleToOriginal, Warning, Timer,
  User, Sell, Open, Clock, Document
} from '@element-plus/icons-vue'

const licenseScopes = [
  {
    title: '个人学习',
    desc: '非商业用途的代码研究、学习',
    icon: User,
    tag: '免费授权',
    tagType: 'success',
    details: [
      '代码片段下载权限',
      '本地环境调试使用',
      '非公开演示使用'
    ]
  },
  {
    title: '商业应用',
    desc: '用于盈利性项目的生产环境',
    icon: Sell,
    tag: '需购买授权',
    tagType: 'warning',
    details: [
      '商业项目部署权限',
      '产品级技术支援',
      '授权证书获取'
    ]
  },
  {
    title: '二次开发',
    desc: '基于代码的修改与再发布',
    icon: Open,
    tag: '协议限制',
    tagType: 'info',
    details: [
      '遵守原始开源协议',
      '保留版权声明',
      '禁止闭源商业分发'
    ]
  }
]

const infringementProcess = [
  {
    title: '侵权通知受理',
    time: '24小时内响应',
    desc: '收到完整举证材料后的初步处理',
    icon: Document,
    clause: '《信息网络传播权保护条例》第十四条',
    actions: [
      { text: '下载举证模板', type: 'primary' },
      { text: '在线提交', type: 'success' }
    ]
  },
  {
    title: '技术取证分析',
    time: '3个工作日内',
    desc: '技术团队进行代码相似度比对分析',
    icon: Timer,
    clause: '《著作权法》第五十三条'
  },
  {
    title: '处理结果公示',
    time: '7个工作日内',
    desc: '完成侵权判定并通知相关方',
    icon: DocumentChecked,
    clause: '《电子商务法》第四十二条',
    actions: [
      { text: '查看处理报告', type: 'info' }
    ]
  }
]
</script>

<style scoped>
.copyright-container {
  font-family: 'Inter', system-ui, sans-serif;
}

.header-section {
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
}

.title-text {
  @apply text-4xl font-bold tracking-tight;
}

.text-gradient {
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-underline {
  @apply absolute -bottom-4 left-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
         transform -translate-x-1/2 rounded-full;
}

.policy-card {
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
  
  .icon-blue { @apply bg-blue-100 text-blue-600; }
  .icon-red { @apply bg-red-100 text-red-600; }
}

.license-steps {
  @apply grid gap-8 md:grid-cols-3;
}

.license-step {
  @apply p-6 rounded-xl border transition-all hover:shadow-lg;

  &.step-1 {
    @apply border-blue-200 bg-blue-50 hover:border-blue-300;
  }
  &.step-2 {
    @apply border-amber-200 bg-amber-50 hover:border-amber-300;
  }
  &.step-3 {
    @apply border-purple-200 bg-purple-50 hover:border-purple-300;
  }
}

.step-header {
  @apply flex items-start mb-4;
  
  .step-icon {
    @apply w-12 h-12 flex items-center justify-center bg-white 
           rounded-lg shadow-sm mr-4;
    
    .el-icon {
      @apply text-2xl text-blue-600;
    }
  }
}

.step-title {
  @apply text-lg font-semibold text-gray-900;
}

.step-desc {
  @apply text-gray-600 mb-4;
}

.detail-list {
  @apply space-y-2 pl-6;

  li {
    @apply text-gray-700 relative;
    
    &::before {
      content: '';
      @apply absolute -left-4 top-2 w-2 h-2 bg-green-600 rounded-full;
    }
  }
}

.process-timeline {
  @apply relative pl-8 space-y-12;
}

.process-step {
  @apply relative;
  
  &::before {
    content: '';
    @apply absolute left-0 top-8 w-0.5 h-[calc(100%+3rem)] bg-gray-200;
  }
  
  &:last-child::before {
    @apply hidden;
  }
}

.timeline-marker {
  @apply absolute left-0 top-0 -translate-x-[calc(1.5rem+2px)];
}

.timeline-icon {
  @apply w-12 h-12 flex items-center justify-center bg-white 
         rounded-full shadow-lg border-2 border-red-600;
  
  .el-icon {
    @apply text-xl text-red-600;
  }
}

.step-content {
  @apply ml-8 p-6 rounded-xl border border-gray-200 bg-white 
         shadow-sm hover:shadow-md transition-shadow;
}

.legal-clause {
  @apply mt-4 pt-4 border-t border-dashed border-gray-200 
         text-sm text-gray-500;
}

@media (max-width: 768px) {
  .title-text {
    @apply text-3xl;
  }
  
  .policy-card {
    @apply p-6;
  }
  
  .license-steps {
    @apply grid-cols-1;
  }
  
  .process-timeline {
    @apply pl-0;
    
    .timeline-marker {
      @apply hidden;
    }
    
    .step-content {
      @apply ml-0;
    }
  }
}
</style>
