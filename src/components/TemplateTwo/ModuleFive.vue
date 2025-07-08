<template>
  <div class="ModuleFive">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleTwo/bg.png" alt="" />
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
export default {
  name: 'ModuleFive',
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
  },
};
</script>

<style lang="scss" scoped>
.ModuleFive {
  position: relative;
  width: 92%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
  // border: 1px solid red;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
  .content_box {
    position: relative;
    text-align: left;
    padding: 20px 15px;
    padding: 20px 15px 0px 15px;
    .content_box_title {
      width: 90px;
      height: 30px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .content_item {
        // border: 1px solid red;
        position: relative;
        top: 10px;
        width: 31%;
        height: 121px;
        .content_item_bg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: auto;
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
          }
          .box_name_three {
            background: linear-gradient(0deg, #ff1d2c 0%, #ff7171 100%);
          }
        }
      }
    }
  }
}
</style>
