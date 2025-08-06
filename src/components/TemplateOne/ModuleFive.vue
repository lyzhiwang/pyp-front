<template>
  <div class="ModuleFive">
    <!-- <div class="ModuleFive_title">其它</div> -->

    <div class="title_box">
      <img class="title_icon" src="@/assets/home/title/title_5.png" alt="" />
    </div>

    <div class="ModuleFive_list">
      <div class="list_item" v-if="activity.share_switch" @click="addDsp()">
        <img class="icon" src="@/assets/home/dsp.png" />
        <div class="title">分享短视频</div>
      </div>
      <div
        class="list_item"
        v-if="activity.xhs_follow_switch"
        @click="addXhs()"
      >
        <img class="icon" src="@/assets/home/xhs.png" />
        <div class="title">关注小红书</div>
      </div>
      <div class="list_item" v-if="activity.wifi_switch" @click="wifi()">
        <img class="icon" src="@/assets/home/WIFI.png" />
        <div class="title">连WIFI</div>
      </div>
      <div class="list_item" v-if="activity.act_switch" @click="addCard()">
        <img class="icon" src="@/assets/home/yhq.png" />
        <div class="title">领劵活动</div>
      </div>
      <div class="list_item" v-if="activity.xhs_image_switch" @click="xhs()">
        <img class="icon" src="@/assets/home/xhs.png" />
        <div class="title">发小红书笔记</div>
      </div>

      <div
        class="list_item"
        v-if="activity.custom_url_switch"
        @click="tuCustom()"
      >
        <img
          v-if="activity.custom_url_image"
          class="icon"
          :src="activity.custom_url_image"
        />
        <div v-if="activity.custom_url_name" class="title">
          {{ activity.custom_url_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getImageXhs, getSignature } from '@/api/index';
export default {
  name: '',
  data() {
    return {
      xhs_data: {}, //小红书数据
      info: {},
      signature: [],
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
    // 分享短视频
    addDsp() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pages/home/index&query=activity_id=${this.activity.share_activity_id}`;
    },

    // 领劵活动
    addCard() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pages/home/index&query=activity_id=${this.activity.act_activity_id}`;
    },

    // WIFI
    wifi() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/touch/wifi&query=id=${this.activity.id}`;
    },

    //
    addXhs() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = this.activity.xhs_follow_url;
    },

    // 发小红书
    xhs() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      getImageXhs({ id: this.activity.id }).then((res) => {
        if (res.data) {
          this.xhs_data = res.data;
          getSignature().then((res) => {
            this.signature = res.data;
            this.info = {
              type: 'normal', // 必填，笔记类型 'video' | 'normal'
              images: this.xhs_data.xhs_media,
              title: this.xhs_data.xhs_title, // 笔记标题
              content: this.xhs_data.xhs_content, // 笔记正文
              // video: this.xhs_data.xhs_media, // 视频类型必填，必须是服务器地址
              // cover: this.xhs_data.xhs_media, // 视频封面图，必须是服务器地址，暂时不支持本地文件
            };
            xhs.share({
              shareInfo: this.info,
              verifyConfig: {
                appKey: this.signature.appKey, //必填，应用的唯一标识,
                nonce: this.signature.nonce, // 必填，服务端生成签名的随机字符串
                timestamp: this.signature.timeStamp, // 必填，服务端生成签名的时间戳
                signature: this.signature.signature, // 必填，服务端生成的签名
              },
              fail: (e) => {
                console.log(e, '失败');
                // 调用失败时执行的回调函数
              },
            });
          });
        }
      });
    },

    // 自定义网页
    tuCustom() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      if (this.activity.custom_url_path) {
        window.open(this.activity.custom_url_path, '_blank');
      }
      // window.open('https://abc.huixingshuoai.com', '_blank')

      // window.location.href = this.activity.custom_url_path;
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleFive {
  padding: 0 4%;
  margin-top: 15px;
  .ModuleFive_title {
    color: #ffffff;
    font-size: 13px;
    text-align: left;
    margin: 6px 0 2px 0;
    font-weight: bolder;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8),
      0 0 10px rgba(255, 255, 255, 0.3);
  }

  .title_box {
    text-align: left;
    .title_icon {
      // width: 59px;
      width: 52px;
      height: auto;
    }
  }

  .ModuleFive_list {
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .list_item {
      width: 30%;
      height: 74px;
      background-image: url('../../assets/home/btn_bg.png');
      background-repeat: round;
      background-size: cover;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 5%;
      margin-bottom: 12px;
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
    // .list_item:last-child {
    //   margin-right: 0;
    // }
    .list_item:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
