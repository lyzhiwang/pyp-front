/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/styles/globe.css'
import { Popup } from 'mint-ui';


import VantGreen from 'vant-green';
import 'vant-green/lib/index.css';

Vue.use(VantGreen);

Vue.component(Popup.name, Popup);
// 引入微信的js SDK
import wx from 'weixin-js-sdk'
Vue.prototype.wx = wx

Vue.config.productionTip = false;
// Vue.use(Vant);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
