<template>
  <div class="ModuleFive">
    <div class="ModuleFive_title">其它</div>
    <div class="ModuleFive_list">
      <div class="list_item" v-if="activity.share_switch" @click="addDsp()">
        <img class="icon" src="@/assets/home/dsp.png" />
        <div class="title">分享短视频</div>
      </div>
      <div class="list_item" v-if="activity.act_switch" @click="addCard()">
        <img class="icon" src="@/assets/home/yhq.png" />
        <div class="title">领劵活动</div>
      </div>
      <div class="list_item" v-if="activity.wifi_switch" @click="wifi()">
        <img class="icon" src="@/assets/home/WIFI.png" />
        <div class="title">连WIFI</div>
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
      PageType: (state) => state.activity.PageType
    }),
  },

  created() {},

  methods: {

    // 分享短视频
    addDsp() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pages/home/index&query=activity_id=${this.activity.share_activity_id}`;
    },

    // 领劵活动
    addCard() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pages/home/index&query=activity_id=${this.activity.act_activity_id}`;
    },

    // WIFI
    wifi() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/touch/wifi&query=id=${this.activity.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleFive {
  padding: 0 4%;
  margin-top: 10px;
  .ModuleFive_title {
    color: #ffffff;
    font-size: 13px;
    text-align: left;
    margin: 6px 0 2px 0;
  }
  .ModuleFive_list {
    margin-top: 10px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .list_item {
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
      margin-right: 5%;
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
    .list_item:last-child {
      margin-right: 0;
    }
  }
}
</style>
