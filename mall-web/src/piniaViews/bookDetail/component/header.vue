<template>
    <div class="header" v-show="headAndDegree" :style="headerOpacity">
        <span class="left-arrow"><i class="iconfont icon-zuojiantoul" @click="handleBack">
                <svg t="1742173035753" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3597" width="16" height="16">
                    <path d="M474.496 512l338.752-338.752-90.496-90.496L293.504 512l429.248 429.248 90.496-90.496z"
                        fill="#666666" p-id="3598"></path>
                </svg>

            </i></span>
        <div class="header-wrapper">
            <span :class="{ 'item-active': index === activeIndex }" @click="switchTab(index)"
                v-for="(list, index) in navList" :key="list.name">
                <router-link replace :to="{ name: list.name, params: { from: list.from } }">
                    {{ list.title }}
                </router-link>
            </span>

        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../../../router';
import BooksDetail, { EvaluateClass } from '../service/index';

const { headerOpacity } = BooksDetail;
const { headAndDegree } = EvaluateClass.storeRef
const navList = [
    {
        title: '商品',
        name: 'goods',
        from: 'evaluate',
        path: '/goods'
    },
    {
        title: '详情',
        name: 'goods',
        from: 'evaluate',
        path: '/goods'
    },
    {
        title: '评论',
        name: 'evaluate',
        from: 'goods',
        path: '/evaluate'
    },
    {
        title: '相关',
        from: 'goods',
        name: 'evaluate',
        path: '/evaluate'
    }
];

const activeIndex = ref(0)
function switchTab(index: number) {
    activeIndex.value = index
}
const handleBack = () => {
    router.back()
}
</script>

<style scoped lang="scss">
.header {
    position: fixed;
    left: 0rem;
    top: 0rem;
    height: 0.5rem;
    z-index: 999;
    background: white;

    .left-arrow {
        position: absolute;
        top: -0.05rem;
        left: 0.2rem;
        font-size: 0.4rem;
    }

    &-wrapper {
        width: 5.4rem;
        height: 0.5rem;
        gap: 0.35rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.2rem;
        color: black;

        a {
            color: inherit;
            text-decoration: none;
        }

        .item-active {
            color: red;

            border-bottom: 0.04rem solid #f5344f;

        }
    }

}
</style>