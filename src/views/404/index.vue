<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <el-button type="default" size="large" @click="goHome">首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('./home')
}
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: skyblue;
  img {
    margin-left: 350px;
    width: 800px;
    height: 400px;
  }
}
</style>
