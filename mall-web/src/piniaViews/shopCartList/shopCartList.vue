<template>
    <div class="shopcartlist">
        <div class="header">
            <i class="back" @click="handleToPage">
                <svg t="1741411026216" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3273" width="32" height="32">
                    <path
                        d="M401.066667 512l302.933333 302.933333-59.733333 59.733334L341.333333 571.733333 281.6 512 341.333333 452.266667l302.933334-302.933334 59.733333 59.733334L401.066667 512z"
                        fill="#444444" p-id="3274"></path>
                </svg>
            </i>
            <input class="check" type="checkbox" v-model="isSelectAll" @change="selectAll" />
            <span class="label">当当网</span>
        </div>
        <div v-if="getShopCartList.length === 0"> 没有商品</div>
        <div v-else class="items">
            <div class="item" v-for="(item) in getShopCartList" :key="item.shopcartid">
                <div class="content">
                    <input type="checkbox" class="check" v-model="item.checked" @change="checkEveryCheckBox" />
                    <div class="pic">
                        <img :src="getImg(item.bookpicname)" class="bookimg" />
                    </div>
                    <div class=" descri">
                        <div class="book-title">{{ item.bookname }}</div>
                        <div class="price">
                            <span class="curprice">¥{{ item.bookprice }}</span>
                            <span class="addsubtrcbktosc">
                                <addSubtrsc :book-item="getCurrentBookItem(item.bookisbn, item.purcharsenum)" />

                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cal">
            <span class="checkall">
                <input type="checkbox" class="check" />
                <span class="label">全选</span>
                <span class="total">合计：
                    <span class="money">¥{{ totalPrice }}</span>
                </span>
            </span>
            <span class="pay">去结算({{ totalCount }})</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ImgUtil } from '../../utils/imgUtil';
import ShopCart from '../books/service/shopCart';
import addSubtrsc from '../books/components/addSubtrsc.vue';
import Books from '../books/service';
import router from '../../router';
const { getImg } = ImgUtil;
const { isSelectAll, selectAll, checkEveryCheckBox } = ShopCart
const { getShopCartList } = ShopCart.storeRefs;
const { getCurrentBookItem } = Books;
const { totalCount, totalPrice } = ShopCart.refreshShopCartList()
const handleToPage = () => {
    router.back()
}
</script>

<style scoped lang="scss">
.shopcartlist {
    padding: 0.13rem;

    .header {
        position: fixed;
        width: 5.14rem;
        height: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        z-index: 10;

        .back {
            font-size: 0.25rem;
        }

        .label {
            font-size: 0.25rem;
        }

        .check {
            width: 0.33rem;
            height: 0.22rem;
            cursor: pointer;
        }
    }

    .items {
        position: absolute;
        top: 0.86rem;
        bottom: 0.865rem;
        display: grid;
        grid-template-columns: 5.14rem;
        grid-template-rows: 2.89rem;
        overflow-y: scroll;

        .item {
            .content {
                display: flex;
                align-items: center;
                background-color: #fff;
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1);
                border-radius: 0.1rem;
                /* 可选：圆角边框 */
                padding: 0.2rem;

                .check {
                    width: 0.33rem;
                    height: 0.22rem;
                    cursor: pointer;

                }

                .pic {
                    width: 1.539rem;
                    height: 2.16rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .bookimg {
                        width: 80%;
                        height: 70%;
                    }
                }

                .descri {
                    width: 3.21rem;
                    font-size: 0.23rem;

                    .book-title {
                        height: 0.8rem;
                        color: #272727;
                    }

                    .price {

                        height: 1rem;
                        color: #ea5340;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        font-size: 0.2rem;

                        .curprice {
                            flex: 1
                        }

                        .addsubtrcbktosc {
                            flex: 2
                        }


                    }
                }
            }
        }
    }

    .cal {
        position: fixed;
        width: 5.14rem;
        margin: 0rem 0.13rem;
        bottom: 0rem;
        left: 0rem;
        height: 0.86rem;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        font-size: 0.22rem;

        .checkall {
            display: flex;
            align-items: center;
            gap: 0.1rem;

            .check {
                width: 0.33rem;
                height: 0.22rem;
                cursor: pointer;

            }

            .total {
                font-weight: 600;
            }
        }

        .pay {
            width: 1.8rem;
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: bolder;
            border-radius: 0.288rem;
            margin-right: 0.03rem;
            background: #ed1611;

        }
    }

}
</style>