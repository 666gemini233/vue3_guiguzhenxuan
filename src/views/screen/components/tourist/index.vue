<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图表的节点 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('216908人')
let charts = ref()
onMounted(() => {
  //获取echarts实例
  let mycharts = echarts.init(charts.value)
  //设置实例的配置项
  mycharts.setOption({
    // //标题组件
    // title: {
    //   text: '',
    // },
    // //x轴组件
    // xAxis: {},
    // //y轴组件
    // yAxis: {},
    //系列：决定展示什么样的图形图标
    series: {
      type: 'liquidFill',
      data: [0.6],
      waveAnimation: true,
      radius: '80%', //半径
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 5,
          borderColor: '#156ACF',
          shadowBlur: 20,
          shadowColor: 'rgba(255, 0, 0, 1)',
        },
      },
    },
    //布局组件
    // grid: {
    //   left: 0,
    //   right: 0,
    //   top: 0,
    //   bottom: 0,
    // },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin: 10px 0;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: orange;
      }
    }
  }
  .number {
    margin: 50px 20px 0 20px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: cyan;
      font-size: 30px;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
