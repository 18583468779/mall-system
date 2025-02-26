<template>
    <div class="content">
        <div class="thrdctgys">
            <span class="thrdctgys-item">全部</span>
        </div>
        <div class="thrdctgys " v-for="(item) in isReadyOpen ? getSubThirdCtgyList : getThirdCtgyList"
            :key="item.thirdctgyid">
            <span :class="['thrdctgys-item', item.isSelected && 'thrdctgys-isSelected']"
                @click="handleSelectThird(item)">{{
                    item.thirdctgyname
                }}</span>
        </div>
        <div class="icon">
            <span v-show="isReadyOpen" @click="opOrCollapseInBook(false)">
                <i>
                    <svg t="1740490070186" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2308" width="32" height="32">
                        <path
                            d="M838.116 732.779 877.7 693.195 511.979 327.549 146.3 693.195 185.883 732.779 512.003 406.652Z"
                            p-id="2309"></path>
                    </svg>
                </i>
            </span>
            <span v-show="!isReadyOpen" @click="opOrCollapseInBook(true)">
                <i>
                    <svg t="1740490091339" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3298" width="32" height="32">
                        <path
                            d="M185.884 327.55 146.3 367.133 512.021 732.779 877.7 367.133 838.117 327.55 511.997 653.676Z"
                            p-id="3299"></path>
                    </svg>
                </i>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { FstToThrdCtgy } from '../../ctgy/service';
const { opOrCollapseInBook, handleSelectThird } = FstToThrdCtgy
const { getSubThirdCtgyList, getThirdCtgyList, isReadyOpen } = FstToThrdCtgy.storeRefs;
watch(
    () => [getSubThirdCtgyList, getThirdCtgyList],
    (newVal) => {
        console.log('数据变化:', newVal);
    },
    { deep: true } // 深度监听
);
</script>

<style scoped lang="scss">
.content {
    margin-top: 0.3rem;
    width: 5.04rem;
    position: relative;

    .thrdctgys {
        float: left;
        font-size: 0.23rem;
        margin-right: 0.4rem;
        height: 0.48rem;

        &-item {
            text-shadow: 0 0 0.01rem grey;
            padding: 0.04rem 0.2rem;
        }
    }

    .thrdctgys-isSelected {
        background: lightcoral;
        color: white;
        border-radius: 0.1rem;
    }

    .icon {
        position: relative;
        display: inline;
    }
}
</style>