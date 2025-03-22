<template>
    <div>
        <div class="evaluate-list" ref="evalLstRef">
            <div class="evaluate-item" v-for="(item, index) in getEvalRplLst" :key="item.evaluteid">
                <div class="evaluate-item-user">
                    <span class="img-wrapper">
                        <img :src="ImgUtil.getImg(`${item.headportrait}`)" alt="">
                    </span>
                    <span v-if="item.isanonymous">匿名用户</span>
                    <span v-else>{{ item.evaluator }}</span>
                    <span class="givealike"><i class="iconfont icon-zans zans-icon"></i></span>
                </div>
                <div class="evaluate-item-star">
                    <span class="icon">
                        <img v-for="star in [0, 0, 0, 0, 0]" :src="ImgUtil.getImg('redstar.png')" />
                    </span>
                    <span class="line"> | </span>
                    <span class="star-score">10</span>
                </div>
                <div class="evaluate-item-content">
                    {{ item.content }}
                    <!--和数据表互动回复-->
                    <div class="reply-action">
                        <span class="date">{{ item.pubdate }}</span>
                        <span class="reply-to-evaluate">
                            <span class="replyinfo">
                                <span c1ass="reply">回复</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="evaluate-list">
            <div class="noevaluate">暂无评价
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">
import BookDetailsService, { EvaluateClass } from '../../../service';
import { ImgUtil } from '../../../../../utils/imgUtil';
const { searchEvalRplLst } = EvaluateClass
const { getEvalRplLst } = EvaluateClass.storeRef;

searchEvalRplLst();

</script>

<style scoped lang="scss">
.evaluate-list {
    width: 4.6rem;
    display: grid;
    gap: 0.5rem;

    .evaluate-item {
        display: grid;
        width: 100%;
        gap: 0.25rem;

        &-user {
            display: flex;
            align-items: center;
            gap: 0.2rem;

            .img-wrapper {

                width: 0.4rem;
                height: 0.5rem;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 0.04rem;
                }
            }
        }

        &-star {
            display: flex;
            align-items: center;
            gap: 0.1rem;
            line-height: 0.35rem;

            .icon {
                width: 1.6rem;

                img {
                    width: 20%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .line {
                position: relative;
                top: -0.03rem;
                color: gray;

            }

            .star-score {
                color: #d8596c;
                position: relative;
                top: -0.01rem;
            }
        }

        &-content {
            font-size: 0.2rem;
            text-shadow: 0rem 0rem 0.01rem gray;

            .reply-action {
                display: flex;
                align-items: center;

                .reply-to-evaluate {
                    flex: 1;
                    text-align: right;
                    font-size: 0.16rem;

                }
            }
        }
    }
}
</style>