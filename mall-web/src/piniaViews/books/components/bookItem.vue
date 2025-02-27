<template>
    <div class="bookitem">
        <img class="book-pic" :src="ImgUtil.getImg('1tongnian.png')" />
        <div class="bookinfo">
            <div class="bookinfo-brief">
                <div class="book-name">西游记后转</div>
                <div class="book-author-publs">
                    <span class="author spacing">王五</span>
                    <span class="separator spacing">|</span>
                    <span class:="publs spacing">出版社</span>
                </div>
            </div>

            <div class="bookinfo-other">
                <div class="price">
                    <span class="discountprice spacing">
                        <span class="symbol">¥</span>
                        89.34
                    </span>
                    <span class="originprice spacing">¥100</span>
                    <span class="discount">0.8折</span>
                </div>
                <div class="give">
                    <span class="self-support">自营</span>
                    <span class="coupons">卷</span>
                    <span class="free-shipping">包邮</span>
                </div>
                <div class="monthsalescount">
                    <span>月售9878</span>
                </div>
                <div class="ranklist">
                    <span>图书畅销总排行榜第1名</span>
                </div>
            </div>
        </div>
        <div class="empty" v-show="false">库存所有书已经售完</div>
    </div>
</template>

<script setup lang="ts">
import { ImgUtil } from '../../../utils/imgUtil'
</script>

<style scoped lang="scss">
.bookitem {
    margin-top: 0.2rem;
    display: grid;
    grid-template-columns: 2.34rem 2.7rem;
    justify-items: center;

    .book-pic {
        width: 1.8rem;
        height: 2.2rem;
        object-fit: contain;
    }

    .bookinfo {
        width: 2.7rem;
        display: grid;
        grid-template-columns: 2.7rem;
        gap: 0.15rem;

        &-brief {

            width: 100%;
            line-height: 0.35rem;

            .book-name {
                font-size: 0.25rem;
                color: #4c4c4c;
            }

            .book-author-publs {
                color: #848484;

                .spacing {
                    margin-right: 0.09rem;
                }


            }
        }

        &-other {
            line-height: 0.36rem;

            .price {
                .spacing {
                    margin-right: 0.09rem;
                }

                .discountprice {
                    font-size: 0.27rem;
                    color: #e94039;

                    .symbol {
                        font-size: 0.22rem;
                    }
                }

                .originprice,
                .discount {
                    color: #c6c6c6;
                    font-size: 0.2rem;
                }

                .originprice {
                    text-decoration: line-through;
                }
            }
        }

        .give {

            display: flex;
            line-height: 0.2rem;
            justify-content: flex-start;
            gap: 0.05rem;
            font-size: 0.15rem;

            .self-support {
                padding: 0rem 0.15rem;
                border-radius: 0.05rem;
                text-shadow: 0rem 0.005rem #7f7f7f;
                background-color: #eb636d;
                color: white;

            }

            .coupons {
                padding: 0rem 0.15rem;
                border-radius: 0.05rem;
                border: 1px #d06d70 solid;
                background-color: #fff;
                color: #7f7f7f;
                text-shadow: 0rem 0.005rem#d06d70;

            }

            .free-shipping {
                padding: 0rem 0.15rem;
                border-radius: 0.05rem;
                border: 1px #d06d70 solid;
                background-color: #fff;
                color: #7f7f7f;
                text-shadow: 0rem 0.005rem #d06d70;
            }

        }

        .monthsalescount,
        .ranklist {
            color: #db8441;
            font-size: 0.2rem;
            padding: 0.04rem;
        }

        .ranklist {
            background-color: #fef3ed;
            width: 2.5rem;
            text-indent: 0.04rem;
        }
    }
}
</style>