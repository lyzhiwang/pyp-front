<template>
  <div class="empty-container">
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
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      copyRight: (state) => state.activity.copyRight,
    }),
  },
  methods: {
    step() {
      window.location.href = this.service;
    },
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
