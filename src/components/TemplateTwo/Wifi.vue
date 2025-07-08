<template>
  <div class="Wifi">
    <div class="content_box">
      <div class="left_box">
        <div class="img_box">
          <img
            class="img_box_img"
            src="@/assets/TemplateTwo/wifi/wifi.png"
            alt=""
          />
        </div>
        <div class="center_box">
          <div class="name">Wi-Fi：懒人便利店</div>
          <div class="value">密码：123456789</div>
          <!-- <div class="name">Wi-Fi：{{}}</div>
          <div class="value">密码：{{}}</div> -->
        </div>
      </div>

      <div @click="wifi()" class="right_btn">点击链接</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Wifi',
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType,
      openid: (state) => state.activity.openid,
    }),
  },

  created() {},

  methods: {
    // WIFI
    wifi() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/touch/wifi&query=id=${this.activity.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.Wifi {
  position: relative;
  width: 92%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  border-radius: 10px;
  padding: 12px 15px;
  .content_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left_box {
      display: flex;
      align-items: center;
      .img_box {
        width: 66px;
        height: 66px;
        background: #dae8fc;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .img_box_img {
          width: 85%;
          height: auto;
        }
      }
      .center_box {
        margin-left: 10px;
        .name {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
        }
        .value {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
          margin-top: 10px;
        }
      }
    }

    .right_btn {
      width: 81.5px;
      height: 26px;
      background: #dae8fc;
      border-radius: 13px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: bold;
      text-align: center;
      color: #333333;
      line-height: 26px;
    }
  }
}
</style>
