<template>
    <ul class="book-sort">
        <li class="compsive"><span class="inner">综合</span></li>
        <li :class="{ selected: sortField === 'monthsalecount' }" @click="sortBook('monthsalecount')">销量</li>
        <li :class="{ selected: sortField === 'price' }" @click="sortBook('price')">
            价格
            <span class="ascdesc">
                <i v-show="!isReadAsc">
                    <svg t="1740490070186" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2308" width="12" height="12">
                        <path
                            d="M838.116 732.779 877.7 693.195 511.979 327.549 146.3 693.195 185.883 732.779 512.003 406.652Z"
                            p-id="2309"></path>
                    </svg>
                </i>
                <i v-show="isReadAsc">
                    <svg t="1740490091339" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3298" width="12" height="12">
                        <path
                            d="M185.884 327.55 146.3 367.133 512.021 732.779 877.7 367.133 838.117 327.55 511.997 653.676Z"
                            p-id="3299"></path>
                    </svg>
                </i>
            </span>
        </li>
        <li class="shop">店铺</li>
        <li class="dressing">
            筛选
            <i>
                <svg t="1740792326722" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1474" width="16" height="16">
                    <path
                        d="M148.4 114.2l729.2 0.1-0.1 16.7-265.2 177.2-22.2 14.8v537l50 100.1V349.8l287.1-192 0.8-93.6H98l0.7 93.6 285.3 192v418l50-25V323.2l-22-14.9L148.5 131l-0.1-16.8"
                        fill="#999999" p-id="1475"></path>
                    <path d="M703.3 423.2H928v50H703.3zM703.3 583H928v50H703.3zM703.3 742.8H928v50H703.3z"
                        fill="#999999" p-id="1476"></path>
                </svg>

            </i>
        </li>
    </ul>

    <ul class="autocompsearch_incr" v-show="isAutoComSearch">
        <li>当当发货</li>
        <li>促销</li>
        <li class="publisher" ref="pblsTabEle" @click.self="controlPanel()">
            出版社
            <span class="down-or-up-arrow">
                <i class="iconfont icon-zuoce-xiangshangxiaojiantou"></i>
                <i class="iconfont icon-zuoce-xiangxiaxiaojiantousvg"></i>
            </span>
            <div class="publisher-panel" ref="publisherPanelRef">
                <div class="publisher-panel-items">
                    <div class="publisher-panel-item" v-for="item in publisherList" :key="item.publishid">
                        <span>{{ item.publishername }}</span>
                        <span><i class="iconfont icon-duigou2">
                                <svg t="1741957758448" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2395" width="16" height="16">
                                    <path
                                        d="M939.36 218.912a32 32 0 0 1 45.856 44.672l-538.016 552a32 32 0 0 1-43.776 1.92L63.872 526.048a32 32 0 1 1 41.696-48.544l316.768 271.936L939.36 218.88z"
                                        fill="#000000" p-id="2396"></path>
                                </svg>
                            </i></span>
                    </div>
                </div>
                <div class="confirmOrReset">
                    <span class="reset">重置</span>
                    <span class="confirm" @click="findBksByPublishIds">搜索</span>
                </div>
                <div class="overlay"></div>
            </div>

        </li>
        <li>
            作者
            <span class="down-or-up-arrow">
                <i class="iconfont asc icon-zuoce-xiangshangxiaojiantou"></i>
                <i class="iconfont desc icon-zuoce-xiangxiaxiaojiantousvg"></i>
                <i class="iconfont desc icon-zuoce-xiangxiaxiaojiantousvg"></i>
            </span>
        </li>
    </ul>

</template>


<script setup lang="ts">
import Books from '../service';
const { sortBook, isReadAsc, sortField, isAutoComSearch, init, findBksByPublishIds, publisherPanelRef } = Books;
init();
const { publisherList } = Books.storeRefs;

const controlPanel = () => {
    const publisherPanel = publisherPanelRef.value;
    publisherPanel!.className = publisherPanel?.className === 'publisher-panel' ? 'publisher-panel-show' : 'publisher-panel'
}
</script>

<style scoped lang="scss">
.book-sort,
.autocompsearch_incr {
    display: flex;
    font-size: 0.2rem;
    width: 100%;
    margin-left: 0.05rem;
    margin-top: 0.2rem;

    .ascdesc {
        margin-left: 0.05rem;
    }

    >li {
        flex: 1;
        display: flex;
        align-items: center;

        &.selected {
            color: red;
        }
    }
}

.publisher {
    position: relative;

    .publisher-panel {
        display: none;

    }

    .publisher-panel-show {
        top: 0.5rem;
        position: absolute;
        width: 5.4rem;
        left: -2.75rem;
        background-color: #fff;
        box-shadow: 1rem 1rem 1rem #ccc;
        border-top: 1px solid #cccccc63;

        .publisher-panel-items {
            display: grid;
            grid-template-columns: 2.6rem 2.2rem;
        }

        .publisher-panel-item {
            height: 0.82rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    }

    .confirmOrReset {
        border-top: 0.02rem solid #f6f6f6;
        display: flex;
        align-items: center;
        height: 0.8rem;
        justify-content: space-around;

        .reset,
        .confirm {
            text-shadow: 0rem 0rem 0.1rem #777;
            background-color: #f94836;
            color: white;
            padding: 0.03rem 0.12rem;
        }
    }

    .overlay {
        position: absolute;
        width: 5.4rem;
        background-color: #777;
        height: 100vh;
        opacity: 0.4;
        z-index: 9999999;

    }
}
</style>