<template>
    <div>
        {{ getFirstCtgy.firstctgyname }} -> {{ getSecondCtgy.secctgyname }}
    </div>
</template>

<script setup lang="ts">
import { FstToThrdCtgy } from '../../../piniaViews/ctgy/service';
const { getFirstCtgy, getSecondCtgy } = FstToThrdCtgy.storeRefs;
</script>

<style scoped></style>