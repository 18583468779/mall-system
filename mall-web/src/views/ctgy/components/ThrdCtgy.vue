<template>
    <ul class="thrdctgy">
        <li class="thrdctgy-item" v-for="(item, index) in isReadOpen ? subthirdctgys : thirdCtgys"
            :key="item.thirdctgyid">
            <span class="thirdctgyname">{{ item.thirdctgyname }}</span>
            <span v-if="((index + 1) % 3) !== 0">|</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { SecondCtgy, ThirdCtgy } from '../../../store/ctgy/state';

const { thirdCtgys, isReadOpen } = defineProps<{
    thirdCtgys: ThirdCtgy[],
    isReadOpen: boolean,
    secondctgy: SecondCtgy,
    subthirdctgys: ThirdCtgy[]
}>();
console.log('first', thirdCtgys)
</script>

<style scoped lang="scss">
.thrdctgy {
    display: grid;
    padding: 0 0.05rem 0 0.1rem;
    grid-template-columns: 1.18rem 1.1rem 1.23rem;

    &-item {
        padding: 0.2rem 0;
        text-align: center;
        display: flex;

        .thirdctgyname {
            flex: 1
        }
    }
}
</style>