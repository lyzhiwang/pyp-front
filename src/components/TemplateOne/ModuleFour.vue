<template>
  <div class="ModuleFour">
    <!-- <div class="ModuleFour_title">商家团购/朋友圈/小程序</div> -->

    <div class="title_box">
      <img class="title_icon" src="@/assets/home/title/title_4.png" alt="" />
    </div>

    <div class="ModuleFour_list">
      <div class="list_item" v-if="activity.meituan_switch" @click="meiTuAn()">
        <img class="icon" src="@/assets/home/meituan.png" />
        <div class="title">团购+好评</div>
      </div>
      <div class="list_item" v-if="activity.friend_switch" @click="showPopup()">
        <img class="icon" src="@/assets/home/pyq.png" />
        <div class="title">发朋友圈</div>
      </div>
      <div
        class="list_item"
        v-if="activity.mini_program_switch"
        @click="Customize()"
      >
        <img class="icon" :src="activity.mini_program_icon_path" />
        <div class="title">{{ activity.mini_program_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard';
import { mapState } from 'vuex';
import { Toast, Dialog } from 'vant-green';
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
      PageType: (state) => state.activity.PageType,
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

      //
      // this.cope(this.activity.meituan_content);
      // if (this.cope(this.activity.meituan_content)) {
      //   // MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //   //   window.location.href = this.activity.meituan_scheme;
      //   // });
      //   Dialog.confirm({
      //     // title: '标题',
      //     message: '允许复制文案到剪切板',
      //     // confirmButtonText: '确认',
      //     // cancelButtonText: '取消'
      //   })
      //     .then(() => {
      //       // on confirm
      //       window.location.href = this.activity.meituan_scheme;
      //     })
      //     .catch(() => {
      //       // on cancel
      //     });
      // }
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
  },
};
</script>

<style lang="scss" scoped>
.ModuleFour {
  padding: 0 4%;
  margin-top: 15px;
  .ModuleFour_title {
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
      // width: 111px;
      width: 96px;
      height: auto;
    }
  }

  .ModuleFour_list {
    margin-top: 5px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .list_item {
      // width: 106px;
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
