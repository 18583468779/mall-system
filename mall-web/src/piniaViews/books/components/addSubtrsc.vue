<template>
    <div class="shopcart">
        <div class="addBtn" v-if="bookItem && bookItem.purcharsenum === 0">
            <div class="addBtn-inner" @click="addBkToShopCartWrapper(bookItem)">添加购物车</div>
        </div>

        <div class="shopcart-operate" v-else>
            <span @click="addOrSubtrBookToShopCart(bookItem, 'sub')" class="shopcart-operate-minus"
                v-show="bookItem.purcharsenum > 1">
                <span class="inner">-</span>
            </span>
            <span @click="delBookFrmSc(bookItem)" class="shopcart-operate-del" v-show="bookItem.purcharsenum === 1">
                <span class="inner">
                    <i class="shanchu">
                        <svg t="1741008278986" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1591" width="16" height="16">
                            <path
                                d="M944 192l-188.8 0 0-44.8c0-54.4-44.8-99.2-99.2-99.2l-294.4 0c-54.4 0-99.2 44.8-99.2 99.2l0 44.8-179.2 0c-12.8 0-25.6 9.6-25.6 25.6 0 12.8 9.6 25.6 25.6 25.6l60.8 0 0 0 0 633.6c0 54.4 44.8 99.2 99.2 99.2l550.4 0c54.4 0 99.2-44.8 99.2-99.2l0-630.4 0-3.2 51.2 0c12.8 0 25.6-9.6 25.6-25.6C966.4 204.8 960 192 944 192zM316.8 147.2c0-25.6 22.4-48 48-48l294.4 0c25.6 0 48 22.4 48 48l0 44.8-390.4 0L316.8 147.2zM841.6 867.2c0 28.8-16 57.6-41.6 57.6l-550.4 0c-25.6 0-54.4-19.2-54.4-44.8l3.2-636.8 643.2 0 0 0L841.6 867.2z"
                                p-id="1592"></path>
                            <path
                                d="M368 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C390.4 393.6 384 380.8 368 380.8z"
                                p-id="1593"></path>
                            <path
                                d="M528 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C550.4 393.6 544 380.8 528 380.8z"
                                p-id="1594"></path>
                            <path
                                d="M688 380.8c-16 0-25.6 9.6-25.6 25.6l0 342.4c0 16 12.8 25.6 25.6 25.6 12.8 0 25.6-9.6 25.6-25.6l0-342.4C710.4 393.6 704 380.8 688 380.8z"
                                p-id="1595"></path>
                        </svg>
                    </i>
                </span>
            </span>
            <span class="purchasenum">{{ bookItem.purcharsenum }}</span>

            <span @click="(e) => addOrSubtrBookToShopCart(bookItem, 'add', e)" class="shopcart-operate-add">
                <span class="inner">+</span>
            </span>
        </div>

    </div>
</template>

<script setup lang="ts">
import { BookInfo } from '../../../piniaStore/book/state';
import shopCart from '../../books/service/shopCart';

const { addBkToShopCartWrapper, addOrSubtrBookToShopCart, delBookFrmSc } = shopCart
type Props = {
    bookItem: BookInfo
}
const { bookItem } = defineProps<Props>();


</script>

<style scoped lang="scss">
.shopcart {
    margin-top: 0.1rem;

    .addBtn {
        display: flex;
        align-items: center;

        &-inner {
            width: 2.5rem;
            height: 0.32rem;
            line-height: 0.32rem;
            background-color: #fef3ed;
            color: #db8441;
            text-align: center;
            padding: 0.05rem;
            border-radius: 0.05rem;
        }
    }

    &-operate {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.3rem;

        &-add,
        &-minus {
            padding: 0.15rem;

            .inner {
                text-align: center;
                display: inline-block;
                width: 0.3rem;
                height: 0.3rem;
                line-height: 0.3rem;
                background-color: #1985f1;
                color: white;
                border-radius: 50%;
            }
        }

        &-del {
            padding: 0.15rem;

            .shanchu {
                display: flex;
                align-items: center;
            }
        }
    }
}
</style>