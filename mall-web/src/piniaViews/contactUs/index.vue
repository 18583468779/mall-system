<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <!-- 页面标题 -->
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-12">
      联系我们
      <span class="block text-lg font-normal text-gray-600 mt-2"
        >Get in touch with us</span
      >
    </h1>

    <!-- 主要内容容器 -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- 联系方式卡片 -->
      <div class="space-y-8">
        <!-- 微信联系 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="flex items-start space-x-6">
            <div class="p-4 bg-green-100 rounded-xl">
              <i class="fab fa-weixin text-3xl text-green-600"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">微信联系</h3>
              <p class="text-gray-600 mb-4">扫码添加客服微信</p>
              <div class="w-36 h-36 bg-gray-200 rounded-lg overflow-hidden">
                <!-- 替换为真实二维码 -->
                <img
                  src=""
                  alt="微信二维码"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- QQ联系 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="flex items-start space-x-6">
            <div class="p-4 bg-blue-100 rounded-xl">
              <i class="fab fa-qq text-3xl text-blue-600"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">QQ联系</h3>
              <p class="text-gray-600 mb-4">客服QQ：123456789</p>
              <a
                href="http://wpa.qq.com/msgrd?v=3&uin=123456789&site=qq&menu=yes"
                class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                立即咨询
              </a>
            </div>
          </div>
        </div>

        <!-- 邮箱联系 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="flex items-start space-x-6">
            <div class="p-4 bg-red-100 rounded-xl">
              <i class="fas fa-envelope text-3xl text-red-600"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">邮箱联系</h3>
              <p class="text-gray-600 mb-4">商务合作：contact@example.com</p>
              <a
                href="mailto:contact@example.com"
                class="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                发送邮件
              </a>
            </div>
          </div>
        </div>

        <!-- 闲鱼联系 -->
        <div
          class="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <div class="flex items-start space-x-6">
            <div class="p-4 bg-orange-100 rounded-xl">
              <i class="fas fa-shopping-cart text-3xl text-orange-600"></i>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">闲鱼交易</h3>
              <p class="text-gray-600 mb-4">担保交易更放心</p>
              <a
                href="https://2.taobao.com/"
                class="inline-block bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                target="_blank"
              >
                前往闲鱼
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧服务介绍 -->
      <div class="space-y-8">
        <!-- 核心优势 -->
        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-bold text-blue-600 mb-6 flex items-center">
            <i class="fas fa-medal text-3xl mr-3"></i>
            我们的优势
          </h2>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="(item, index) in advantages"
              :key="index"
              class="p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <i :class="item.icon" class="text-xl text-blue-500 mb-2"></i>
              <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 源码产品 -->
        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-bold text-purple-600 mb-6 flex items-center">
            <i class="fas fa-code text-3xl mr-3"></i>
            源码产品
          </h2>
          <div class="space-y-4">
            <div
              v-for="(item, index) in products"
              :key="index"
              class="flex items-start p-4 border-l-4 border-purple-500 bg-purple-50"
            >
              <i class="fas fa-check text-purple-600 mr-3 mt-1"></i>
              <div>
                <h3 class="font-semibold text-gray-800">{{ item.title }}</h3>
                <p class="text-gray-600">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 技术服务 -->
        <div class="bg-white p-8 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-bold text-green-600 mb-6 flex items-center">
            <i class="fas fa-headset text-3xl mr-3"></i>
            技术支持
          </h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div
              class="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg"
            >
              <h3 class="font-semibold text-lg text-gray-800 mb-2">
                🛠 标准服务
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  7×12小时在线支持
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  紧急问题1小时响应
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  免费基础部署指导
                </li>
              </ul>
            </div>

            <div
              class="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
            >
              <h3 class="font-semibold text-lg text-gray-800 mb-2">
                💎 VIP服务
              </h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-center">
                  <i class="fas fa-gem text-purple-500 mr-2"></i>
                  7×24小时专属服务
                </li>
                <li class="flex items-center">
                  <i class="fas fa-gem text-purple-500 mr-2"></i>
                  30分钟极速响应
                </li>
                <li class="flex items-center">
                  <i class="fas fa-gem text-purple-500 mr-2"></i>
                  定制化开发支持
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部信息 -->
    <div class="mt-16 text-center text-gray-600">
      <p class="mb-2">办公时间：周一至周五 9:00 - 18:00</p>
      <p>© 2023 源码商城. All rights reserved. 京ICP备12345678号</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// 服务数据
const advantages = [
  {
    icon: "fas fa-lock",
    title: "安全可靠",
    desc: "全站https加密，担保交易保障",
  },
  {
    icon: "fas fa-cloud-download-alt",
    title: "即时交付",
    desc: "支付成功后自动发送下载链接",
  },
  {
    icon: "fas fa-sync",
    title: "持续更新",
    desc: "购买后享1年免费更新服务",
  },
  {
    icon: "fas fa-file-code",
    title: "代码规范",
    desc: "专业级代码架构，详细注释",
  },
];

const products = [
  {
    title: "企业级解决方案",
    desc: "ERP/OA/CRM等完整系统源码",
  },
  {
    title: "电商系统",
    desc: "支持多商户的B2B2C商城系统",
  },
  {
    title: "小程序套件",
    desc: "包含20+常用小程序模板",
  },
  {
    title: "快速开发平台",
    desc: "基于Spring Cloud的微服务架构",
  },
];
</script>

<style scoped>
.shadow-gradient {
  box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.1),
    0 4px 6px -2px rgba(99, 102, 241, 0.05);
}
</style>
