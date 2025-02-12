<template>
  <div class="empty-container">
    <!-- <van-empty description="网络超时，请扫码重试" /> -->
    <van-error
      :figure="2"
      title="您访问的页面不存在！"
      tip="您可能输错地址，或页面已删除！"
      button="返回首页"
      @clickButton="close" 
    />
    <div class="copyright">{{ copyRight }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Page408',
  computed: {
    ...mapState({
      copyRight: (state) => state.user.copyRight
    })
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    close() {
      // 这个可以关闭安卓系统的手机
      document.addEventListener('WeixinJSBridgeReady', function() {
        // eslint-disable-next-line no-undef
        WeixinJSBridge.call('closeWindow')
      }, false)
      // 这个可以关闭ios系统的手机
      // eslint-disable-next-line no-undef
      WeixinJSBridge.call('closeWindow')
    }
  }
}
</script>
