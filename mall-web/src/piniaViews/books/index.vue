<template>
    <div class="content">
        <div>
            <to-search></to-search>
        </div>
        <div class="adv">
            <img class="adv-img" :src="ImgUtil.getImg('1.png')" alt="">
        </div>
        <div class="bookctgys">
            <breadcrumbs />
            <thrdctgys />
            <div style="margin-top: 0.3rem;">
                <book-sort />
            </div>

            <div style="margin-top: 0.5rem;">
                <bookItem />
            </div>
        </div>
        <div>
            <shop-cart />
        </div>
    </div>
</template>

<script setup lang="ts">
import toSearch from './components/toSearch.vue';
import breadcrumbs from './components/breadcrumbs.vue';
import thrdctgys from './components/thrdctgys.vue'
import bookItem from './components/bookItem.vue';
import bookSort from './components/bookSort.vue';
import shopCart from './components/shopCart.vue';
import { ImgUtil } from '../../utils/imgUtil'
</script>

<style scoped lang="scss">
.adv {
    position: absolute;
    top: 0.86rem;
    width: 5.04rem;
    margin: 0.18rem;
    height: 1.62rem;

    &-img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
        object-fit: cover;
    }
}

.bookctgys {
    position: absolute;
    top: 2.7rem;
    width: 5.04rem;
    margin: 0.18rem;
    padding-bottom: 1rem;
}
</style>