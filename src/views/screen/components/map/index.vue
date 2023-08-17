<template>
  <div class="box4" ref="map">我是地图组件</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let map = ref()
//注册中国地图
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let mychart = echarts.init(map.value)
  mychart.setOption({
    //地图组件
    geo: {
      map: 'china',
      roam: true,
      //地图位置
      left: 100,
      top: 100,
      right: 100,
      bottom: 100,
      //地图上文字设置
      label: {
        show: true,
        color: 'white',
      },
      itemStyle: {
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
        opacity: 0.8,
      },
      //地图高亮效果
      emphasis: {
        itemStyle: {
          color: 'darkblue',
        },
        label: {
          color: 'cyan',
          fontSize: 20,
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [121.472644, 31.231706], // 终点
              // 如果 polyline 为 true 还可以设置更多的点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 3,
            },
          },
          {
            coords: [
              [118.767413, 32.041544], // 起点
              [104.065735, 30.659462], // 终点
              // 如果 polyline 为 true 还可以设置更多的点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 3,
            },
          },
        ],
        //开启特效
        effect: {
          show: true,
          symbol: 'arrow',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss"></style>
