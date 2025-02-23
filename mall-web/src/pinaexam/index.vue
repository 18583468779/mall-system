<template>
    <div>
        姓名：{{ username }}
        年龄：{{ age }}
        用户:{{ getUser }}
    </div>
    <hr>
    <button @click="store.findUser('小柳', 20)">点击</button>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { testStore } from './store';
const store = testStore();
const { username, age, getUser } = storeToRefs(store);


</script>

<style scoped></style>