<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>系统概览</span>
        </div>
      </template>

      <div class="grid grid-cols-3 gap-4">
        <el-statistic title="今日订单" :value="356" />
        <el-statistic title="商品总数" :value="1234" />
        <el-statistic title="用户总数" :value="5678" />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.dashboard-container {
  @apply p-4;
}

.box-card {
  @apply !border-0 !shadow-sm;
}

.card-header {
  @apply text-lg font-medium;
}
</style>
