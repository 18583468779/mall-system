<template>
    <div>
        <div class="evaluate-list" ref="evalLstRef">
            <div class="evaluate-item" v-for="(item, index) in evalRplLst" :key="item.evaluateid">
                <div class="evaluate-item-user">
                    <span class="img-wrapper">
                        <img :src="ImgUtil.getImg(`${item.headportrait}`)" alt="">
                    </span>
                    <span v-if="item.isanonymous" style="flex: 1;">匿名用户</span>
                    <span v-else style="flex: 1;">{{ item.evaluator }}</span>
                    <span class="givealike"><i>
                            <svg t="1742692462219" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="1515" width="16" height="16">
                                <path
                                    d="M190.193225 471.411583c14.446014 0 26.139334-11.718903 26.139334-26.13831 0-14.44499-11.69332-26.164916-26.139334-26.164916-0.271176 0-0.490164 0.149403-0.73678 0.149403l-62.496379 0.146333c-1.425466-0.195451-2.90005-0.295735-4.373611-0.295735-19.677155 0-35.621289 16.141632-35.621289 36.114522L86.622358 888.550075c0 19.949354 15.96767 35.597753 35.670407 35.597753 1.916653 0 3.808746 0.292666 5.649674 0l61.022819 0.022513c0.099261 0 0.148379 0.048095 0.24764 0.048095 0.097214 0 0.146333-0.048095 0.24457-0.048095l0.73678 0 0-0.148379c13.413498-0.540306 24.174586-11.422144 24.174586-24.960485 0-13.55983-10.760065-24.441669-24.174586-24.981974l0-0.393973-50.949392 0 1.450025-402.275993L190.193225 471.409536z"
                                    fill="#5D5D5D" p-id="1516"></path>
                                <path
                                    d="M926.52241 433.948343c-19.283182-31.445176-47.339168-44.172035-81.289398-45.546336-1.77032-0.246617-3.536546-0.39295-5.380544-0.39295l-205.447139-0.688685c13.462616-39.059598 22.698978-85.58933 22.698978-129.317251 0-28.349675-3.193739-55.962569-9.041934-82.542948l-0.490164 0.049119c-10.638291-46.578852-51.736315-81.31498-100.966553-81.31498-57.264215 0-95.466282 48.15065-95.466282 106.126063 0 3.241834-0.294712 6.387477 0 9.532097-2.996241 108.386546-91.240027 195.548698-196.23636 207.513194l0 54.881958-0.785899 222.227314 0 229.744521 10.709923 0 500.025271 0.222057 8.746198-0.243547c19.35686 0.049119 30.239721-4.817726 47.803749-16.116049 16.682961-10.761088 29.236881-25.50079 37.490869-42.156122 2.260483-3.341095 4.028757-7.075139 5.106298-11.20111l77.018118-344.324116c1.056052-4.053316 1.348718-8.181333 1.056052-12.160971C943.643346 476.446249 938.781618 453.944769 926.52241 433.948343zM893.82573 486.837924l-82.983993 367.783411-0.099261-0.049119c-2.555196 6.141884-6.879688 11.596106-12.872169 15.427364-4.177136 2.727111-8.773827 4.351098-13.414521 4.964058-1.49812-0.195451-3.046383 0-4.620227 0l-477.028511-0.540306-0.171915-407.408897c89.323375-40.266076 154.841577-79.670527 188.596356-173.661202 0.072655 0.024559 0.124843 0.049119 0.195451 0.072655 2.99931-9.137101 6.313799-20.73423 8.697079-33.164331 5.551436-29.185716 5.258771-58.123792 5.258771-58.123792-4.937452-37.98001 25.940812-52.965306 44.364417-52.965306 25.304316 0.860601 50.263777 33.656541 50.263777 52.326762 0 0 5.600555 27.563776 5.649674 57.190537 0.048095 37.366026-4.6673 56.847729-4.6673 56.847729l-0.466628 0c-5.872754 30.879288-16.214287 60.138682-30.464849 86.964654l0.36839 0.342808c-2.358721 4.815679-3.709485 10.220782-3.709485 15.943111 0 19.922748 19.088754 21.742187 38.765909 21.742187l238.761895 0.270153c0 0 14.666024 0.465604 14.690584 0.465604l0 0.100284c12.132318-0.638543 24.221658 5.207605 31.100322 16.409738 5.504364 9.016351 6.437619 19.6045 3.486404 28.988218L893.82573 486.837924z"
                                    fill="#5D5D5D" p-id="1517"></path>
                                <path
                                    d="M264.827039 924.31872c0.319272 0.024559 0.441045 0.024559 0.295735-0.024559 0.243547-0.048095 0.367367-0.074701-0.295735-0.074701s-0.539282 0.026606-0.271176 0.074701C264.43409 924.343279 264.532327 924.343279 264.827039 924.31872z"
                                    fill="#5D5D5D" p-id="1518"></path>
                            </svg>
                        </i></span>
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
                        <span class="date">{{ dayjs(item.pubdate).format('YYYY-MM-DD HH:ss:mm') }}</span>
                        <span class="reply-to-evaluate">
                            <span class="replyinfo">
                                <span c1ass="reply" v-show="cancelRpShowIndx === -1" style="margin-right: 0.1rem;"
                                    @click="reply($event, index)">回复</span>
                                <i v-show="cancelRpShowIndx === -1"><svg t="1742692515417" class="icon"
                                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        p-id="2578" width="16" height="16">
                                        <path
                                            d="M512.146827 268.510985c-250.902034 0-454.505322 157.57406-454.505322 359.095851 0 77.452531 32.639121 168.259723 83.298552 213.54786C166.24668 863.780505 88.131465 990.268512 109.075322 1018.193654c23.957624 31.943141 164.908706-79.128039 205.700895-61.760749C355.568406 973.800196 441.499439 987.04638 512.146827 987.04638c250.902034 0 447.742067-158.01764 454.089667-359.439545C972.069626 442.506103 768.001278 268.510985 512.146827 268.510985zM511.997535 950.528886C447.362645 950.528886 362.014817 933.770578 323.347087 920.455656c-38.351961-13.206444-179.982913 66.085924-179.982913 66.085924s52.530415-136.615167 29.151701-161.97227c-42.140114-45.708088-76.209862-124.513914-76.209862-195.375037 0-184.372531 186.277885-324.240977 415.827925-324.240977s415.35105 154.807323 415.447714 324.240977C927.690131 821.643613 741.54865 950.528886 511.997535 950.528886zM311.488568 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM504.000204 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0ZM696.511839 622.945485m-64.394304 0a59.955 59.955 0 1 0 128.788609 0 59.955 59.955 0 1 0-128.788609 0Z"
                                            fill="#272636" p-id="2579"></path>
                                    </svg></i>
                                <span @click="cancelReply($event)" v-show="cancelRpShowIndx === index">取消回复</span>
                            </span>
                            <div class="reply-panel">
                                <div class="overlay-before" ref="overlayEle"></div>
                                <div class="publish_area">
                                    <textarea class="reply-content" :placeholder="'回复：' + item.evaluator"></textarea>
                                    <span class="pub1ish">发表</span>
                                </div>
                                <div class="overlay"></div>
                            </div>
                        </span>
                    </div>

                    <div class="replylst">
                        <div class="reply" v-for="(rep, index) in showReplylst(item.replies, endRplLstIdx)">
                            <span class="replyor'">{{ rep.replyor }}:</span>
                            <span class="reply-content">{{ rep.replycontent }}</span>
                        </div>
                        <div class="allreply">
                            <span v-if="isEmpty(item.replies)">暂无回复</span>
                            <span v-show="isReadyOpen(item.replies)" @click="foldRplLst(item.replies)">展开</span>
                        </div>


                        <div class="reply" v-show="isReadyCollapse(item.replies)" @click="unfoldRplLst()">
                            收起
                            <i>
                                <svg t="1742711763639" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="3660" width="16" height="16">
                                    <path
                                        d="M373.412318 205.422751 334.856478 242.886344l277.618102 269.744922L334.856478 782.385917l38.55584 37.458727 316.165428-307.213379L373.412318 205.422751 373.412318 205.422751zM373.412318 205.422751"
                                        fill="#272636" p-id="3661"></path>
                                </svg>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="evaluate-list" v-show="evalRplLst.length === 0">
            <div class="noevaluate">暂无评价</div>
        </div>
    </div>


</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { EvaluateClass } from '../../../service';
import ReplyClass from '../../../service/reply';
import { ImgUtil } from '../../../../../utils/imgUtil';
const { searchEvalRplLst, evalRplLst, cancelReply, reply, cancelRpShowIndx } = EvaluateClass
const { endRplLstIdx, showReplylst, foldRplLst, unfoldRplLst, isReadyCollapse, isEmpty, isReadyOpen } = ReplyClass
searchEvalRplLst();

</script>

<style scoped lang="scss">
.evaluate-list {
    width: 4.6rem;
    display: grid;
    gap: 0.5rem;
    padding-bottom: 1rem;

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
                margin-top: 0.15rem;
                color: gray;

                .reply-to-evaluate {
                    flex: 1;
                    text-align: right;
                    font-size: 0.16rem;
                    position: relative;

                    .reply-panel {
                        display: none;
                    }

                    .reply-panel-show {
                        display: block;
                        position: absolute;
                        top: 0.6rem;
                        right: 0rem;
                        z-index: 99999999999999;
                        height: 2.4rem;
                        width: 4.8rem;
                        background: #fff;

                        .publish_area {
                            display: flex;
                            align-items: center;
                            width: 4.5rem;
                            padding: 0 0.1rem;
                            height: 100%;
                            gap: 0.1rem;

                            .reply-content {
                                flex: 1;
                                height: 80%;
                                width: 4rem;
                                background: #f1f1f1;
                                border: none;
                                text-indent: 2;
                                resize: none;
                                padding: 0.1rem 0.15rem;
                                outline: none;
                            }

                            .publish {
                                width: 0.8rem;
                                flex-basis: 0.8rem;
                                text-align: center;

                            }
                        }
                    }

                    .overlay-before {
                        position: absolute;
                        top: -6rem;
                        width: 5rem;
                        background-color: white;
                        opacity: 0.6;
                        height: 4rem;
                    }

                    .overlay {
                        position: absolute;
                        top: 2rem;
                        width: 5rem;
                        background-color: white;
                        opacity: 0.6;
                        height: 50vh;
                    }
                }
            }


            .replylst {
                font-size: 0.2rem;
                margin-top: 0.2rem;
                line-height: 0.5rem;
                width: 4.6rem;
                background-color: #f6f6ff;

                .reply {
                    margin-bottom: 0.1rem;

                    .replyor {
                        color: #526198;
                    }

                    &-content {
                        font-family: '楷体';
                    }
                }


            }

        }
    }


}

.evaluate-list:after {
    display: block;
    height: 1rem;
    content: ''
}
</style>