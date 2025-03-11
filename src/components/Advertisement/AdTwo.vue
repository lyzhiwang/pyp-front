<template>
  <div class="advertisement" @click="JumpMiniProgram">
    <img class="advertisement_img" :src="adOne" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import adOne from '@/assets/Advertisement/ad_2.png';

export default {
  name: '',
  data() {
    return {
      adOne: adOne,
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType,
    }),
  },

  created() {},

  methods: {
    // 点击跳转小程序
    JumpMiniProgram() {
        if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      const appid = 'wxf069f925066190a5'
      // /pages/tabpages/index?invite_code=87qje9
      const path = '/pages/tabpages/index'
      const invite_code = 'invite_code=87qje9'
      window.location.href = `weixin://dl/business/?appid=${appid}&path=${path}&query=${invite_code}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.advertisement {
  width: 100%;
  position: relative;
  padding: 0 4%;
  margin-top: 10px;
  .advertisement_img {
    width: 100%;
    height: auto;
  }
}
</style>
