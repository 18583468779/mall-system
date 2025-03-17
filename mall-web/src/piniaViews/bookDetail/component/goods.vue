<template>
    <div>
        {{ getBookDetail }}
    </div>
</template>

<script setup lang="ts">
import BookDetailsService from '../service';
const { storeRefs, findBooksByISBN } = BookDetailsService;
const { getBookDetail } = storeRefs
findBooksByISBN()
</script>

<style scoped></style>