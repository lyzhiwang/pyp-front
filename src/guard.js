import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import { Toast , Dialog} from 'vant-green';
Toast.setDefaultOptions('loading', { forbidClick: true })

const whiteList = ['/404', '/408', '/500', '/503', '/510', '/home' ]
router.beforeEach(async(to, from, next) => {
  Toast.loading({ message: '加载中...' })

  // set page title
  document.title = to.meta.title
  // 判断是微信或者支付宝浏览器提示扫码
  if (navigator.userAgent.match(/(MicroMessenger)/i) || navigator.userAgent.match(/Alipay/i)) {
    // // 在微信中打开
    // Dialog.alert({
    //   title: '扫码提示',
    //   message: '请用浏览器扫码'
    // }).then(() => {
    //   // 这个可以关闭安卓系统的手机
    //   document.addEventListener('WeixinJSBridgeReady', function() {
    //     // eslint-disable-next-line no-undef
    //     WeixinJSBridge.call('closeWindow')
    //   }, false)
    //   // 这个可以关闭ios系统的手机
    //   // eslint-disable-next-line no-undef
    //   WeixinJSBridge.call('closeWindow')
    //   return false
    // })

    store.commit('activity/SET_PAGE_TYPE', 2)
    console.log(window.location.href);
    // if(this.$store.state.user.openid === '' || this.$store.state.user.openid === null){
    //   this.$store.dispatch('user/refreshLink').then((link) => {
    //     window.location.href = link
    //   })
    //   return
    // }
    

    if (getToken()) {
      next()
    } else {
      next()
    } 
  } else {
    // console.log('whiteList.includes', to.path)
    // if (getToken()) {
    //   next()
    // } else if (to.path === '/') {
    //   next()
    // } else next('/510')

    store.commit('activity/SET_PAGE_TYPE', 1)
    if (getToken()) {
      next()
    } else {
      next()
    } 
  }
})

router.afterEach(() => {
  Toast.clear()
})

