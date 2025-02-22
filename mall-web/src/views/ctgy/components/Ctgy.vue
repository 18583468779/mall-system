<template>
    <div class="content">
        <ui class="firstctgy">
            <li :class="{ 'firstctgy-item': true, 'firstctgy-item_active': firstCtgyActiveIndex === index }"
                v-for="(item, index) in firstCtgyList" :key="item.firstctgyId">
                <span class="firstctgyname">{{ item.firstctgyname }}</span>
            </li>
        </ui>
        <div class="secondctgy"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { FirstCtgy } from '../../../store/state';
import { CtgyActions } from '../../../store/actions';
import { ctgyGettersProxy } from '../../../store/getters';
const firstCtgyActiveIndex: Ref<number> = ref(0)
const firstCtgyList: Ref<FirstCtgy[]> = ref([]);
async function getFirstCtgys() {
    await CtgyActions.findFirstCtgyList();
    firstCtgyList.value = ctgyGettersProxy.getFirstCtgyList
}

getFirstCtgys()
</script>

<style scoped lang="scss">
.content {
    display: flex;
    position: absolute;
    width: 100%;
    top: 1.02rem;
    left: 0rem;
    bottom: 0.85rem;
    gap: 0.1rem;

    .firstctgy {
        flex-basis: 1.3rem;
        width: 1.3rem;
        overflow-y: auto;

        &-item {
            height: 0.78rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;


        }

        .firstctgy-item_active {
            color: red;
            text-shadow: 0 0 0.01rem #2a2a2a;
            background: #f7f7f7;

            .firstctgyname {
                border-left: 3px solid red;
                width: 100%;
                text-align: center;
            }
        }
    }

    .secondctgy {
        flex: 1;
        margin-right: 0.19rem;
    }

}
</style>