<script setup lang="ts">
import { useStore } from 'vuex';
import HelloWorld from './components/HelloWorld.vue';
const store = useStore();

console.log(
  'store', store.state
)

const handleClick = () => {
  store.dispatch('ctgyModule/findFirstCtgyList')
}
</script>

<template>
  <div>
    hello
    <button @click="handleClick">点击</button>
    <hr>
    <HelloWorld msg="11111" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
