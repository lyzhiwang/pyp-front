<template>
  <div class="ModuleFive">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleFive/bg.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/ModuleFive/title.png"
        alt=""
      />
      <div class="content">
        <div
          v-show="activity.home_switch"
          @click="home_dy()"
          class="content_item"
        >
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFive/bg_1.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="box_top"
              src="@/assets/TemplateTwo/ModuleFive/dy.png"
              alt=""
            />
            <div class="box_name">关注抖音</div>
          </div>
        </div>

        <!-- <div class="content_item">
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFive/bg_2.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="box_top box_top_two"
              src="@/assets/TemplateTwo/ModuleFive/ks.png"
              alt=""
            />
            <div class="box_name box_name_two">关注快手</div>
          </div>
        </div> -->

        <div
          v-if="activity.xhs_follow_switch"
          class="content_item"
          @click="releaseXhs()"
        >
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFive/bg_2.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="box_top box_top_two"
              src="@/assets/TemplateTwo/ModuleFive/xhs.png"
              alt=""
            />
            <div class="box_name box_name_two">发小红书笔记</div>
          </div>
        </div>

        <div
          v-if="activity.xhs_follow_switch"
          @click="addXhs()"
          class="content_item"
        >
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFive/bg_3.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="box_top"
              src="@/assets/TemplateTwo/ModuleFive/xhs.png"
              alt=""
            />
            <div class="box_name box_name_three">关注小红书</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getImageXhs, getSignature } from '@/api/index';
export default {
  name: 'ModuleFive',
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
      openid: (state) => state.activity.openid,
    }),
  },

  created() {},

  methods: {
    // 关注抖音
    home_dy() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = this.activity.home_scheme;
    },

    // 关注小红书
    addXhs() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = this.activity.xhs_follow_url;
    },

    // 发小红书 笔记
    releaseXhs() {
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
  },
};
</script>

<style lang="scss" scoped>
.ModuleFive {
  position: relative;
  width: 94%;
  height: 170px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 170px;
  }
  .content_box {
    position: relative;
    text-align: left;
    padding: 20px 15px 0px 15px;
    .content_box_title {
      width: 90px;
      height: 30px;
    }
    .content {
      display: flex;
      align-items: center;
      .content_item {
        // border: 1px solid red;
        position: relative;
        top: 10px;
        width: 31%;
        height: 100px;
        margin-right: 4%;
        overflow: hidden
        ;
        .content_item_bg {
          position: absolute;
          bottom: -20px;
          left: 0;
          width: 100%;
          height: 100px;
        }
        .content_item_box {
          position: relative;
          width: 100%;
          text-align: center;
          .box_top {
            width: 50%;
            height: auto;
            margin: 0 auto;
          }
          // .box_top_two{
          //   width: 62%;
          // }
          .box_name {
            margin: 0 auto;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: center;
            color: #ffffff;
            width: 75px;
            height: 24px;
            line-height: 24px;
            background: linear-gradient(0deg, #000000 0%, #5b5b5b 100%);
            border-radius: 12px;
          }
          .box_name_two {
            background: linear-gradient(0deg, #ff541e 0%, #ff9f74 100%);
            // background: linear-gradient(0deg, #ff1d2c 0%, #ff7171 100%);
            font-size: 10px;
          }
          .box_name_three {
            background: linear-gradient(0deg, #ff1d2c 0%, #ff7171 100%);
          }
        }
      }
      .content_item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
