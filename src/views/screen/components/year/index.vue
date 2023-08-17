<template>
  <div class="box7">
    <div class="title">
      <p>年度游客量</p>
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
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: '散点图',
      left: '42%',
      textStyle: {
        color: 'cyan',
      },
    },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {
      show: false,
    },
    series: {
      type: 'scatter',
      data: [
        33, 88, 21, 9, 788, 234, 213, 232, 667, 13, 46, 756, 23, 42, 3, 90,
      ],
      symbol: 'diamond',
      symbolSize: 16,
      label: {
        show: true,
        position: 'top',
        color: 'white',
      },
      itemStyle: {
        color: 'skyblue',
      },
    },
    grid: {
      left: 20,
      right: 20,
      top: 50,
      bottom: 50,
    },
  })
})
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  margin: 20px 0;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 315px;
  }
}
</style>
