<template>
    <div class="contain">
        <evaluateDegree />
        <evalList />
    </div>
</template>

<script setup lang="ts">
import evalList from './component/evalList.vue';
import evaluateDegree from './component/evaluateDegree.vue';
</script>

<style scoped lang="scss">
.contain {
    position: absolute;
    top: 0.6rem;
    left: 0.4rem;
    width: 4.6rem;
    display: flex;
    justify-content: center;
}
</style>