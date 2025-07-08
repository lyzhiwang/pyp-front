<template>
  <div class="ModuleTwo">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleTwo/bg.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/ModuleTwo/title.png"
        alt=""
      />
      <div class="content">
        <div v-show="activity.dianping_switch" @click="dianPing()" class="content_item">
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleTwo/bg_1.png"
            alt=""
          />
          <div class="content_item_box">
            <div class="content_item_box_top">
              <img
                class="content_item_box_top_icon"
                src="@/assets/TemplateTwo/ModuleTwo/dp_icon.png"
                alt=""
              />
              <div class="content_item_box_top_name">大众点评</div>
            </div>
            <img
              class="content_item_box_down dp_down"
              src="@/assets/TemplateTwo/ModuleTwo/dp.png"
              alt=""
            />
          </div>
        </div>
        <div v-show="activity.poi_switch" @click="poi()" class="content_item">
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleTwo/bg_2.png"
            alt=""
          />
          <div class="content_item_box">
            <div class="content_item_box_top">
              <img
                class="content_item_box_top_icon"
                src="@/assets/TemplateTwo/ModuleTwo/dy_icon.png"
                alt=""
              />
              <div class="content_item_box_top_name">抖音点评</div>
            </div>
            <img
              class="content_item_box_down"
              src="@/assets/TemplateTwo/ModuleTwo/dy.png"
              alt=""
            />
          </div>
        </div>
        <div v-show="activity.gaode_switch" @click="gaoDe()" class="content_item">
          <img
            class="content_item_bg"
            src="@/assets/TemplateTwo/ModuleTwo/bg_3.png"
            alt=""
          />
          <div class="content_item_box">
            <div class="content_item_box_top">
              <img
                class="content_item_box_top_icon"
                src="@/assets/TemplateTwo/ModuleTwo/gd_icon.png"
                alt=""
              />
              <div class="content_item_box_top_name">高德点评</div>
            </div>
            <img
              class="content_item_box_down"
              src="@/assets/TemplateTwo/ModuleTwo/gd.png"
              alt=""
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
  name: 'ModuleTwo',
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

    // 去点评+打卡
    dianPing() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      this.$store
        .dispatch('activity/getActivityDetail', { id: this.activity.id })
        .then((res) => {
          // 新版本
          var imgList = [];
          for (var i = 0; i < this.activity.dianping_image.length; i++) {
            imgList.push(this.activity.dianping_image[i].path);
          }
          var params = {
            title: '点评文案', // 弹窗标题
            content: this.activity.dianping_content, // 文案内容
            imgList: imgList, // 图片列表
            // imgList: [
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399',
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399'
            // ],// 图片列表
            url: this.activity.dianping_scheme, // 跳转链接
            btnText: '大众点评', // 按钮文案
          };
          this.$emit('openPopup', params);
        });
    },

    // 去点评+收藏
    poi() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      this.cope(this.activity.poi_content);
      if (this.cope(this.activity.poi_content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {
        //   window.location.href = this.activity.poi_scheme;
        // });
        Dialog.confirm({
          // title: '标题',
          message: '允许复制文案到剪切板',
          // confirmButtonText: '确认',
          // cancelButtonText: '取消'
        })
          .then(() => {
            // on confirm
            window.location.href = this.activity.poi_scheme;
          })
          .catch(() => {
            // on cancel
          });
      }
    },

    // 点评+收藏
    gaoDe() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }

      this.$store
        .dispatch('activity/getActivityDetail', { id: this.activity.id })
        .then((res) => {
          // 新版本
          var imgList = [];
          for (var i = 0; i < this.activity.gaode_image.length; i++) {
            imgList.push(this.activity.gaode_image[i].path);
          }
          var params = {
            title: '点评文案', // 弹窗标题
            content: this.activity.gaode_content, // 文案内容
            imgList: imgList, // 图片列表
            // imgList: [
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399',
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399'
            // ],// 图片列表
            url: this.activity.gaode_scheme, // 跳转链接
            btnText: '高德点评', // 按钮文案
          };
          this.$emit('openPopup', params);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleTwo {
  position: relative;
  width: 92%;
  margin: 0 auto;
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
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
    .content_box_title {
      width: 90px;
      height: 30px;
    }
    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      .content_item {
        width: 32%;
        height: auto;
        position: relative;
        text-align: center;
        padding: 10px 10px 0px 10px;
        .content_item_bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .content_item_box {
          position: relative;
          height: 142px;
          .content_item_box_top {
            display: flex;
            align-items: center;
            .content_item_box_top_icon {
              width: 30px;
              height: auto;
            }
            .content_item_box_top_name {
              font-size: 12.5px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: bolder;
              text-align: left;
              color: #000000;
              margin-left: 5px;
            }
          }
          .content_item_box_down {
            width: 88%;
            height: auto;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          .dp_down {
            width: 130%;
          }
        }
      }
    }
  }
}
</style>
