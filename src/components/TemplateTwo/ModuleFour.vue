<template>
  <div class="ModuleFour">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleFour/bg.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/ModuleFour/title.png"
        alt=""
      />
      <div class="content">
        <!-- <div
          v-if="activity.meituan_switch"
          @click="meiTuAn()"
          class="content_item"
        >
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFour/mt.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="icon"
              src="@/assets/TemplateTwo/ModuleFour/mt_icon.png"
              alt=""
            />
            <div class="name">美团团购</div>
          </div>
        </div> -->

        <!-- <div class="content_item">
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFour/dp.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="icon"
              src="@/assets/TemplateTwo/ModuleFour/dp_icon.png"
              alt=""
            />
            <div class="name">大众团购</div>
          </div>
        </div> -->

        <!-- <div class="content_item">
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleFour/dy.png"
            alt=""
          />
          <div class="content_item_box">
            <img
              class="icon"
              src="@/assets/TemplateTwo/ModuleFour/dy_icon.png"
              alt=""
            />
            <div class="name">抖音团购</div>
          </div>
        </div> -->

        <!--  -->
        <div v-if="activity.meituan_switch" class="mt_content"  @click="meiTuAn()">
          <img class="mt_bg" src="@/assets/TemplateTwo/ModuleFour/mt_bg.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { mapState } from 'vuex';
export default {
  name: 'ModuleFour',
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
    // 剪切板
    cope(value) {
      var clipboard = new ClipboardJS('body', {
        text: function () {
          return value;
        },
      });
      clipboard.on('success', function (e) {
        clipboard.destroy();
        e.clearSelection();
        return e.text;
      });

      clipboard.on('error', function () {
        console.log('复制失败');
      });
      return value;
    },

    // 团购+好评
    meiTuAn() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }

      this.$store
        .dispatch('activity/getActivityDetail', { id: this.activity.id })
        .then((res) => {
          // 新版本
          var imgList = [];
          for (var i = 0; i < this.activity.meituan_image.length; i++) {
            imgList.push(this.activity.meituan_image[i].path);
          }
          var params = {
            title: '点评文案', // 弹窗标题
            content: this.activity.meituan_content, // 文案内容
            imgList: imgList, // 图片列表
            // imgList: [
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399',
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399'
            // ],// 图片列表
            url: this.activity.meituan_scheme, // 跳转链接
            btnText: '团购+好评', // 按钮文案
          };
          this.$emit('openPopup', params);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleFour {
  position: relative;
  width: 94%;
  height: 187px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 187px;
  }
  .content_box {
    position: relative;
    text-align: left;
    padding: 22px 15px 10px 15px;
    .content_box_title {
      width: 90px;
      height: 30px;
    }
    .content {
      display: flex;
      align-items: center;
      margin-top: 10px;
      // justify-content: space-between;
      // .content_item {
      //   position: relative;
      //   width: 32%;
      //   height: 120px;
      //   margin-right: 4%;
      //   .content_item_bg {
      //     position: absolute;
      //     width: 100%;
      //     height: 100%;
      //     left: 0;
      //     top: 0;
      //   }
      //   .content_item_box {
      //     position: absolute;
      //     width: 100%;
      //     height: auto;
      //     left: 0;
      //     bottom: 12px;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //     .icon {
      //       width: 30px;
      //       height: auto;
      //     }
      //     .name {
      //       font-size: 15px;
      //       font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      //       font-weight: bolder;
      //       text-align: left;
      //       color: #000000;
      //       margin-left: 3px;
      //     }
      //   }
      // }

      // .content_item:nth-child(3n) {
      //   margin-right: 0;
      // }

      .mt_content{
        width:  100%;
        .mt_bg{
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
