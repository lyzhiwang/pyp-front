<template>
  <div class="empty-container">
    <!-- <van-empty :description="description">
      <van-button type="default" round plain class="btn-back" @click="step">{{ project_name }}客服</van-button>
    </van-empty> -->
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
  name: 'Page503',
  computed: {
    ...mapState({
      project_name: (state) => state.user.project_name,
      service: (state) => state.user.service,
      copyRight: (state) => state.user.copyRight
    }),
    description() {
      return this.$route.query.message || '8:00 - 12:00系统维护中，请耐心等待'
    }
  },
  methods: {
    step() {
      window.location.href = this.service
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>
