<template>
    <div class="min-h-screen bg-gray-50">


        <!-- 主体内容 -->
        <main class="max-w-7xl mx-auto px-4 py-8">
            <div class="flex flex-col lg:flex-row gap-8">
                <!-- 侧边导航 -->
                <aside class="lg:w-64 space-y-2">
                    <el-menu :default-active="activeTab" class="rounded-lg shadow-lg" @select="handleMenuSelect">
                        <el-menu-item index="profile">
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>个人信息</span>
                        </el-menu-item>
                        <el-menu-item index="orders">
                            <el-icon>
                                <Tickets />
                            </el-icon>
                            <span>我的订单</span>
                        </el-menu-item>
                    </el-menu>
                </aside>

                <!-- 内容区域 -->
                <div class="flex-1">
                    <!-- 个人信息 -->
                    <section v-if="activeTab === 'profile'" class="bg-white p-6 rounded-xl shadow-lg">
                        <h2 class="text-2xl font-bold mb-6">个人信息</h2>
                        <div class="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                            <div class="flex items-center space-x-3">
                                <el-icon class="text-gray-600">
                                    <UserFilled />
                                </el-icon>
                                <span class="text-sm text-gray-600 font-medium">账户身份</span>
                                <el-tag :type="userLevelMap[storeLoginUser?.role?.permissions || userLevel].type"
                                    effect="dark"
                                    class="!font-semibold !text-sm !px-3 !py-1.5 !rounded-full shadow-sm transition-all">
                                    <span class="flex items-center">
                                        <el-icon class="mr-1">
                                            <component
                                                :is="userLevelMap[storeLoginUser?.role?.permissions || userLevel].icon" />
                                        </el-icon>
                                        {{ userLevelMap[storeLoginUser?.role?.permissions || userLevel].label }}
                                    </span>
                                </el-tag>
                                <el-tooltip v-if="storeLoginUser?.role?.permissions === userLevel" class="box-item"
                                    effect="dark" content="升级VIP可享受更多权益" placement="top-start">
                                    <el-button type="primary" color="rgb(239 68 68)" size="small" @click="upgradeVip">
                                        升级VIP
                                    </el-button>
                                </el-tooltip>
                            </div>
                        </div>

                        <el-form :model="profileForm" label-width="100px" class="max-w-2xl">
                            <el-form-item label="设置用户名">
                                <el-input v-model="profileForm.username" placeholder="请输入用户名" />
                            </el-form-item>
                            <el-form-item label="设置电子邮箱">
                                <el-input v-model="profileForm.email" placeholder="请输入电子邮箱" />
                            </el-form-item>
                            <el-form-item label="设置手机号码">
                                <el-input v-model="profileForm.phone" placeholder="请输入手机号码" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="updateProfile">更新信息</el-button>
                            </el-form-item>
                        </el-form>
                    </section>

                    <!-- 订单列表 -->
                    <section v-if="activeTab === 'orders'" class="space-y-4">
                        <order-sort />
                    </section>


                </div>
            </div>
        </main>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import userInfo from '../../piniaStore/userInfo';
import orderSort from '../order/orderSort.vue';
import {
    User,
    Tickets,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';



// 响应式数据
const activeTab = ref('profile')
const userLevel = ref(1) // 0:普通 1:VIP 2:SVIP
const userInfoStore = userInfo();
const router = useRouter()
const { storeLoginUser } = userInfoStore;

const userLevelMap: any = {
    0: {
        type: 'warning',
        icon: 'User StarFilled',
        label: '超级管理员'
    },
    1: {
        type: 'info',
        icon: 'User',
        label: '普通会员'
    },
    2: {
        type: 'danger',
        icon: 'Crown',
        label: 'VIP会员'
    }
}
const profileForm = ref({
    username: storeLoginUser.username,
    email: storeLoginUser.email,
    phone: storeLoginUser.phone
})





const upgradeVip = () => {
    router.push('/vip')
}
const updateProfile = () => {
    // 更新个人信息的逻辑
}


const handleMenuSelect = (key: string) => {
    activeTab.value = key
}
</script>
  
<style scoped>
.el-menu {
    border-right: none;
}

.el-menu-item {
    @apply h-12 !important;
}

.el-divider {
    @apply my-4;
}

.el-table {
    --el-table-border-color: transparent;
    --el-table-header-bg-color: theme('colors.gray.50');
}

.el-image {
    transition: transform 0.3s ease;
}

.el-image:hover {
    transform: scale(1.05);
}
</style>
  