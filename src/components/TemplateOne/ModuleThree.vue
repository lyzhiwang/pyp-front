<template>
  <div class="ModuleThree">
    <div class="ModuleThree_title">关注/加微信</div>
    <div class="ModuleThree_list">
      <div class="list_item" v-show="activity.home_switch" @click="home_dy()"  >
        <img class="icon" src="@/assets/home/dy.png" />
        <div class="title">关注抖音</div>
      </div>
      <div class="list_item" v-show="activity.wechat_switch" @click="wx()" >
        <img class="icon" src="@/assets/home/wx.png" />
        <div class="title">加微信</div>
      </div>
      <div class="list_item" v-show="activity.shipinhao_switch" @click="sph()">
        <img class="icon" src="@/assets/home/sph.png" />
        <div class="title">视频号</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: '',
  data() {
    return {
      //
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
    }),
  },

  created() {},

  methods: {
    // 关注抖音
    home_dy() {
      window.location.href = this.activity.home_scheme;
    },

    // 加微信
    wx() {
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/touch/wixin&query=id=${this.activity.id}`;
    },

    // 视频号
    sph() {
      this.$router.push({ path: "/video", query: { id: this.activity.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleThree {
  padding: 0 4%;
  margin-top: 10px;
  .ModuleThree_title {
    color: #ffffff;
    font-size: 13px;
    text-align: left;
    margin: 6px 0 2px 0;
  }
  .ModuleThree_list {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .list_item {
      // width: 106px;
      width: 30%;
      height: 74px;
      // background-image: url("@/assets/home/btn_bg.png");
      background-image: url('../../assets/home/btn_bg.png');
      background-repeat: round;
      background-size: cover;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .title {
        font-size: 14px;
        color: #000000;
        font-weight: bold;
      }
    }
  }
}
</style>
