<template>
    <div class="goods">
        <i class="iconfont icon-yuan-shixin-zuojiantou leftarrow">
            <svg t="1742178227757" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="3855" width="26" height="26">
                <path
                    d="M512 85.333333c235.52 0 426.666667 191.146667 426.666667 426.666667s-191.146667 426.666667-426.666667 426.666667S85.333333 747.52 85.333333 512 276.48 85.333333 512 85.333333z m0 768c188.586667 0 341.333333-152.746667 341.333333-341.333333s-152.746667-341.333333-341.333333-341.333333-341.333333 152.746667-341.333333 341.333333 152.746667 341.333333 341.333333 341.333333z m0-384h170.666667v85.333334h-170.666667v128l-170.666667-170.666667 170.666667-170.666667v128z"
                    fill="#000000" p-id="3856"></path>
            </svg>
        </i>
        <div class="pic" ref="picRef">
            <img class="img" :src="ImgUtil.getImg(getBookDetail.bookpicname)" />
        </div>
        <div class="goods-detail">
            <div class="price-detail">
                <div class="favourable">
                    <span class="discount-price">
                        <strong class="symbol">¥</strong>
                        <strong class="discountprice">{{ getBookDetail.discountprice }}</strong>
                    </span>
                    <span class="discount-condition"><span class="inner">10050</span></span>
                    <span class="jiangjia"><i class="iconfont icon-jiangjiatongzhi1"></i></span>
                </div>
                <div class="other">
                    <span class="original-price">定价¥{{ getBookDetail.originalprice }}</span>
                    <span class="discount">{{ getBookDetail.discount }}折扣</span>
                    <span class:="reduction-notice">降价通知</span>
                </div>
            </div>
            <div class="line"></div>
            <div class="fullminus">
                <div class="fullminus-item">
                    <div class="fullminus-item-desc">
                        <strong class="symbol">¥</strong>
                        <span class="integerpart">10</span>
                        <span class="sale-price">99</span>
                    </div>
                    <div class="fullminus-item-get">领</div>
                    <span class="radius-up"></span>
                    <span class="radius-down"></span>
                    <span class="connect-line-1"></span>
                    <span class="connect-line-2"></span>
                    <span class="connect-line-3"></span>
                </div>
                <div class="extra-item-1">
                    <span class="yuan-field">N元场</span>
                    <span class="discount">3月49元5件&88元1件</span>
                    <span class="collect-coupons">领券<i><svg t="1742198360459" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4890" width="12" height="12">
                                <path
                                    d="M793.61 515.719L291.36 13.45l-60.97 62.59 440.149 439.096-440.149 441.75 60.975 61.103z"
                                    fill="" p-id="4891"></path>
                            </svg></i> </span>
                </div>
                <div class="extra-item-2">
                    <span class="yuan-field">满额减</span>
                    <span class="discount">每满¥1o00元减¥50元</span>
                    <span class="collect-coupons">
                        领券
                        <i><svg t="1742198360459" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4890" width="12" height="12">
                                <path
                                    d="M793.61 515.719L291.36 13.45l-60.97 62.59 440.149 439.096-440.149 441.75 60.975 61.103z"
                                    fill="" p-id="4891"></path>
                            </svg></i>
                    </span>
                </div>
            </div>
        </div>
        <div class="book-brief">
            <div class="descr">
                <span class="ziying">当当自营</span>
                <span class="book-name">{{ getBookDetail.bookname }}</span>
            </div>
            <div class="book-introduce">
                本套丛书是特别为中国学生精心打造，量身定制的"新阅读"知识成长计划。它以先进的教学理念和趣味的教学内
                容形象讲解.
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import BookDetailsService from '../service';
import { ImgUtil } from '../../../utils/imgUtil';
const { storeRefs, init, picRef } = BookDetailsService;
const { getBookDetail } = storeRefs
init();

</script>

<style scoped lang="scss">
.goods {
    position: absolute;
    top: 0.6rem;
    left: 0rem;

    .leftarrow {
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        font-size: 0.4rem;
        opacity: 0.4;
    }

    .pic {
        display: flex;
        width: 5.4rem;
        height: 4rem;
        justify-content: center;

        .img {
            width: 80%;
            height: 85%;
            object-fit: contain;
        }
    }

    &-detail {
        width: 5.4rem;
        height: 2.75rem;
        background-image: linear-gradient(#ff5244 35%, #ffc3bc, #fff);
        border-radius: 0.2rem 0.2rem 0rem 0rem;
        box-shadow: 0rem -0.01rem 0.01rem 0.01rem gainsboro;

        .price-detail {
            padding-top: 0.1rem;
            width: 5.1rem;
            padding: 00.15rem;
            height: 1.04rem;
            color: #fff;

            .favourable,
            .other {
                line-height: 0.35rem;
                display: flex;
                align-items: center;

            }

            .discount-price {
                width: 1.44rem;
                font-size: 0.25rem;
            }

            .discount-condition {
                flex: 1;

                .inner {
                    border: 1px solid gray;
                    box-shadow: 0rem 0.01rem 0.03rem 0.02rem #fff inset;
                    padding: 0.05rem;
                    border-radius: 0.05rem;
                }
            }

            .jiangjia {
                width: 0.7rem;
                font-size: 0.4rem;
            }

            .other {
                .original-price {
                    width: 1.2rem;
                    text-decoration: line-through;
                }

                .discount {
                    flex: 1;
                }

            }
        }

        .line {
            height: 0.1rem;
            background-color: #e94230;
            margin: 0rem 0.05rem;
            border-radius: 0.1rem;
        }

        .fullminus {
            top: -0.05rem;
            position: relative;
            height: 1.48rem;
            background-image: linear-gradient(#ffc3bc 5%, #fff 30%, #fff 30%, #fff 30%);
            margin: 0rem 0.11rem;
            padding: 0.18rem 0rem 0rem 0.18rem;

            &-item {
                display: flex;
                align-items: center;
                gap: 0.08rem;
                color: #fff;
                position: relative;

                &-desc,
                &-get {
                    height: 0.45rem;
                    background-color: #ff5347;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 0.1rem;
                }

                &-desc {
                    width: 1.1rem;
                    box-shadow: -0.01rem 0rem 0.04rem 0rem black;


                }

                &-get {
                    width: 0.4rem;
                    box-shadow: 0.01rem 0rem 0.04rem 0rem black;

                }

                .radius-up,
                .radius-down {
                    width: 0.11rem;
                    height: 0.06rem;
                    position: absolute;
                    border: 0.02rem solid #ff5347;
                    left: 1.06rem;
                    border-top: none;
                    border-bottom-left-radius: 50%100%;
                    border-bottom-right-radius: 50%100%;

                }

                .radius-up {
                    top: 0.03rem;
                }

                .radius-down {
                    bottom: 0.03rem;
                    transform: rotate(180deg);

                }

                .connect-line-1,
                .connect-line-2,
                .connect-line-3 {
                    width: 0.11rem;
                    height: 0.02rem;
                    background-color: #ff5347;
                    position: absolute;
                    left: 1.06rem;

                }

                .connect-line-1 {
                    top: 0.15rem;
                }

                .connect-line-2 {
                    top: 0.21rem;
                }

                .connect-line-3 {
                    top: 0.27rem;
                }

            }

            .extra-item-1,
            .extra-item-2 {
                display: flex;
                align-items: center;
                gap: 0.24rem;
                height: 0.4rem;

                .yuan-field {
                    background-color: #f6e8e7;
                    width: 0.8rem;
                    padding: 0.03rem 0.05rem;
                    text-align: center;
                }

                .discount {
                    flex: 1;
                }

                .collect-coupons {
                    width: 0.8rem;
                    color: ☐#e24a56;
                }

            }
        }
    }

    .book-brief {
        margin-top: 0.2rem;
        padding: 0.1rem 0.15rem;

        .descr {
            display: flex;
            align-items: center;
            height: 0.5rem;
            gap: 0.2rem
        }

        .book-name {
            font-size: 0.25rem;
            font-weight: 600;
        }

        .ziying {
            background-color: #f34949;
            color: #fff;
            width: 0.9rem;
            text-align: center;
            padding: 0.03rem 0rem;
            border-radius: 0.04rem;
            box-shadow: 0.01rem 0.005rem 0.01rem 0.01rem gray;

        }
    }
}
</style>