<template>
  <div class="dashboard-container bg-gray-100">
    <!-- 顶部统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <el-card shadow="hover" v-for="(item, index) in stats" :key="index">
        <template #header>
          <div class="flex items-center">
            <el-icon :size="24" :color="item.color" class="mr-2">
              <component :is="item.icon" />
            </el-icon>
            <span class="text-gray-600">{{ item.title }}</span>
          </div>
        </template>
        <div class="flex justify-between items-end">
          <el-statistic :value="item.value" class="text-3xl font-bold" />
          <el-tag :type="item.trend > 0 ? 'success' : 'danger'" effect="dark">
            {{ item.trend > 0 ? '+' : '' }}{{ item.trend }}%
          </el-tag>
        </div>
      </el-card>
    </div>

    <!-- 销售趋势图表 -->
    <el-card class="mb-6">
      <template #header>
        <div class="text-lg font-semibold text-gray-700">近30天销售趋势</div>
      </template>
      <div ref="chartRef" class="h-96"></div>
    </el-card>

    <!-- 数据表格 -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- 热门商品 -->
      <el-card>
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold text-gray-700">热销商品TOP10</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </template>
        <el-table :data="hotProducts" stripe class="w-full">
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="sales" label="销量" width="120" align="center" />
          <el-table-column label="占比" width="180">
            <template #default="{ row }">
              <el-progress :percentage="row.percentage" :color="customColors" />
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 最新订单 -->
      <el-card>
        <template #header>
          <div class="text-lg font-semibold text-gray-700">最新订单</div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="(order, index) in recentOrders"
            :key="index"
            :timestamp="order.time"
            placement="top"
          >
            <el-card shadow="hover">
              <div class="flex justify-between items-center">
                <div>
                  <div class="font-medium">订单号：{{ order.no }}</div>
                  <div class="text-gray-500 text-sm">金额：¥{{ order.amount }}</div>
                </div>
                <el-tag :type="statusMap[order.status]">{{ order.status }}</el-tag>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div class="mt-4 flex justify-end">
          <el-pagination
            small
            layout="prev, pager, next"
            :total="50"
            class="mt-4"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { 
  Goods, 
  SoldOut,
  List 
} from '@element-plus/icons-vue'

// 图表相关
const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 响应式图表
const initChart = () => {
  chart = echarts.init(chartRef.value!)
  const option = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 30 }, (_, i) => `第${i + 1}天`)
    },
    yAxis: { type: 'value' },
    series: [{
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000)),
      type: 'line',
      smooth: true,
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(66,153,225,0.8)' },
        { offset: 1, color: 'rgba(66,153,225,0.1)' }
      ]) }
    }]
  }
  chart.setOption(option)
}

// 自适应调整
const handleResize = () => chart?.resize()
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})

// 模拟数据
const stats = ref([
  { title: '今日订单', value: 356, icon: List, color: '#67C23A', trend: 12.3 },
  { title: '商品总数', value: 1234, icon: Goods, color: '#409EFF', trend: -5.6 },
  { title: '用户总数', value: 5678, icon: SoldOut, color: '#E6A23C', trend: 2.4 }
])

const hotProducts = ref(Array.from({ length: 10 }, (_, i) => ({
  name: `商品 ${i + 1}`,
  sales: Math.floor(Math.random() * 1000),
  percentage: Math.floor(Math.random() * 30 + 20)
})))

const recentOrders = ref(Array.from({ length: 5 }, (_, i) => ({
  no: `2023080${i + 1}`,
  time: `2023-08-0${i + 1} 14:3${i}`,
  amount: (Math.random() * 1000).toFixed(2),
  status: ['待付款', '已发货', '已完成', '已取消'][i % 4]
})))

const statusMap:any = {
  '待付款': 'danger',
  '已发货': 'primary',
  '已完成': 'success',
  '已取消': 'info'
}

const customColors = [
  { color: '#67C23A', percentage: 100 },
  { color: '#E6A23C', percentage: 80 },
  { color: '#F56C6C', percentage: 50 }
]

const dateRange = ref(['2023-08-01', '2023-08-31'])
</script>

<style scoped>
.dashboard-container {
  max-width: 1920px;
  margin: 0 auto;
}

:deep(.el-card__header) {
  @apply bg-gray-50 border-b border-gray-100;
}

:deep(.el-timeline-item__timestamp) {
  @apply text-sm text-gray-500;
}

.el-progress {
  --el-progress-text-color: #666;
}
</style>
