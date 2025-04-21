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
                        <el-menu-item index="cart">
                            <el-icon>
                                <ShoppingCart />
                            </el-icon>
                            <span>购物车</span>
                            <el-badge :value="cartCount" class="!ml-2" />
                        </el-menu-item>
                        <el-menu-item index="favorites">
                            <el-icon>
                                <Star />
                            </el-icon>
                            <span>我的收藏</span>
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
                        <div v-for="order in orders" :key="order.id" class="bg-white p-6 rounded-xl shadow-lg">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="font-bold">订单号: {{ order.id }}</h3>
                                    <p class="text-gray-500 text-sm">{{ order.date }}</p>
                                </div>
                                <el-tag :type="orderStatusType(order.status)">
                                    {{ order.status }}
                                </el-tag>
                            </div>
                            <el-divider />
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div v-for="item in order.items" :key="item.id" class="flex items-center">
                                    <el-avatar :size="60" :src="item.cover" class="flex-shrink-0" />
                                    <div class="ml-4">
                                        <h4 class="font-medium">{{ item.name }}</h4>
                                        <p class="text-red-600 font-bold">¥{{ item.price }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- 购物车 -->
                    <section v-if="activeTab === 'cart'" class="bg-white p-6 rounded-xl shadow-lg">
                        <el-table :data="cartItems" class="w-full">
                            <el-table-column prop="name" label="商品名称" />
                            <el-table-column label="封面">
                                <template #default="{ row }">
                                    <el-avatar :size="60" :src="row.cover" />
                                </template>
                            </el-table-column>
                            <el-table-column prop="price" label="价格" />
                            <el-table-column label="操作">
                                <template #default="{ row }">
                                    <el-button type="danger" size="small" @click="removeFromCart(row.id)">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="mt-6 text-right">
                            <span class="text-xl font-bold mr-4">总金额: ¥{{ totalAmount }}</span>
                            <el-button type="primary" size="large">结算</el-button>
                        </div>
                    </section>

                    <!-- 收藏列表 -->
                    <section v-if="activeTab === 'favorites'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div v-for="item in favorites" :key="item.id"
                            class="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <el-image :src="item.cover" class="w-full h-48 rounded-lg object-cover mb-4" fit="cover" />
                            <h3 class="font-bold mb-2">{{ item.name }}</h3>
                            <div class="flex justify-between items-center">
                                <span class="text-red-600 font-bold">¥{{ item.price }}</span>
                                <el-button type="danger" size="small" @click="removeFavorite(item.id)">
                                    取消收藏
                                </el-button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import userInfo from '../../piniaStore/userInfo';
import {
    User,
    ShoppingCart,
    Star,
    Tickets,
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';


interface Order {
    id: string
    date: string
    status: string
    items: CartItem[]
}

interface CartItem {
    id: string
    name: string
    cover: string
    price: number
}

// 响应式数据
const activeTab = ref('profile')
const cartCount = computed(() => cartItems.value.length)
const totalAmount = computed(() => cartItems.value.reduce((sum, item) => sum + item.price, 0))
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

const orders = ref<Order[]>([
    {
        id: '202307280001',
        date: '2023-07-28',
        status: '已完成',
        items: [
            { id: '1', name: '电商后台管理系统', cover: 'https://example.com/cover1.jpg', price: 299 },
            { id: '2', name: '数据可视化大屏', cover: 'https://example.com/cover2.jpg', price: 199 }
        ]
    }
])

const cartItems = ref<CartItem[]>([
    { id: '3', name: '企业级CMS系统', cover: 'https://example.com/cover3.jpg', price: 499 },
    { id: '4', name: '微信小程序模板', cover: 'https://example.com/cover4.jpg', price: 299 }
])

const favorites = ref<CartItem[]>([
    { id: '5', name: 'React后台模板', cover: 'https://example.com/cover5.jpg', price: 399 },
    { id: '6', name: 'Vue3管理后台', cover: 'https://example.com/cover6.jpg', price: 599 }
])

// 方法
const orderStatusType = (status: string) => {
    const map: Record<string, string> = {
        '已完成': 'success',
        '待支付': 'warning',
        '已取消': 'info'
    }
    return map[status] || 'info'
}

const upgradeVip = () => {
    router.push('/vip')
}
const updateProfile = () => {
    // 更新个人信息的逻辑
}

const removeFromCart = (id: string) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
}

const removeFavorite = (id: string) => {
    favorites.value = favorites.value.filter(item => item.id !== id)
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
  