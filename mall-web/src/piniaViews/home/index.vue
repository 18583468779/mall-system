<script setup lang="ts">
import footerNav from '../../components/footer.vue';
import { ref } from 'vue';

interface Category {
    id: number;
    name: string;
    icon: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    discount?: number;
    image: string;
}

const categories = ref<Category[]>([
    { id: 1, name: '手机数码', icon: 'icon-phone' },
    { id: 2, name: '家用电器', icon: 'icon-appliance' },
    { id: 3, name: '服饰鞋包', icon: 'icon-clothes' },
    { id: 4, name: '食品生鲜', icon: 'icon-food' },
]);

const products = ref<Product[]>([
    {
        id: 1,
        name: '无线降噪耳机 主动降噪 超长续航',
        price: 399,
        originalPrice: 599,
        discount: 7,
        image: 'https://via.placeholder.com/300x300'
    },
    {
        id: 2,
        name: '智能手表 运动健康监测 防水',
        price: 899,
        originalPrice: 1299,
        image: 'https://via.placeholder.com/300x300'
    },
    // 其他商品数据...
]);
</script>
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- 修改后的导航栏 -->
        <header class="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-[0.7rem]">
            <div class="mx-auto px-[0.2rem] h-full flex items-center justify-between">
                <div class="flex items-center space-x-[0.2rem]">
                    <i class="iconfont icon-menu text-[0.32rem] text-gray-600"></i>
                    <h1 class="text-[0.32rem] font-bold text-red-500">E-Shop</h1>
                </div>
                <div class="flex items-center space-x-[0.2rem]">
                    <i class="iconfont icon-search text-[0.32rem] text-gray-600"></i>
                    <i class="iconfont icon-cart text-[0.32rem] text-gray-600"></i>
                </div>
            </div>
        </header>

        <!-- 调整后的搜索框 -->
        <div class="pt-[0.7rem] px-[0.2rem]">
            <div class="mx-auto py-[0.15rem]">
                <div class="bg-white rounded-full shadow-sm flex items-center px-[0.2rem] h-[0.6rem]">
                    <input type="text" placeholder="搜索商品..." class="flex-1 outline-none text-[0.24rem]">
                    <i class="iconfont icon-search text-gray-400 text-[0.3rem]"></i>
                </div>
            </div>
        </div>

        <!-- 适配后的轮播图 -->
        <section class="mx-auto px-[0.2rem] py-[0.15rem]">
            <div class="rounded-[0.1rem] overflow-hidden shadow-lg">
                <div class="swiper-container h-[3.5rem] bg-gray-200">
                    <div class="h-full flex overflow-x-auto snap-x">
                        <img v-for="i in 3" :key="i" src="https://via.placeholder.com/600x400"
                            class="w-full flex-shrink-0 snap-start h-[3.5rem] object-cover">
                    </div>
                </div>
            </div>
        </section>

        <!-- 适配后的商品分类 -->
        <section class="mx-auto px-[0.2rem] py-[0.2rem]">
            <div class="grid grid-cols-4 gap-[0.15rem] text-center">
                <div v-for="category in categories" :key="category.id"
                    class="p-[0.1rem] hover:bg-gray-50 rounded-[0.1rem] transition-colors">
                    <div
                        class="w-[0.8rem] h-[0.8rem] mx-auto mb-[0.1rem] bg-red-100 rounded-full flex items-center justify-center">
                        <i :class="category.icon" class="text-[0.4rem] text-red-500"></i>
                    </div>
                    <span class="text-[0.24rem] text-gray-600">{{ category.name }}</span>
                </div>
            </div>
        </section>

        <!-- 调整后的商品列表 -->
        <main class="mx-auto px-[0.2rem] py-[0.15rem]">
            <h2 class="text-[0.3rem] font-bold mb-[0.2rem]">热销推荐</h2>
            <div class="grid grid-cols-2 gap-[0.15rem]">
                <div v-for="product in products" :key="product.id"
                    class="bg-white rounded-[0.1rem] shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
                    <div class="h-[3rem] bg-gray-200 relative">
                        <img :src="product.image" class="w-full h-full object-cover">
                        <div v-if="product.discount"
                            class="absolute top-[0.1rem] right-[0.1rem] bg-red-500 text-white px-[0.1rem] py-[0.05rem] rounded-full text-[0.2rem]">
                            {{ product.discount }}折
                        </div>
                    </div>
                    <div class="p-[0.1rem]">
                        <h3 class="text-[0.24rem] font-medium line-clamp-2 mb-[0.05rem]">{{ product.name }}</h3>
                        <div class="flex items-center justify-between">
                            <div>
                                <span class="text-red-500 font-bold text-[0.24rem]">¥{{ product.price }}</span>
                                <span class="text-gray-400 text-[0.2rem] line-through ml-[0.05rem]">¥{{
                                    product.originalPrice }}</span>
                            </div>
                            <i class="iconfont icon-cart text-red-500 text-[0.3rem]"></i>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- 页脚适配 -->
        <footer class="py-[0.3rem] text-center text-[0.2rem] text-gray-500">
            <p>© 2025 E-Shop 版权所有</p>
        </footer>
        <!-- 底部导航栏 -->
        <footerNav />
    </div>
</template>

<style>
/* 保持原有rem基准设置 */


/* 覆盖Tailwind容器宽度 */
.container {
    max-width: 100% !important;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
}

/* 自定义间距 */
.space-x-\[0\.2rem\]> :not([hidden])~ :not([hidden]) {
    margin-left: 0.2rem;
}

/* 新增底部导航动画 */
.footer-nav {
    transition: transform 0.3s ease;
}

/* 购物车按钮动效 */
.add-cart-btn {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.add-cart-btn:active {
    transform: scale(0.95);
}
</style>