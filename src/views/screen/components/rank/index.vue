<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 盒子将来echarts展示图形图表的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  //获取echarts实例
  let mycharts = echarts.init(charts.value)
  //设置实例的配置项
  mycharts.setOption({
    title: {
      text: '景区排行',
      link: 'https://www.baidu.com',
      left: '42%',
      textStyle: {
        color: 'cyan',
        fontSize: 20,
      },
      subtext: '各大景区',
      subtextStyle: {
        color: 'skyblue',
        fontSize: 16,
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {},
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50],
        label: {
          show: true,
          position: 'insideTop',
          color: 'black',
        },
        showBackground: true,
        backgroundStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'darkblue', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: 'skyblue',
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 60],
        smooth: true,
        itemStyle: {
          color: 'cyan',
        },
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(250,250,250,0.8)',
    },
  })
})
</script>

<style scoped lang="scss">
.box6 {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    width: 100%;
    height: 310px;
  }
}
</style>
