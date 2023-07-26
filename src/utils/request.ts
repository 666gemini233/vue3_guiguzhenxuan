//进行axios二次封装：使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
//第一步：利用axios对象的create方法，去创建axios实例（其他的配置：基础路径、超时时间）
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//第二步：request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
  return config
})
//第三步：响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调：处理http网络错误
    //定义一个变量：存储网络错误信息
    let message = ''
    //http状态码
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现错误'
        break
      default:
        message = '网络出现问题'
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
