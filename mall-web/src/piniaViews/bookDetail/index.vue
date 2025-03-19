<template>
    <div style="height: 1000px;overflow:scroll">
        <Header />
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import Header from './component/header.vue';
</script>

<style scoped></style>