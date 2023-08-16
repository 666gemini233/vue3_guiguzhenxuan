<template>
  <el-card>
    <dic class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好！{{ userStore.username }}</h3>
        <p class="subTitle">硅谷甄选运营平台--Gemini</p>
      </div>
    </dic>
  </el-card>
  <div class="footer">
    <svg-icon name="welcome" width="400px" height="400px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
//引入用户相关的仓库，获取用户头像和昵称
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
//获取存储用户信息的仓库对象
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: bolder;
    }
    .subTitle {
      font-style: italic;
      color: rgb(165, 165, 165);
    }
  }
}
.footer {
  display: flex;
  justify-content: center;
}
</style>
