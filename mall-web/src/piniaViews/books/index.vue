<template>
    <div>
        <div>
            <to-search></to-search>
        </div>
        <div class="adv">
            <img class="adv-img" src="../../assets/img/books/lunbo/1.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import toSearch from './components/toSearch.vue';
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
</style>