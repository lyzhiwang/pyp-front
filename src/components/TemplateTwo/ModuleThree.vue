<template>
  <div class="ModuleThree">
    <img class="bg_img" src="@/assets/TemplateTwo/ModuleThree/bg.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/ModuleThree/title.png"
        alt=""
      />
      <div class="content">
        <div
          v-if="activity.friend_switch"
          @click="showPopup()"
          class="content_item"
        >
          <img
            class="icon"
            src="@/assets/TemplateTwo/ModuleThree/pyq.png"
            alt=""
          />
          <div class="name">发朋友圈</div>
        </div>
        <div v-if="activity.wechat_switch" @click="wx()" class="content_item">
          <img
            class="icon"
            src="@/assets/TemplateTwo/ModuleThree/wx.png"
            alt=""
          />
          <div class="name">添加微信</div>
        </div>
        <div
          v-if="activity.shipinhao_switch"
          @click="sph()"
          class="content_item"
        >
          <img
            class="icon"
            src="@/assets/TemplateTwo/ModuleThree/sph.png"
            alt=""
          />
          <div class="name">发视频</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { mapState } from 'vuex';
export default {
  name: 'ModuleThree',
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

    //朋友圈
    showPopup() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }

      this.$store
        .dispatch('activity/getActivityDetail', { id: this.activity.id })
        .then((res) => {
          // 新版本
          var imgList = [];
          for (var i = 0; i < this.activity.friend_image.length; i++) {
            imgList.push(this.activity.friend_image[i].path);
          }
          var params = {
            title: '点评文案', // 弹窗标题
            content: this.activity.friend_content, // 文案内容
            imgList: imgList, // 图片列表
            // imgList: [
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399',
            //   'https://img0.baidu.com/it/u=2191392668,814349101&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1399'
            // ],// 图片列表
            url: this.activity.friend_scheme, // 跳转链接
            btnText: '朋友圈', // 按钮文案
          };
          this.$emit('openPopup', params);
        });

      //
      // this.cope(this.activity.friend_content);
      // if (this.cope(this.activity.friend_content)) {
      //   // MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //   //   window.location.href = this.activity.friend_scheme;
      //   // });
      //   Dialog.confirm({
      //     // title: '标题',
      //     message: '允许复制文案到剪切板',
      //     // confirmButtonText: '确认',
      //     // cancelButtonText: '取消'
      //   })
      //     .then(() => {
      //       // on confirm
      //       window.location.href = this.activity.friend_scheme;
      //     })
      //     .catch(() => {
      //       // on cancel
      //     });
      // }
    },

    // 加微信
    wx() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/touch/wixin&query=id=${this.activity.id}`;
    },

    // 视频号
    sph() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      this.$router.push({
        path: '/video?id=' + this.activity.id,
        replace: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleThree {
  position: relative;
  width: 94%;
  height: 125px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 125px;
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
      margin-top: 10px;
      display: flex;
      align-items: center;
      .content_item {
        width: 32%;
        height: 54px;
        background-color: #ffffff;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 3.5%;
        .icon {
          width: 28px;
          height: auto;
        }
        .name {
          font-size: 15px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: bolder;
          text-align: left;
          color: #000000;
          margin-left: 5px;
        }
      }
      .content_item:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
