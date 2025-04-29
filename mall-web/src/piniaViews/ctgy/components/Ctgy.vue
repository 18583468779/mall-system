<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="flex flex-wrap gap-1.5 mb-4">
      <div v-for="(item) in firstCtgyComptuted" :key="item.firstctgyId" @click="handleFirstCtgyHover(item.firstctgyId)"
        class="px-3 py-1.5 rounded-md cursor-pointer transition-colors flex items-center text-sm" :class="{
          'bg-blue-100 text-blue-700': activeFirstIndex === item.firstctgyId,
          'hover:bg-gray-100 text-gray-600': activeFirstIndex !== item.firstctgyId,
        }">
        <el-icon class="mr-1 text-[0.9em]">
          <FolderOpened />
        </el-icon>
        {{ item.firstctgyname }}
      </div>
    </div>
    <!-- 二三级分类 - 紧凑布局 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div v-for="second in secondCtgyList" :key="second.secondctgyid" class="border-l-2 border-blue-200 pl-2">
        <!-- 二级分类标题 -->
        <div class="mb-2 flex items-center group cursor-pointer">
          <h3 class="text-base font-medium text-gray-800 flex items-center">
            <el-icon class="mr-1 text-blue-400 text-[0.9em]">
              <Collection />
            </el-icon>
            {{ second.secctgyname }}
          </h3>
        </div>

        <!-- 三级分类标签 -->
        <div class="flex flex-wrap gap-1.5">
          <div v-for="third in second.thirdctgys" :key="third.thirdctgyid" @click="toBookInfo(third, second)"
            class="px-2.5 py-1 text-xs rounded-md bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer border border-gray-100">
            {{ third.thirdctgyname }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { FolderOpened, Collection } from "@element-plus/icons-vue";
import { FstToThrdCtgy } from "../service/index";

const activeFirstIndex = ref(0);
const { storeRefs, getFirstCtgys, getSecondCtgys, changeTab, toBookInfo} = FstToThrdCtgy;
const { secondCtgyList, firstCtgyList, getFirstCtgyList, getFirstCtgy } = storeRefs;
import { onMounted } from "vue";
onMounted(async () => {
  // 初始化数据
  getFirstCtgys();
  getSecondCtgys();
  // let res = await findAllCtgys();
})
const firstCtgyComptuted = computed(() => {
  getFirstCtgyList.value.unshift({ firstctgyname: '全部', firstctgyId: 0 });
  return firstCtgyList.value;
})
watchEffect(() => {
  activeFirstIndex.value = getFirstCtgy.value.firstctgyId;
})

const handleFirstCtgyHover = (firstctgyId: number) => {
  activeFirstIndex.value = firstctgyId;
  changeTab(firstctgyId); // 确保这个方法正常更新secondCtgyList
};
</script>

<style scoped>
/* 添加微交互动画 */
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
