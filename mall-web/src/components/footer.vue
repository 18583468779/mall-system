<template>
  <footer class="bg-white border-t border-gray-200">
    <!-- 主要Footer内容 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <!-- 关于我们 -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">关于我们</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-600 hover:text-red-600 transition-colors">品牌故事</a></li>
            <li><a href="#" class="text-gray-600 hover:text-red-600 transition-colors">加入团队</a></li>
            <li><a href="#" class="text-gray-600 hover:text-red-600 transition-colors">技术博客</a></li>
          </ul>
        </div>

        <!-- 客户支持 -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">客户支持</h3>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-600 hover:text-red-600 transition-colors">技术支持</a></li>
            <li><a href="#" class="text-gray-600 hover:text-red-600 transition-colors">退款政策</a></li>
            <li><a href="#" class="text-gray-600 hover:text-red-600 transition-colors">使用指南</a></li>
          </ul>
        </div>

        <!-- 法律声明 -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">法律声明</h3>
          <ul class="space-y-3">
            <li><a href="/privacy" class="text-gray-600 hover:text-red-600 transition-colors">隐私政策</a></li>
            <li><a href="/disclaimer" class="text-gray-600 hover:text-red-600 transition-colors">免责声明</a></li>
            <li><a href="/terms" class="text-gray-600 hover:text-red-600 transition-colors">服务条款</a></li>
          </ul>
        </div>

        <!-- 订阅和社交 -->
        <div class="col-span-2 md:col-span-1">
          <h3 class="text-gray-900 font-semibold mb-4">保持联系</h3>
          <div class="flex space-x-4 mb-6">
            <a href="#" class="text-gray-500 hover:text-red-600">
              <el-icon :size="24">
                <Message />
              </el-icon>
            </a>
            <a href="#" class="text-gray-500 hover:text-red-600">
              <el-icon :size="24">
                <ChatLineRound />
              </el-icon>
            </a>
            <a href="#" class="text-gray-500 hover:text-red-600">
              <el-icon :size="24">
                <Monitor />
              </el-icon>
            </a>
          </div>


        </div>
      </div>

      <!-- 底部版权信息 -->
      <div class="border-t border-gray-200 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex space-x-4 mb-4 md:mb-0">
            <span class="text-sm text-gray-500">© 2023 代码小库 版权所有</span>
            <a href="https://beian.miit.gov.cn" target="_blank"
              class="text-sm text-gray-500 hover:text-red-600 transition-colors">
              沪ICP备2023012345号
            </a>
          </div>

          <div class="flex space-x-6">
            <router-link to="/agreement" class="text-sm text-gray-500 hover:text-red-600 transition-colors">用户协议</router-link>
            <router-link to="/privacy" class="text-sm text-gray-500 hover:text-red-600 transition-colors">隐私政策</router-link>
            <router-link to="/disclaimer" class="text-sm text-gray-500 hover:text-red-600 transition-colors">免责声明</router-link>
            <router-link to="/copyrightPolicy" class="text-sm text-gray-500 hover:text-red-600 transition-colors">版权声明</router-link>

          </div>
        </div>
      </div>
      <div class="mt-4 text-center md:text-left">
        <p class="text-xs text-gray-400">
          本站所有内容（包括代码、文档、图片）均受著作权法保护，
          任何未经授权的复制、传播、反向工程等行为均构成侵权
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  Message,
  ChatLineRound,
  Monitor
} from '@element-plus/icons-vue'
</script>

<style scoped>
/* 移动端优化 */
@media (max-width: 768px) {
  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .social-section {
    grid-column: span 2;
  }
}</style>
