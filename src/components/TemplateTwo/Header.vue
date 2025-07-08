<template>
  <div class="Header">
    <!-- <div class="bg_box">
      <img class="bg_img" :src="bgImg" alt="" />
    </div> -->
    <div class="content_box">
      <img
        v-if="
          activity &&
          activity.store &&
          activity.store.logo &&
          activity.store.logo.path
        "
        class="logo"
        :src="activity.store.logo.path"
      />
      <div class="name">{{ activity.store.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bgOne from '@/assets/TemplateTwo/ModuleOne/bg.png';
export default {
  name: 'Header',
  data() {
    return {
      bgImg: bgOne,
    };
  },
  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType,
      openid: (state) => state.activity.openid,
    }),
    //
    isRed() {
      if (
        this.activity &&
        this.activity.is_redpacket === true &&
        (this.$route.query.openid || this.openid)
      ) {
        console.log('isRed11111');
        console.log(this.$route.query.openid);
        return true;
      } else {
        console.log('isRed22222');
        console.log(this.$route.query.openid);
        return false;
      }
    },
  },

  created() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.Header {
  position: relative;
  overflow: hidden;
  // .bg_box {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   .bg_img {
  //     width: 100%;
  //     height: auto;
  //   }
  // }
  .content_box {
    position: relative;
    display: flex;
    // align-items: center;
    padding-top: 25px;
    left: 20px;
    height: 285px;
    .logo{
      width: auto;
      height: 28px;
    }
    .name{
      color: #ffffff;
      font-size: 20px;
      margin-left: 10px;
      font-weight: bolder;
    }
  }
}
</style>
