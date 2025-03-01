<template>
    <ul class="book-sort">
        <li class="compsive"><span class="inner">综合</span></li>
        <li>销量</li>
        <li>
            价格
            <span class="ascdesc">
                <i>
                    <svg t="1740490070186" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2308" width="12" height="12">
                        <path
                            d="M838.116 732.779 877.7 693.195 511.979 327.549 146.3 693.195 185.883 732.779 512.003 406.652Z"
                            p-id="2309"></path>
                    </svg>
                </i>
                <i>
                    <svg t="1740490091339" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3298" width="12" height="12">
                        <path
                            d="M185.884 327.55 146.3 367.133 512.021 732.779 877.7 367.133 838.117 327.55 511.997 653.676Z"
                            p-id="3299"></path>
                    </svg>
                </i>
            </span>
        </li>
        <li class="shop">店铺</li>
        <li class="dressing">
            筛选
            <i>
                <svg t="1740792326722" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1474" width="12" height="12">
                    <path
                        d="M148.4 114.2l729.2 0.1-0.1 16.7-265.2 177.2-22.2 14.8v537l50 100.1V349.8l287.1-192 0.8-93.6H98l0.7 93.6 285.3 192v418l50-25V323.2l-22-14.9L148.5 131l-0.1-16.8"
                        fill="#999999" p-id="1475"></path>
                    <path d="M703.3 423.2H928v50H703.3zM703.3 583H928v50H703.3zM703.3 742.8H928v50H703.3z"
                        fill="#999999" p-id="1476"></path>
                </svg>

            </i>
        </li>
    </ul>
</template>


<script setup lang="ts">

</script>

<style scoped lang="scss">
.book-sort {
    display: flex;
    font-size: 0.2rem;
    width: 100%;
    margin-left: 0.05rem;

    >li {
        flex: 1;
        display: flex;
        align-items: center;
    }
}
</style>