<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 导航栏 -->
    <headerComponent />
    <!-- 右侧固定导航 -->
    <rightComponent />
    <!-- 内容 -->
    <div class="pt-16">
      <router-view />
    </div>
    <!-- 底部导航 -->
    <footer-nav />
  </div>
</template>

<script setup lang="ts"></script>
