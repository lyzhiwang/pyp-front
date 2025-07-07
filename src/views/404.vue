<template>
  <div class="empty-container">
    <!-- <van-empty description="页面错误,请检查您输入的网址是否正确" /> -->
    <van-error
      :figure="2"
      title="您访问的页面不存在！"
      tip="您可能输错地址，或页面已删除！"
      button="返回首页"
      @clickButton="back" 
    />
    <div class="copyright">{{ copyRight }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Page404',
  computed: {
    ...mapState({
      copyRight: (state) => state.user.copyRight
    })
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
