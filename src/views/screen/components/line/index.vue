<template>
  <div class="box5">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let line = ref()
onMounted(() => {
  let mychart = echarts.init(line.value)
  mychart.setOption({
    title: {
      text: '访问量',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: 50,
      right: 20,
      top: 0,
      bottom: 20,
    },
    series: {
      type: 'line',
      data: [120, 1240, 66, 2299, 321, 890, 1200],
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'skyblue', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  })
})
</script>

<style scoped lang="scss">
.box5 {
  width: 96%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: -200px 20px 10px;
  .title {
    color: white;
    margin-left: 10px;
    font-size: 20px;
  }
  .charts {
    margin-top: 10px;
    height: 200px;
  }
}
</style>
