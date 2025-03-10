<template>
    <div class="search">
        <div class="search-header">
            <i class="iconfont icon-xiangzuojiantou back">
                <svg t="1740289994795" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="3432" width="32" height="32">
                    <path
                        d="M398.64 512l271.53 271.529c16.662 16.662 16.662 43.677 0 60.34-16.662 16.662-43.678 16.662-60.34 0l-301.699-301.7c-16.662-16.661-16.662-43.677 0-60.339l301.7-301.699c16.661-16.662 43.677-16.662 60.339 0 16.662 16.663 16.662 43.678 0 60.34L398.64 512z"
                        fill="#797979" p-id="3433"></path>
                </svg>
            </i>
            <span class="search-text">搜索</span>
        </div>
        <div class="search-keyword">
            <div class="search-keyword-wrapper">
                <i class="fangdajing">
                    <svg t="1740290903726" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5585" width="22" height="22">
                        <path
                            d="M889.6 838.4l-192-192C742.4 595.2 768 524.8 768 448c0-179.2-140.8-320-320-320S128 268.8 128 448s140.8 320 320 320c76.8 0 147.2-25.6 198.4-70.4l192 192c12.8 12.8 32 12.8 44.8 0C896 876.8 896 851.2 889.6 838.4zM192 448c0-140.8 115.2-256 256-256s256 115.2 256 256c0 140.8-115.2 256-256 256S192 588.8 192 448z"
                            p-id="5586"></path>
                    </svg>
                </i>
                <input type="text" class="search-keyword-input" placeholder="神奇校车" />
            </div>
            <span class="searchbtn">搜索</span>
        </div>
        <div class="autocomplete">
            <div class="autocomplete-item" v-for="(keyword, index) in keywords" :key="index">
                <span class="keyword">{{ keyword }}</span>
            </div>
        </div>

        <div class="search-history">
            <div class="search-history-header">
                <span class="historytext">搜索历史</span>
                <i class="del">
                    <svg t="1741606927131" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1682" width="16" height="16">
                        <path
                            d="M254.398526 804.702412l-0.030699-4.787026C254.367827 801.546535 254.380106 803.13573 254.398526 804.702412zM614.190939 259.036661c-22.116717 0-40.047088 17.910928-40.047088 40.047088l0.37146 502.160911c0 22.097274 17.930371 40.048111 40.047088 40.048111s40.048111-17.950837 40.048111-40.048111l-0.350994-502.160911C654.259516 276.948613 636.328122 259.036661 614.190939 259.036661zM893.234259 140.105968l-318.891887 0.148379-0.178055-41.407062c0-22.13616-17.933441-40.048111-40.067554-40.048111-7.294127 0-14.126742 1.958608-20.017916 5.364171-5.894244-3.405563-12.729929-5.364171-20.031219-5.364171-22.115694 0-40.047088 17.911952-40.047088 40.048111l0.188288 41.463344-230.115981 0.106424c-3.228531-0.839111-6.613628-1.287319-10.104125-1.287319-3.502777 0-6.89913 0.452301-10.136871 1.296529l-73.067132 0.033769c-22.115694 0-40.048111 17.950837-40.048111 40.047088 0 22.13616 17.931395 40.048111 40.048111 40.048111l43.176358-0.020466 0.292666 617.902982 0.059352 0 0 42.551118c0 44.233434 35.862789 80.095199 80.095199 80.095199l40.048111 0 0 0.302899 440.523085-0.25685 0-0.046049 40.048111 0c43.663452 0 79.146595-34.95 80.054267-78.395488l-0.329505-583.369468c0-22.135136-17.930371-40.047088-40.048111-40.047088-22.115694 0-40.047088 17.911952-40.047088 40.047088l0.287549 509.324054c-1.407046 60.314691-18.594497 71.367421-79.993892 71.367421l41.575908 1.022283-454.442096 0.26606 52.398394-1.288343c-62.715367 0-79.305207-11.522428-80.0645-75.308173l0.493234 76.611865-0.543376 0-0.313132-660.818397 236.82273-0.109494c1.173732 0.103354 2.360767 0.166799 3.561106 0.166799 1.215688 0 2.416026-0.063445 3.604084-0.169869l32.639375-0.01535c1.25355 0.118704 2.521426 0.185218 3.805676 0.185218 1.299599 0 2.582825-0.067538 3.851725-0.188288l354.913289-0.163729c22.115694 0 40.050158-17.911952 40.050158-40.047088C933.283394 158.01792 915.349953 140.105968 893.234259 140.105968zM774.928806 815.294654l0.036839 65.715701-0.459464 0L774.928806 815.294654zM413.953452 259.036661c-22.116717 0-40.048111 17.910928-40.048111 40.047088l0.37146 502.160911c0 22.097274 17.931395 40.048111 40.049135 40.048111 22.115694 0 40.047088-17.950837 40.047088-40.048111l-0.37146-502.160911C454.00054 276.948613 436.069145 259.036661 413.953452 259.036661z"
                            fill="#272636" p-id="1683"></path>
                    </svg>
                </i>
            </div>
            <div class="search-history-items">
                <div class="item" v-for="(item, index) in items" :key="index">
                    <span>{{ item }}</span>
                </div>
            </div>
        </div>
    </div>



</template>


<script setup lang="ts">
const items = ['六年级作业', '大学作业', '小学语文', '六年级作业', '大学作业', '小学语文', '六', '大学作业', '小学语文', '六年级作业', '大学作业', '小学语文', '六', '大学作业', '小学语文', '六年级作业', '大学作业', '小学语文', '六']
const keywords = ['六年级上册', '六年级同步作业', '六年级+七年级作业', '六年级中册', '六年级下册']

</script>

<style scoped lang="scss">
.search {
    width: 5.4rem;
    padding: 0.13rem 0;

    &-header {
        width: 5.14rem;
        margin: 0 0.13rem;
        display: flex;
        align-items: center;
        height: 0.54rem;
        border-bottom: 1px solid #f6f6f6;

        .back {
            font-size: 0.3rem;
        }

        .search-text {
            flex: 1;
            font-size: 0.22rem;
            text-align: center;
            font-weight: bolder;

        }
    }

    &-keyword {
        width: 5.14rem;
        margin: 0 0.13rem;
        display: flex;
        align-items: center;
        height: 0.75rem;
        gap: 0.2rem;

        &-wrapper {
            flex: 1;
            height: 0.5rem;
            background: #f6f6f6;
            border-radius: 1rem;
            display: flex;
            align-items: center;

            .search-keyword-input {
                flex: 1;
                height: 100%;
                background: none;
                border: none;
                font-size: 0.2rem;

            }

            .fangdajing {
                margin-left: 0.23rem;
                margin-right: 0.12rem;
                font-size: 0.26rem;
            }
        }

        .searchbtn {
            width: 0.5rem;
            font-weight: bold;
            font-size: 0.25rem;
        }
    }

    .autocomplete {
        position: fixed;
        width: 5.4rem;
        height: calc(100% - 0.85rem);
        background-color: #fff;

        &-item {
            display: flex;
            align-items: center;
            height: 0.5rem;
            border-bottom: 1px solid #f4f4f4;
            padding: 0rem 0.15rem;
        }
    }

    &-history {
        width: 5.14rem;
        margin: 0 0.13rem;

        &-header {
            display: flex;
            height: 0.4rem;
            align-items: center;
            justify-content: space-between;

            .historytext {
                font-weight: bolder;
                text-shadow: 000.01rem gray;
                font-size: 0.19rem;
            }

            .del {
                font-size: 0.23rem;
            }
        }

        &-items {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-auto-rows: row; // 自动的行数
            margin-left: 0.05rem;
            margin-top: 0.2rem;
            column-gap: 0.2rem;
            row-gap: 0.15rem;

            .item {
                height: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f6f6f6;
                border-radius: 1rem;

            }
        }

    }
}
</style>