<template>
    <ul class="thrdctgy">
        <li class="thrdctgy-item" v-for="(item, index) in isReadOpen ? subthirdctgys : thirdCtgys"
            :key="item.thirdctgyid">
            <span class="thirdctgyname" @click="toBookInfo()">{{ item.thirdctgyname }}</span>
            <span v-if="showColLine(index)">|</span>
        </li>
        <div @click="openOrCollapse($event, secondctgy)" :class="{ readopen: isReadOpen, readcollapse: !isReadOpen }">
            <span v-show="isReadOpen">
                展开 ▼
            </span>
            <span v-show="!isReadOpen">
                收起 ▲
            </span>
        </div>
    </ul>
</template>

<script setup lang="ts">
import router from '../../../router';
import { SecondCtgy, ThirdCtgy } from '../../../store/ctgy/state';
import { FstToThrdCtgy } from '../service';

const { thirdCtgys, isReadOpen } = defineProps<{
    thirdCtgys: ThirdCtgy[],
    isReadOpen: boolean,
    secondctgy: SecondCtgy,
    subthirdctgys: ThirdCtgy[]
}>();

const { openOrCollapse, showColLine } = FstToThrdCtgy

const toBookInfo = () => {
    router.push({ name: 'books' })
}

</script>

<style scoped lang="scss">
.thrdctgy {
    display: grid;
    padding: 0 0.05rem 0 0.1rem;
    grid-template-columns: 1.18rem 1.1rem 1.23rem;
    position: relative;

    &-item {
        padding: 0.2rem 0;
        text-align: center;
        display: flex;

        .thirdctgyname {
            flex: 1
        }
    }

    .readopen {
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .readcollapse {
        position: absolute;
        left: 2.84rem;
        bottom: 0.24rem;
    }
}
</style>