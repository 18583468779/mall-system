<template>
    <div>
        <div>
            <to-search></to-search>
        </div>
        <div class="adv">
            <img class="adv-img" :src="ImgUtil.getImg('1.png')" alt="">
        </div>
        <div class="bookctgys">
            <breadcrumbs />
            <thrdctgys />
        </div>
        =
    </div>
</template>

<script setup lang="ts">
import toSearch from './components/toSearch.vue';
import breadcrumbs from './components/breadcrumbs.vue';
import thrdctgys from './components/thrdctgys.vue'
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
}
</style>