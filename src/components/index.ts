//引入项目中全部的全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import type { App, Component } from 'vue'
//全局对象
const components: { [name: string]: Component } = { SvgIcon }
//对外暴露插件对象
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
