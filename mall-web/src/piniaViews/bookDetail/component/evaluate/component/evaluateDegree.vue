<template>
    <div class="evaldegree">
        <div class="evaldegree-wrapper">

            <div class="evaldegree-wrapper">
                <div class="more">
                    <span class="a11 evaluate">全部</span>
                    <span class="newest evaluate">最新</span>
                    <span class="figure-video evaluate">图/视频</span>
                </div>
                <div class="ratings">
                    <span class="goodEvals evaluate">好评<strong>l0</strong></span>
                    <span class="mediumEvals evaluate">中评<strong>5</strong></span>
                    <span class="negativeEvals evaluate">差评<strong>0</strong></span>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import BookDetailsService from '../../../service';
const { setHeaderOpacity } = BookDetailsService;
setHeaderOpacity(1);

</script>

<style scoped lang="scss">
.evaldegree {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    display: flex;
    width: 4.6rem;
    justify-content: center;

    &-wrapper {

        .more,
        .ratings {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.3rem;
            line-height: 0.35rem;

            .evaluate {
                background-color: #fef2f6;
                border-radius: 0.04rem;
                padding: 0.08rem 0.2rem;

                strong {
                    margin-left: 0.1rem;
                }
            }
        }

        .more {
            margin-bottom: 0.2rem;
        }
    }

}
</style>