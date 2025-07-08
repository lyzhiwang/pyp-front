<template>
  <div class="home">

    <!-- 模板一 -->
    <TemplateOne
      v-if="TemplateId === 1"
      @openCover="openCover"
      @openPopup="openPopup"
    />

    <!-- 模板二 -->
    <TemplateTwo
      v-else-if="TemplateId === 2"
      @openCover="openCover"
      @openPopup="openPopup"
    />

    <!-- <div class="reserveASeat"></div> -->

    <!--  -->
    <div v-if="isShow" class="mask" style="z-index: 999">
      <img class="arrow" src="@/assets/home/arrow.png" alt="" width="100px" />
      <div class="text">
        <div class="tip1">
          <span>点击右上角</span>
          <img src="@/assets/home/write.png" width="2%" class="mar20" />
        </div>
        <div class="tip1">
          选择在<img
            src="@/assets/home/browser.png"
            width="10%"
            class="mar20"
          />浏览器中打开，
        </div>
      </div>
    </div>

    <!--  -->
    <van-dialog
      v-model="popupVisible"
      title="提示"
      show-cancel-button
      confirm-button-color="#e57cff"
    >
      <div class="Popup_box" v-if="publish_type == 1">
        <div class="load">
          <img
            src="@/assets/home/load.gif"
            style="width: 100%; margin-top: -27%"
          />
        </div>
        <div class="Popup_title">视频正在发送中，请稍后····</div>
      </div>
      <div class="Popup_box" v-else>
        <div class="load_2" v-if="publish_type == 2">
          <img class="yesPng" src="@/assets/home/yes.png" />
        </div>
        <div v-if="publish_type == 3" class="load_3">
          <img src="@/assets/home/cole.png" style="width: 100%" />
        </div>
        <div class="Popup_title" v-if="publish_type == 2">
          恭喜您，视频已发送成功!
        </div>
        <div class="Popup_title" v-else>{{ defeat }}</div>
      </div>
    </van-dialog>

    <!--  -->
    <van-popup
      v-model="isCopyShow"
      style="border-top-left-radius: 10px; border-top-right-radius: 10px"
      position="bottom"
    >
      <div class="copy_boX">
        <div class="copy_title">{{ copyData.title }}</div>
        <div class="copywriting">
          <div class="copy_content">{{ copyData.content }}</div>
          <div class="copy_btn" @click="cope(copyData.content)">点击复制</div>
        </div>

        <div class="copy_img">
          <div class="copy_img_title">评论图片</div>
          <div class="copy_img_list">
            <img
              v-for="(item, index) in copyData.imgList"
              :key="index"
              @click="OpenPreview(index)"
              class="list_item_img"
              :src="item"
            />
          </div>
        </div>

        <div class="btn_box">
          <div class="btn_cancel" @click="closePopup()">取消</div>
          <div v-if="copyData.btnText" class="btn_confirm" @click="jumpTo()">
            {{ copyData.btnText }}
          </div>
          <div v-else class="btn_confirm" @click="jumpTo()">确认</div>
        </div>
      </div>
    </van-popup>

    <!--  -->
    <van-image-preview
      v-model="isShowPreview"
      :images="copyData.imgList"
      @change="onChange"
      @close="onClose"
    >
      <template slot="cover">
        <!-- <van-button type="primary" class="download_btn_style" @click="downloadImage()">下载图片</van-button> -->
        <div class="download_tip_style">长按识别保存图片到相册</div>
      </template>
    </van-image-preview>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import TemplateOne from '@/components/TemplateOne/index';
import TemplateTwo from '@/components/TemplateTwo/index';

import bgOne from '@/assets/home/bg.png';

import ClipboardJS from 'clipboard';

import { Toast, Dialog, ImagePreview } from 'vant-green';
import {
  getKsAuthorizeLink,
  getCodeToOpenid,
  PostAddTouchNumber,
  PostAddScanNumber,
  getCode,
  postKsPublishVideo,
} from '@/api/index';

export default {
  components: {
    TemplateOne,
    TemplateTwo
  },

  data() {
    return {
      TemplateId: 2, // 模板
      pageBg: bgOne, //默认背景图

      isShow: false, //微信中点击打开引导
      id: null,

      popupVisible: false, //快手发布等待中弹窗
      publish_type: 1, //快手发布 1，发布等待 2，成功 3,失败
      defeat: '', // 失败原因

      isCopyShow: false, // 是否显示复制弹窗
      copyData: {
        // 复制弹窗数据
        title: '', // 弹窗标题
        content: '', // 文案内容
        imgList: [], // 图片列表
        url: '', // 链接
        btnText: '', // 按钮文案
      },
      isShowPreview: false, // 是否显示图片预览
      imageIndex: 0, // 图片索引
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType,
    }),
    // ...mapActions('activity', ['getActivityDetail']),
  },

  created() {
    this.init();
    // const userAgent = navigator.userAgent;
    // console.log('userAgent');
    // console.log(userAgent);
  },

  methods: {
    ...mapMutations('activity', ['SET_OPEN_ID']),

    //初始化
    init() {
      //
      if (
        this.$route.query.code &&
        !this.$route.query.touch_activity_id &&
        !this.$route.query.state
      ) {
        getCode({ code: this.$route.query.code }).then((res) => {
          if (res.data) {
            this.id = res.data.touch_activity_id;
            // 将touch_activity_id添加到url
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('touch_activity_id', this.id);
            history.pushState({}, document.title, newUrl.toString());
            PostAddScanNumber(this.id).then((res) => {
              // 增加扫码次数
              // console.log('增加扫码次数')
              // console.log(res)
            });
            this.PageJudgment();
          }
        });
      } else if (
        this.$route.query.touch_activity_id &&
        !this.$route.query.code &&
        !this.$route.query.state
      ) {
        PostAddTouchNumber(this.$route.query.touch_activity_id).then((res) => {
          // 增加碰一碰次数
          // console.log('增加碰一碰次数')
          // console.log(res)
        });
        this.PageJudgment();
      } else {
        this.PageJudgment();
      }
    },

    // 页面判断
    PageJudgment() {
      // 微信网页浏览器
      if (this.PageType === 2 || this.PageType === '2') {
        console.log('微信网页初始化');
        if (this.$route.query.touch_activity_id) {
          this.id = this.$route.query.touch_activity_id;
        }
        this.getDetail();
      } else {
        if (this.$route.query.code && this.$route.query.state) {
          //快手授权完成拿到code后
          this.id = JSON.parse(this.$route.query.state).touch_activity_id;
          this.getDetail();
          console.log(2);
        } else if (this.$route.query.from) {
          console.log(3);
          //跳快手授权
          if (this.$route.query.touch_activity_id) {
            this.id = this.$route.query.touch_activity_id;
          }
          this.getDetail();
        } else {
          console.log(4);
          console.log(this.$route.query);
          console.log(this.$route.query.touch_activity_id);
          //正常打开页面
          if (this.$route.query.touch_activity_id) {
            console.log('进入');
            this.id = this.$route.query.touch_activity_id;
          }
          console.log(this.id);
          this.getDetail();
        }
      }
    },

    // 获取数据详情
    getDetail() {
      this.$store
        .dispatch('activity/getActivityDetail', { id: this.id })
        .then((res) => {
          console.log('进入1111');
          // 微信网页判断
          if (this.PageType === 2 || this.PageType === '2') {
            console.log('进入2222');
            if (this.$route.query.code && !this.$route.query.openid) {
              console.log('进入3333');
              // code存在换取openid
              getCodeToOpenid({ code: this.$route.query.code }).then((res) => {
                console.log('code存在换取openid并存储');
                console.log(res);
                this.SET_OPEN_ID(res.data.openid);
                // store.commit('activity/SET_OPEN_ID', res.data.openid)

                // 添加参数到 URL
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('openid', res.data.openid);
                history.pushState({}, document.title, newUrl.toString());

                // 删除 code 参数
                newUrl.searchParams.delete('code');
                history.pushState({}, document.title, newUrl.toString());
                // 删除 state 参数
                newUrl.searchParams.delete('state');
                history.pushState({}, document.title, newUrl.toString());
              });
            } else if (!this.$route.query.openid) {
              console.log('进入4444');
              this.$store
                .dispatch('user/refreshLink', this.activity)
                .then((link) => {
                  // code不存在 跳转授权
                  console.log('code不存在 跳转授权');
                  console.log(link);
                  window.location.href = link;
                });
            }
          } else if (this.$route.query.code && this.$route.query.state) {
            this.urlKs();
          } else if (this.$route.query.from) {
            this.faBuKs();
          }
        });
    },

    //快手授权成功之后
    urlKs() {
      this.popupVisible = true;
      this.id = JSON.parse(this.$route.query.state).touch_activity_id;
      // this.getDetail();
      console.log('快手');
      console.log(window.location.href);
      console.log(this.$route.query);
      console.log('快手');
      // 快手发视频
      postKsPublishVideo(
        JSON.parse(this.$route.query.state).touch_activity_id,
        {
          code: this.$route.query.code,
        }
      )
        .then((res) => {
          this.publish_type = 2;
        }) //发布失败
        .catch((err) => {
          this.publish_type = 3;
          this.defeat = err.message;
        });
    },

    // 发布快手
    faBuKs() {
      Dialog.confirm({
        title: '提示',
        message: '即将发布视频，请点击确定',
        // confirmButtonText: '确认',
        // cancelButtonText: '取消'
      })
        .then(() => {
          // on confirm
          //快手授权页
          getKsAuthorizeLink({ id: this.activity.id }).then((res) => {
            // sessionStorage.setItem("kuaishouurl", res.data.url);
            window.location.href = res.data.url;
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    // 打开遮罩层
    openCover() {
      this.isShow = true;
    },

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
        // Toast.success('复制成功');
        Toast('复制成功');
        // return e.text;
      });

      clipboard.on('error', function () {
        console.log('复制失败');
      });
      // return value;
    },

    // 弹窗 复制文案 打开弹窗
    openPopup(item) {
      // console.log('打开弹窗');
      // console.log(item);
      this.isCopyShow = true;
      this.copyData = item;
    },

    // 弹窗 复制文案 关闭弹窗
    closePopup() {
      // console.log('关闭弹窗');
      this.isCopyShow = false;
      this.copyData = {};
    },

    // 跳转
    jumpTo() {
      window.location.href = this.copyData.url;
    },

    // 预览图片
    OpenPreview(index) {
      // console.log('预览图片');
      // console.log(index);
      this.isShowPreview = true;
      // console.log(this.copyData);
      // ImagePreview({
      //   images: this.copyData.imgList,
      //   startPosition: index,
      //   // onClose() {
      //   //   // do something
      //   // }
      // });
    },

    // 预览图片索引变化
    onChange(index) {
      this.imageIndex = index;
    },

    //
    onClose(index) {
      this.isShowPreview = false;
    },

    // 下载图片
    downloadImage() {
      const link = document.createElement('a');
      link.href = this.copyData.imgList[this.imageIndex];
      link.download = 'image.png'; // 设置下载后的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  .home_content {
    position: relative;
  }
  // .reserveASeat {
  //   position: relative;
  //   width: 100%;
  //   height: 20px;
  // }

  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 111112;
    background-color: rgba(41, 37, 37, 0.9);
    .arrow {
      margin-left: 264px;
    }
    .text {
      height: 80.5px;
      font-size: 20px;
      padding-left: 50px;
      text-align: left;
      color: #ffffff;
      line-height: 60.5px;
      .tip1 {
        display: flex;
        align-items: center;
        .mar20 {
          margin: 0 12px;
        }
      }
    }
  }

  .Popup_box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .load {
      width: 72.5px;
      height: 90px;
    }
    .load_2 {
      width: 150px;
      height: 100px;
      .yesPng {
        width: 100px;
        height: 100px;
      }
    }
    .load_3 {
      width: 66px;
      height: 68px;
    }
    .Popup_title {
      font-size: 15px;
      font-weight: 500;
      color: rgb(177, 117, 226);
      padding-bottom: 10px;
    }
  }
}

.copy_boX {
  .copy_title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin-top: 14px;
  }
  .copywriting {
    width: 92%;
    margin: 0 auto;
    margin-top: 14px;
    // border: 1px solid red;
    border-radius: 6px;
    background-color: #f7f4f6;
    // border: 1px solid rgb(177, 117, 226);
    border: 1px solid rgb(233, 231, 235);
    padding-bottom: 44px;
    position: relative;
    .copy_content {
      width: 96%;
      margin: 0 auto;
      max-height: 88px;
      margin-top: 10px;
      text-align: left;
      overflow-y: auto;
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 3; /* 设置行数 */
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    .copy_btn {
      position: absolute;
      bottom: 10px;
      left: 2%;
      color: red;
    }
  }

  .copy_img {
    width: 92%;
    margin: 0 auto;
    margin-top: 6px;
    .copy_img_title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #333333;
      margin-top: 14px;
    }
    .copy_img_list {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      margin-top: 6px;
      overflow-x: auto; /* 允许水平滚动 */
      white-space: nowrap; /* 防止图片换行 */
      .list_item_img {
        width: 60px;
        height: auto;
        margin-right: 5px;
        border-radius: 5px;
      }
    }
  }

  .btn_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 15px;
    margin-bottom: 20px;
    .btn_cancel {
      width: 150px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      background-color: #ffffff;
      border: 1px solid #c9c9c9;
      border-radius: 10px;
      color: #333333;
    }
    .btn_confirm {
      width: 150px;
      height: 40px;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
      background-color: #639f36;
      border: 1px solid #c9c9c9;
      border-radius: 10px;
      color: #ffffff;
    }
  }
}

.download_btn_style {
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%);
}

.download_tip_style {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%);
  color: #6df704;
}
</style>
