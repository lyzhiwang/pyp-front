<template>
  <div class="ModuleOne">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleOne/bg_1.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/ModuleOne/title.png"
        alt=""
      />
      <!-- <div class="content">
        <div v-if="activity.douyin_switch" @click="douYin()" class="dy_box">
          <div class="dy_box_top">
            <img
              class="dy_box_top_img"
              src="@/assets/TemplateTwo/ModuleOne/dy_top.png"
              alt=""
            />
            <div v-if="isRed" class="dy_box_title">发视频 领红包</div>
            <div v-else class="dy_box_title">发抖音</div>
          </div>
          <img
            class="ks_box_down_img"
            src="@/assets/TemplateTwo/ModuleOne/dy_down.png"
            alt=""
          />
        </div>

        <div class="content_right">
          <div v-if="activity.kuaishou_switch" @click="ks()" class="ks_box">
            <div class="ks_box_top">
              <img
                class="ks_box_top_img"
                src="@/assets/TemplateTwo/ModuleOne/ks_top.png"
                alt=""
              />
              <div class="ks_box_title">发快手</div>
            </div>
            <img
              class="ks_box_down_img"
              src="@/assets/TemplateTwo/ModuleOne/ks_down.png"
              alt=""
            />
          </div>
          <div class="xhs_box">
            <div
              v-show="activity.xhs_switch"
              @click="xhs()"
              class="xhs_box_top"
            >
              <img
                class="xhs_box_top_img"
                src="@/assets/TemplateTwo/ModuleOne/xhs_top.png"
                alt=""
              />
              <div class="xhs_box_title">发小红书</div>
            </div>
            <img
              class="xhs_box_down_img"
              src="@/assets/TemplateTwo/ModuleOne/xhs_down.png"
              alt=""
            />
          </div>
        </div>
      </div> -->

      <div class="content_two">
        <div v-if="activity.douyin_switch" class="content_two_item item_dy" @click="douYin()">
          <div class="item_title">
            <img
              class="item_title_img"
              src="@/assets/TemplateTwo/ModuleOne/dy_top.png"
              alt=""
            />
            <div class="item_title_text">发抖音</div>
          </div>
          <img
            class="dy_down"
            src="@/assets/TemplateTwo/ModuleOne/dy_down_two.png"
            alt=""
          />
        </div>

        <div v-if="activity.kuaishou_switch" class="content_two_item item_ks" @click="ks()">
          <div class="item_title">
            <img
              class="item_title_img"
              src="@/assets/TemplateTwo/ModuleOne/ks_top.png"
              alt=""
            />
            <div class="item_title_text">发快手</div>
          </div>
          <img
            class="ks_down"
            src="@/assets/TemplateTwo/ModuleOne/ks_down.png"
            alt=""
          />
        </div>

        <div v-if="activity.xhs_switch" class="content_two_item item_xhs" @click="xhs()">
          <div class="item_title">
            <img
              class="item_title_img"
              src="@/assets/TemplateTwo/ModuleOne/xhs_top.png"
              alt=""
            />
            <div class="item_title_text">发小红书</div>
          </div>
          <img
            class="xhs_down"
            src="@/assets/TemplateTwo/ModuleOne/xhs_down.png"
            alt=""
          />
        </div>

        <div v-if="activity.daijia_switch" class="content_two_item item_dj" @click="ProxyDriving()">
          <div class="item_title">
            <img
              class="item_title_img"
              src="@/assets/TemplateTwo/ModuleOne/dj_top.png"
              alt=""
            />
            <div class="item_title_text">呼叫代驾</div>
          </div>
          <img
            class="dj_down"
            src="@/assets/TemplateTwo/ModuleOne/dj_down.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getDy, getDyTwo, getXhs, getSignature } from '@/api/index';
export default {
  name: 'ModuleOne',
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

  methods: {
    // 发抖音
    douYin() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      if (
        this.activity &&
        this.activity.is_redpacket === true &&
        this.$route.query.openid
      ) {
        getDyTwo({
          id: this.activity.id,
          openid: this.$route.query.openid,
        }).then((res) => {
          window.location.href = res.data.scheme;
        });
      } else {
        getDy({ id: this.activity.id }).then((res) => {
          window.location.href = res.data.scheme;
        });
      }
    },

    // 发小红书
    xhs() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      getXhs({ id: this.activity.id }).then((res) => {
        if (res.data) {
          this.xhs_data = res.data;
          getSignature().then((res) => {
            this.signature = res.data;
            if (
              this.xhs_data.xhs_type === 1 ||
              this.xhs_data.xhs_type === 3 ||
              this.xhs_data.xhs_type === 4
            ) {
              this.info = {
                type: 'video', // 必填，笔记类型 'video' | 'normal'
                // images: this.xhs_data.xhs_media,
                title: this.xhs_data.xhs_title, // 笔记标题
                content: this.xhs_data.xhs_content, // 笔记正文
                video: this.xhs_data.xhs_media, // 视频类型必填，必须是服务器地址
                cover:
                  this.xhs_data.xhs_media +
                  '?x-oss-process=video/snapshot,w_120,t_1000,f_jpg,m_fast,ar_auto', // 视频封面图，必须是服务器地址，暂时不支持本地文件
              };
            }
            if (this.xhs_data.xhs_type === 2) {
              this.info = {
                type: 'normal', // 必填，笔记类型 'video' | 'normal'
                images: this.xhs_data.xhs_media,
                title: this.xhs_data.xhs_title, // 笔记标题
                content: this.xhs_data.xhs_content, // 笔记正文
                // video: this.xhs_data.xhs_media, // 视频类型必填，必须是服务器地址
                // cover: this.xhs_data.xhs_media, // 视频封面图，必须是服务器地址，暂时不支持本地文件
              };
            }
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

    // 发快手
    ks() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = this.activity.kuaishou_url;
    },

    // 呼叫代驾
    ProxyDriving(){
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      this.$emit('CallForAChauffeur');
    }
  },
};
</script>

<style lang="scss" scoped>
.ModuleOne {
  position: relative;
  width: 94%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  // width: 350px;
  height: 255px;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 255px;
  }
  .content_box {
    position: relative;
    text-align: left;
    padding: 20px 15px;
    .content_box_title {
      width: 113px;
      height: 29px;
    }
    // .content {
    //   position: relative;
    //   display: flex;
    //   // align-items: center;
    //   margin-top: 10px;
    //   justify-content: space-between;
    //   // border: 1px solid red;
    //   .dy_box {
    //     overflow: hidden;
    //     height: 180px;
    //     width: 48%;
    //     background: linear-gradient(-54deg, #c6e0ff 0%, #f3fdff 100%);
    //     border-radius: 10px;
    //     padding: 15px 0px 0px 15px;
    //     .dy_box_top {
    //       display: flex;
    //       align-items: center;
    //       .dy_box_top_img {
    //         width: 30px;
    //         height: auto;
    //       }
    //       .dy_box_title {
    //         font-size: 16px;
    //         font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    //         font-weight: bolder;
    //         text-align: left;
    //         color: #000000;
    //         margin-left: 6px;
    //       }
    //     }
    //     .ks_box_down_img {
    //       width: 90%;
    //       height: auto;
    //       margin: 0 auto;
    //     }
    //   }

    //   .content_right {
    //     width: 48%;
    //     height: 180px;
    //     .ks_box {
    //       background: linear-gradient(-54deg, #ffe8c6 25%, #fffcf3 100%);
    //       border-radius: 8px;
    //       text-align: right;
    //       padding: 12px 0px 0px 12px;
    //       height: 85px;
    //       margin-bottom: 10px;
    //       .ks_box_top {
    //         display: flex;
    //         align-items: center;
    //         text-align: left;
    //         .ks_box_top_img {
    //           width: 25px;
    //           height: auto;
    //         }
    //         .ks_box_title {
    //           font-size: 14px;
    //           font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    //           font-weight: bolder;
    //           text-align: left;
    //           color: #000000;
    //           margin-left: 6px;
    //         }
    //       }
    //       .ks_box_down_img {
    //         // width: 66%;
    //         // height: auto;
    //         width: 90px;
    //         height: 74px;
    //         margin-right: 10px;
    //         position: relative;
    //         top: -22px;
    //       }
    //     }

    //     .xhs_box {
    //       height: 85px;
    //       background: linear-gradient(-54deg, #ffc6c6 0%, #fff3f3 100%);
    //       border-radius: 8px;
    //       text-align: right;
    //       padding: 12px 0px 0px 12px;
    //       .xhs_box_top {
    //         width: 100%;
    //         display: flex;
    //         align-items: center;
    //         text-align: left;
    //         .xhs_box_top_img {
    //           width: 25px;
    //           height: auto;
    //         }
    //         .xhs_box_title {
    //           font-size: 14px;
    //           font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    //           font-weight: bolder;
    //           text-align: left;
    //           color: #000000;
    //           margin-left: 5px;
    //         }
    //       }
    //       .xhs_box_down_img {
    //         // width: 50%;
    //         // height: auto;
    //         width: 70px;
    //         height: 51px;
    //         position: relative;
    //         top: -10px;
    //       }
    //     }
    //   }
    // }

    .content_two {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .content_two_item {
        width: 48%;
        height: 90px;
        border-radius: 10px;
        position: relative;
        .item_title {
          display: flex;
          align-items: center;
          padding-left: 10px;
          padding-top: 10px;
          .item_title_img {
            width: 30px;
            height: auto;
          }
          .item_title_text {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #000000;
            margin-left: 5px;
          }
        }

        .dy_down {
          width: 100px;
          height: auto;
          position: absolute;
          right: 2px;
          bottom: 2px;
        }
        .ks_down{
          width: 100px;
          height: auto;
          position: absolute;
          right: 2px;
          bottom: 2px;
        }
        .xhs_down{
          width: 83px;
          height: auto;
          position: absolute;
          right: 2px;
          bottom: 2px;
        }
        .dj_down{
          width: 112px;
          height: auto;
          position: absolute;
          right: 2px;
          bottom: 2px;
        }
      }

      .item_dy{
        background: linear-gradient(-54deg, #c6e0ff 0%, #f3fdff 100%);
      }

      .item_ks{
        background: linear-gradient(-54deg,#ffe8c6 25%, #fffcf3 100%);
      }

      .item_xhs{
        background: linear-gradient(-54deg,#ffc6c6 0%, #fff3f3 100%);
      }

      .item_dj{
        background: linear-gradient(-54deg,#a0ddff 0%, #eaf5ff 100%);
      }

      .content_two_item:nth-child(1) {
        margin-bottom: 10px;
      }
      .content_two_item:nth-child(2) {
        margin-bottom: 10px;
        margin-left: 4%;
      }
      .content_two_item:nth-child(3) {
        // margin-left: 10px;
      }
      .content_two_item:nth-child(4) {
        margin-left: 4%;
      }
    }
  }
}
</style>
