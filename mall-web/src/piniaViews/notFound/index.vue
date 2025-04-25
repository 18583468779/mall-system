<template>
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-3xl mx-auto text-center">
          <!-- 动态数字显示 -->
          <div class="relative inline-block mb-8">
            <span class="text-[120px] md:text-[200px] font-bold text-red-500 opacity-20">
              404
            </span>
            <div class="absolute inset-0 flex items-center justify-center">
              <el-icon :size="80" class="text-red-500 animate-pulse">
                <Warning />
              </el-icon>
            </div>
          </div>
  
          <!-- 主要提示 -->
          <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            页面消失在了数字宇宙中
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            可能的原因：<br>
            <span class="text-sm text-red-400">
              • 输入了错误的网址 • 页面已被移除 • 发生了小型网络黑洞
            </span>
          </p>
  
          <!-- 操作按钮 -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <el-button
              type="danger"
              size="large"
              class="!px-8 !rounded-full shadow-lg hover:!shadow-xl"
              @click="$router.go(-1)"
            >
              <template #icon>
                <el-icon><ArrowLeft /></el-icon>
              </template>
              返回上一页
            </el-button>
            
            <el-button
              type="danger"
              plain
              size="large"
              class="!px-8 !rounded-full"
              @click="$router.push('/')"
            >
              <template #icon>
                <el-icon><HomeFilled /></el-icon>
              </template>
              回到首页
            </el-button>
          </div>
  
          <!-- 趣味提示 -->
          <div class="mt-12 animate-bounce">
            <el-icon :size="24" class="text-red-400 mr-2"><MagicStick /></el-icon>
            <span class="text-sm text-gray-500">
              小贴士：在地址栏输入正确的咒语可以打开隐藏页面哦
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {
    Warning,
    ArrowLeft,
    HomeFilled,
    MagicStick
  } from '@element-plus/icons-vue'
  </script>
  
  <style scoped>
  /* 自定义数字动画 */
  @keyframes disappear {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1); }
  }
  
  .animate-pulse {
    animation: disappear 2s ease-in-out infinite;
  }
  </style>
  