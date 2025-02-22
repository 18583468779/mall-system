<template>
    <div class="content">
        <ui class="firstctgy">
            <li :class="{ 'firstctgy-item': true, 'firstctgy-item_active': firstCtgyActiveIndex === index }"
                v-for="(item, index) in firstCtgyList" :key="item.firstctgyId" @click="changeTab(index)">
                <span class="firstctgyname">{{ item.firstctgyname }}</span>
            </li>
        </ui>
        <div class="secondthrdctgy">
            <ul>
                <li class="secondthrdctgy-item" v-for="(item) in secondCtgyList" :key="item.secondctgyid">
                    <div class="secondctgy-item">
                        <span class="secctgyname">
                            {{ item.secctgyname }}
                        </span>
                        <span class="secctgynameshop">
                            {{ item.secctgyname }}馆 >
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FstToThrdCtgy } from '../service/index';
const { firstCtgyActiveIndex, firstCtgyList, secondCtgyList, getFirstCtgys, getSecondCtgys, changeTab } = FstToThrdCtgy;
getFirstCtgys();
getSecondCtgys()
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

    .secondthrdctgy {
        flex: 1;
        margin-right: 0.19rem;

        &-item {
            background: #fff;
        }

        .secondctgy-item {
            height: 0.73rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.2rem;

            .secctgyname {
                color: #0d0d0d;
                font-weight: 600;
            }

            .secctgynameshop {
                color: #535353;
            }
        }
    }

}
</style>