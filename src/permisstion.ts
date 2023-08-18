//路由鉴权，项目当中的路由能不能被访问的权限设置
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token，判断是否登录成功
import pinia from './store'
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)

//全局守卫：项目中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  //访问某个路由之前守卫
  nprogress.start()
  //获取token，判断是否登录
  let token = userStore.token
  //获取用户名字
  let username = userStore.username
  if (token) {
    //用户登录
    if (to.path == '/login') {
      //登录成功不能访问login
      next({ path: '/' })
    } else {
      //登录成功可以访问其余路由

      if (username) {
        //有用户信息，放行
        next()
      } else {
        //没有用户信息，在守卫这里发请求获取到用户信息再放行
        try {
          await userStore.userInfo()
          //万一：刷新时为异步路由，有可能获取到用户信息、异步路由还没有加载完毕，出现空白效果
          next({ ...to })
        } catch (error) {
          //token过期：获取不到用户信息
          //用户手动修改了本地存储token
          //退出登录->用户相关数据清空
          await userStore.userLogout()
          next({ path: '/login', query: { refirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  document.title = setting.title + '-' + to.meta.title
  nprogress.done()
})

//1.任意路由切换实现进度条业务 ---nprogress
//2.路由鉴权（路由组件访问权限设置）
//全部路由组件：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（四个子路由）

//用户未登录：只能访问login，其余指向login
//登录成功：不能访问login（指向首页）
