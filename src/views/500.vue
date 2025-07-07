
<template>
  <div class="empty-container">
    <!-- <van-empty :description="msg" /> -->
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
  name: 'Page500',
  computed: {
    ...mapState({
      copyRight: (state) => state.user.copyRight
    }),
    msg() {
      return this.$route.query.message || '活动异常'
    }
  },
  created() {
    if (this.$route.query.message) document.title = this.$route.query.message
  },

  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
