<template>
    <div class="bg-[#f6f9f8]">
      <div class="">
        <!-- 头部标题 -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-[#1f2937]">个人中心</h1>
        </div>
  
        <!-- 主内容布局 -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- 左侧导航 -->
          <div class="lg:col-span-1 space-y-4">
            <!-- 用户信息卡片 -->
            <el-card class="!border-none shadow-sm hover:shadow-md transition-shadow">
              <div class="flex flex-col items-center p-4">
                <el-avatar 
                  :size="80" 
                  :src="userInfo.avatar" 
                  class="!border-2 !border-white !shadow-md"
                />
                <h3 class="mt-4 text-lg font-semibold text-gray-800">{{ userInfo.name }}</h3>
                <p class="text-sm text-gray-500">{{ userInfo.role }}</p>
                <div class="mt-3 text-xs text-gray-400">
                  最后登录: {{ userInfo.lastLogin }}
                </div>
              </div>
            </el-card>
  
            <!-- 设置导航 -->
            <el-card class="!border-none shadow-sm">
              <el-menu 
                :default-active="activeMenu" 
                class="!border-none"
              >
                <el-menu-item index="1" @click="activeMenu = '1'">
                  <el-icon><User /></el-icon>
                  <span>基本设置</span>
                </el-menu-item>
                <el-menu-item index="2" @click="activeMenu = '2'">
                  <el-icon><Lock /></el-icon>
                  <span>安全设置</span>
                </el-menu-item>
                <el-menu-item index="3" @click="activeMenu = '3'">
                  <el-icon><Histogram /></el-icon>
                  <span>登录记录</span>
                </el-menu-item>
              </el-menu>
            </el-card>
          </div>
  
          <!-- 右侧内容区 -->
          <div class="lg:col-span-3">
            <!-- 基本设置 -->
            <transition name="el-fade-in">
              <div v-show="activeMenu === '1'" class="space-y-6">
                <el-card class="!border-none shadow-sm">
                  <template #header>
                    <div class="flex items-center text-lg font-medium">
                      <el-icon class="mr-2"><User /></el-icon>
                      基本信息
                    </div>
                  </template>
  
                  <el-form 
                    :model="form" 
                    label-width="100px" 
                    label-position="left"
                    class="max-w-2xl"
                  >
                    <el-form-item label="用户名">
                      <el-input 
                        v-model="form.username" 
                        placeholder="请输入用户名"
                        class="!max-w-xs"
                      />
                    </el-form-item>
                    
                    <el-form-item label="手机号">
                      <el-input 
                        v-model="form.phone" 
                        placeholder="请输入手机号"
                        class="!max-w-xs"
                      />
                    </el-form-item>
  
                    <el-form-item label="个人简介">
                      <el-input
                        v-model="form.bio"
                        type="textarea"
                        :rows="3"
                        placeholder="请填写个人简介"
                        maxlength="150"
                        show-word-limit
                      />
                    </el-form-item>
  
                    <el-form-item>
                      <el-button type="primary" size="large">保存更改</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
  
                <el-card class="!border-none shadow-sm">
                  <template #header>
                    <div class="flex items-center text-lg font-medium">
                      <el-icon class="mr-2"><Crop /></el-icon>
                      头像设置
                    </div>
                  </template>
  
                  <div class="flex items-center gap-8">
                    <el-avatar :size="120" :src="form.avatar" />
                    <div class="space-y-4">
                      <el-upload action="#">
                        <template #trigger>
                          <el-button type="primary">上传新头像</el-button>
                        </template>
                      </el-upload>
                      <p class="text-sm text-gray-400">
                        支持 JPG/PNG 格式，大小不超过 2MB
                      </p>
                    </div>
                  </div>
                </el-card>
              </div>
            </transition>
  
            <!-- 安全设置 -->
            <transition name="el-fade-in">
              <div v-show="activeMenu === '2'" class="space-y-6">
                <el-card 
                  v-for="item in securityItems" 
                  :key="item.title"
                  class="!border-none shadow-sm"
                >
                  <div class="flex items-center justify-between p-4">
                    <div>
                      <h4 class="font-medium text-gray-800">{{ item.title }}</h4>
                      <p class="text-sm text-gray-400 mt-1">{{ item.desc }}</p>
                    </div>
                    <el-button 
                      :type="item.verified ? 'success' : 'primary'" 
                      plain 
                      size="small"
                    >
                      {{ item.verified ? '已绑定' : '立即绑定' }}
                    </el-button>
                  </div>
                </el-card>
              </div>
            </transition>
  
            <!-- 登录记录 -->
            <transition name="el-fade-in">
              <div v-show="activeMenu === '3'">
                <el-card class="!border-none shadow-sm">
                  <el-table 
                    :data="loginLogs" 
                    style="width: 100%"
                    class="custom-table"
                  >
                    <el-table-column prop="date" label="登录时间" width="180" />
                    <el-table-column prop="ip" label="IP地址" width="150" />
                    <el-table-column prop="location" label="登录地点" />
                    <el-table-column prop="device" label="设备">
                      <template #default="{ row }">
                        <el-tag 
                          :type="deviceType[row.device]" 
                          size="small"
                          class="!rounded-md"
                        >
                          {{ row.device }}
                        </el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                  
                  <div class="mt-6 flex justify-center">
                    <el-pagination 
                      v-model:current-page="pagination.current"
                      :page-size="pagination.pageSize"
                      :total="pagination.total"
                      layout="prev, pager, next"
                      background
                    />
                  </div>
                </el-card>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { User, Lock, Histogram, Crop } from '@element-plus/icons-vue'
  
  // 用户信息
  const userInfo = reactive({
    name: 'Admin',
    role: '系统管理员',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    lastLogin: '2024-03-20 14:30:21'
  })
  
  // 表单数据
  const form = reactive({
    username: 'Admin',
    phone: '138****1234',
    bio: '专注于电商系统后台管理，提供高效的系统解决方案',
    avatar: ''
  })
  
  // 安全设置项
  const securityItems = ref([
    { title: '登录密码', desc: '已设置密码，建议定期更换', verified: true },
    { title: '绑定手机', desc: '已绑定手机：138****1234', verified: true },
    { title: '绑定邮箱', desc: '未绑定邮箱', verified: false }
  ])
  
  // 登录记录
  const loginLogs = ref([
    { date: '2024-03-20 14:30', ip: '192.168.1.1', location: '中国上海', device: 'PC' },
    // 更多数据...
  ])
  
  // 设备类型样式
  const deviceType:any = {
    'PC': '',
    'Mobile': 'success',
    'Tablet': 'warning'
  }
  
  // 分页
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    total: 50
  })
  
  // 当前激活菜单
  const activeMenu = ref('1')
  </script>
  
  <style scoped>
  /* 自定义表格样式 */
  :deep(.custom-table) {
    --el-table-border-color: transparent;
    --el-table-header-bg-color: #f8fafc;
  }
  
  :deep(.custom-table .el-table__row) {
    transition: all 0.3s;
  }
  
/* 自定义过渡效果 */
.el-fade-in-enter-active,
.el-fade-in-leave-active {
  transition: opacity 0.3s ease;
}
.el-fade-in-enter-from,
.el-fade-in-leave-to {
  opacity: 0;
}

/* 覆盖Element Plus默认样式 */
.el-card {
  --el-card-border-color: transparent;
}

.el-table {
  --el-table-border-color: transparent;
  --el-table-header-bg-color: #f8fafc;
}

.el-menu-item {
  height: 48px;
  color: #4b5563;
}

.el-menu-item:hover {
  background-color: #f3f4f6;
}

.el-menu-item.is-active {
  color: var(--el-color-primary);
  background-color: rgba(var(--el-color-primary-rgb), 0.05);
}
  </style>
  