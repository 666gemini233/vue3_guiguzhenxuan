<template>
  <div class="box8">
    <div class="title">
      <p>数据统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let charts = ref()
onMounted(() => {
  let option = {
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '管理', max: 16000 },
        { name: '信息', max: 30000 },
        { name: '顾客', max: 38000 },
        { name: '发展', max: 52000 },
        { name: '市场', max: 25000 },
      ],
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '餐饮',
          },
        ],
      },
    ],
  }
  let mycharts = echarts.init(charts.value)
  mycharts.setOption(option)
})
</script>

<style scoped lang="scss">
.box8 {
  width: 100%;
  height: 100%;
  margin: 10px 0;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 10px;
    color: white;
    font-size: 20px;
  }
  .charts {
    height: 220px;
  }
}
</style>
