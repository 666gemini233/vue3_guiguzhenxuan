<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!--登录的表单-->
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
//引入获取当前时间的函数
import { getTime } from '@/utils/time'
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
//获取el-form组件
let loginForms = ref()
//获取路由器
let $router = useRouter()
//获取路由对象
let $route = useRoute()
//定义变量控制按钮加载效果
let loading = ref(false)
//收集账号密码数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//登录按钮回调
const login = async () => {
  //保证全部表单项校验通过再发请求
  await loginForms.value.validate()

  if (loading.value === true) return
  //加载效果：开始加载
  loading.value = true
  //通知仓库发登录请求
  //请求成功-首页展示数据的地方
  //请求失败-弹出登录失败信息
  try {
    //保证登录成功
    await useStore.userLogin(loginForm)
    //编程式导航跳转到首页
    //判断登录的时候，路由路径当中是否有query参数，如果有就往 query参数跳转，没有就跳转到首页
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })

    //登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`,
    })
    //登录成功加载效果消失
    loading.value = false
  } catch (error) {
    //登录失败加载效果消失
    loading.value = false
    //登录失败提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

//自定义校验规则函数
// const validatorUserName = (rule: any, value: any, callback: any) => {
//   //rule：校验规则对象
//   //value：表单元素文本内容
//   //callback：符合条件通过，不符合注入错误的提示信息
//   if (value.length >= 5 && value.length <= 10) {
//     callback()
//   } else {
//     callback(new Error('账号长度为5-10位'))
//   }
// }

//定义表单校验需要的配置对象
const rules = {
  username: [
    //规则对象属性:required，代表这个字段务必要校验
    //message：错误提示信息
    //trigger：触发时机
    {
      required: true,
      min: 5,
      max: 10,
      message: '账号长度为6-10位',
      trigger: 'change',
      // validator: validatorUserName,
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: '密码长度为6-15位',
      trigger: 'change',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
