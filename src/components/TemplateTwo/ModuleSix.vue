<template>
  <div class="ModuleSix">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleSix/bg.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/ModuleSix/title.png"
        alt=""
      />
      <div class="content">
        <!-- <div
          v-if="activity.share_switch"
          @click="addDsp()"
          class="content_item"
        >
          <img
            class="item_bg"
            src="@/assets/TemplateTwo/ModuleSix/dsp.png"
            alt=""
          />
          <div class="name">分享短视频</div>
        </div> -->

        <!-- <div
          v-if="activity.act_switch"
          @click="addCard()"
          class="content_item"
        >
          <img
            class="item_bg"
            src="@/assets/TemplateTwo/ModuleSix/quan.png"
            alt=""
          />
          <div class="name name_two">领券活动</div>
        </div> -->

        <!-- <div
          v-if="activity.mini_program_switch"
          @click="Customize()"
          class="content_item"
        >
          <img
            class="item_bg"
            src="@/assets/TemplateTwo/ModuleSix/szr.png"
            alt=""
          />
          <div class="name name_three">{{ activity.mini_program_name }}</div>
        </div> -->

        <div
          v-if="activity.mini_program_switch"
          @click="Customize()"
          class="content_item"
        >
          <img
            class="item_bg"
            src="@/assets/TemplateTwo/ModuleSix/bg_1.png"
            alt=""
          />

          <div class="item_content">
            <div class="name">{{ activity.mini_program_name }}</div>
            <img
              v-if="activity.mini_program_icon_path"
              class="icon"
              :src="activity.mini_program_icon_path"
            />
          </div>
        </div>
        <!--  -->
        <div
          v-if="activity.custom_url_switch"
          @click="Customize()"
          class="content_item"
        >
          <img
            class="item_bg"
            src="@/assets/TemplateTwo/ModuleSix/bg_1.png"
            alt=""
          />

          <div class="item_content">
            <div class="name">{{ activity.custom_url_name }}</div>
            <img
              v-if="activity.custom_url_image"
              class="icon"
              :src="activity.custom_url_image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ModuleSix',
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

    // 自定义小程序
    Customize() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      let result = '';
      let sub = '';
      var str = this.activity.mini_program_path;
      var fdStart = str.indexOf('/');
      if (fdStart === 0) {
        sub = str.slice(1);
      } else {
        sub = str;
      }
      var substr = str.substring(0, str.indexOf('?'));
      if (!substr) {
        result = sub;
      } else {
        if (substr.indexOf('/') == 0) {
          result = substr.slice(1);
        } else {
          result = substr;
        }
      }
      var id = str.split('?');
      var id_id = id[1]; // 参数
      console.log(result, id_id, 'sss');
      if (id_id === undefined) {
        console.log(1222);
        console.log(
          `weixin://dl/business/?appid=${this.activity.mini_program_appid}&path=${result}`
        );
        window.location.href = `weixin://dl/business/?appid=${this.activity.mini_program_appid}&path=${result}`;
      } else {
        window.location.href = `weixin://dl/business/?appid=${this.activity.mini_program_appid}&path=${result}&query=${id_id}`;
      }
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
.ModuleSix {
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
    padding: 20px 15px;
    .content_box_title {
      width: 77px;
      height: 30px;
    }
    // .content {
    //   position: relative;
    //   width: 100%;
    //   display: flex;
    //   align-items: center;
    //   // justify-content: space-between;
    //   margin-top: 10px;
    //   .content_item {
    //     width: 31%;
    //     position: relative;
    //     height: 118px;
    //     margin-right: 4%;
    //     .item_bg {
    //       position: absolute;
    //       left: 0;
    //       top: 0;
    //       width: 100%;
    //       height: auto;
    //     }
    //     .name {
    //       margin-top: 10px;
    //       width: 100%;
    //       text-align: center;
    //       position: relative;
    //       font-size: 16px;
    //       font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    //       font-weight: bolder;
    //       color: #ed9124;
    //       letter-spacing: 2px;
    //     }
    //     .name_two {
    //       color: #593dec;
    //     }
    //     .name_three {
    //       color: #b42ed4;
    //     }
    //   }
    //   .content_item:nth-child(3n) {
    //     margin-right: 0;
    //   }
    // }
    .content {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 3px;
      .content_item {
        width: 31%;
        position: relative;
        height: 96px;
        margin-right: 4%;
        .item_bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .item_content {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          padding-top: 13px;
          .name {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: center;
            // color: #464747;
            color: #2b8ffd;
          }
          .name_two {
            color: #fb5757;
          }
          .name_three {
            color: #fd9038;
          }
          .icon {
            margin-top: 10px;
            width: 30px;
            height: 30px;
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
