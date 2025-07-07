import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import '@/guard' // 路由守卫

import '@/style/index.scss'

import VantGreen from 'vant-green';
import 'vant-green/lib/index.css';

Vue.use(VantGreen);

// import Vconsole from 'vconsole'
// new Vconsole()

// 引入微信的js SDK
import wx from 'weixin-js-sdk'
Vue.prototype.wx = wx


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
