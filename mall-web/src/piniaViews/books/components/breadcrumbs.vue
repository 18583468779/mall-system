<template>
    <div class="breadcrumbs">

        <div>
            {{ getFirstCtgy.firstctgyname }}
        </div>
        <div>></div>
        <div>
            {{ getSecondCtgy.secctgyname }}
        </div>
    </div>

</template>

<script setup lang="ts">
import { FstToThrdCtgy } from '../../../piniaViews/ctgy/service';
const { getFirstCtgy, getSecondCtgy } = FstToThrdCtgy.storeRefs;
</script>

<style scoped lang="scss">
.breadcrumbs {
    display: flex;
    align-items: center;
    font-size: 0.23rem;
    padding: 0.12rem 0rem;
    gap: 0.1rem;
    font-weight: bold;
    text-shadow: 0 0 0.01rem #ccc;
}
</style>