import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/dependency/axios.js'

// 基础样式
import '@/css/base.css'

// vantui 按需引入
import { Toast, Popup, Picker, List, Lazyload, Field, CellGroup } from 'vant'
Vue.use(Toast).use(Popup).use(Picker).use(List).use(Lazyload, { lazyComponent: true }).use(Field).use(CellGroup)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
