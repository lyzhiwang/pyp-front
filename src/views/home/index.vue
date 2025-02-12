<template>
  <div class="home">
    <!-- 背景 -->
    <img :src="imgData" alt="" class="ty_ty" />

    <!--  -->
    <div>
      <div class="">
        <img class="" src="" />
        <div class="">{{}}</div>
      </div>
      <img class="name" src="@/assets/home/name.png" />
    </div>
  </div>
</template>

<script>
import { 
  getCode, 
  getActivityDetail, 
  postKS, 
  getXhs, 
  getSignature,
  getDouYin,
  getKS
} from '@/api/index';
export default {
  data() {
    return {
      isGzh: false, //微信还是浏览器
      isshow: false, //微信中点击打开引导
      popupVisible: false, //快手发布等待中弹窗
      publish_type: 1, //快手发布 1，发布等待 2，成功 3,失败
      defeat: '', // 失败原因
      Video: [], //每一项列表的长度集合
      Clock: [], // 打卡
      focus: [], // 关注
      business: [], // 商家
      other: [], //其他
      list: [], //列表数据
      xhs_data: [], //小红书数据
      signature: [],
      info: {},
      id: null,
      imgData: null,
    };
  },

  created() {},

  methods: {
    //初始化
    init() {
      if (this.$route.query.code && !this.$route.query.state) {
        console.log(1);
        //获取code  绑定码
        getCode({ code: this.$route.query.code })
          .then((res) => {
            if (res.data) {
              this.id = res.data.touch_activity_id;
              // this.getList();
            }
          })
          .catch((err) => {
            const msg = err && err.message ? err.message : '网络错误';
            // MessageBox('提示', msg);
          });
      } else if (this.$route.query.code && this.$route.query.state) {
        //快手授权完成拿到code后
        this.id = JSON.parse(this.$route.query.state).touch_activity_id;
        // this.getList();
        // this.url();
        console.log(2);
      } else if (this.$route.query.from) {
        console.log(3);
        //跳快手授权
        this.id = this.$route.query.touch_activity_id;
        // this.getList();
        // this.getkuaishou();
      } else {
        console.log(4);
        //正常打开页面
        this.id = this.$route.query.touch_activity_id;
        // this.getList();
      }
    },

    // 获取数据详情
    getDetail() {
      getActivityDetail({ id: this.id })
        .then((res) => {
          if (res.data) {
            // 背景图
            if (res.data.custom_bg === 1) {
              // if (res.data.custom_image === 0) {
              //   this.imgData = require("@/assets/mode/bg_s.png");
              // }
              // if (res.data.custom_image === 1) {
              // this.imgData = require('@/assets/mode/bg_s.png');
              // }
              // if (res.data.custom_image === 2) {
              //   this.imgData = require("@/assets/mode/bg.png");
              // }
              // if (res.data.custom_image === 3) {
              //   this.imgData = require("@/assets/mode/bg_s.png");
              // }
              // if (res.data.custom_image === 4) {
              //   this.imgData = require("@/assets/mode/bg_s.png");
              // }
              // if (res.data.custom_image === 5) {
              //   this.imgData = require("@/assets/mode/bg_s.png");
              // }
            } else {
              this.imgData = res.data.custom_image;
            }
            // 统计功能为true的时候的数量长度
            // if (douyin_switch) this.Video.push({ douyin_switch });
            // if (kuaishou_switch) this.Video.push({ kuaishou_switch });
            // if (xhs_switch) this.Video.push({ xhs_switch });
            // if (friend_switch) this.business.push({ friend_switch });
            // if (dianping_switch) this.Clock.push({ dianping_switch });
            // if (poi_switch) this.Clock.push({ poi_switch });
            // if (gaode_switch) this.Clock.push({ gaode_switch });
            // if (home_switch) this.focus.push({ home_switch });
            // if (wechat_switch) this.focus.push({ wechat_switch });
            // if (shipinhao_switch) this.focus.push({ shipinhao_switch });
            // if (act_switch) this.other.push({ act_switch });
            // if (share_switch) this.other.push({ share_switch });
            // if (wifi_switch) this.other.push({ wifi_switch });
            // if (meituan_switch) this.business.push({ meituan_switch });
            // if (mini_program_switch === 1) this.business.push({ mini_program_switch });
            //
            // }
          }
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : '网络错误';
          // MessageBox("提示", msg);
        });
    },

    //快手授权成功之后
    url() {
      this.popupVisible = true;
      this.id = JSON.parse(this.$route.query.state).touch_activity_id;
      // this.getList();
      // 快手发视频
      postKS(JSON.parse(this.$route.query.state).touch_activity_id, {
        code: this.$route.query.code,
      })
        .then((res) => {
          // this.publish_type = 2;
        }) //发布失败
        .catch((err) => {
          // this.publish_type = 3;
          // this.defeat = err.message;
        });
    },

    // 加微信
    addWx() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pagesub/touch/wixin&query=id=${this.list.id}`;
    },

    // 领劵活动
    addCard() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pages/home/index&query=activity_id=${this.list.act_activity_id}`;
    },

    // 分享短视频
    shareDsp() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pages/home/index&query=activity_id=${this.list.share_activity_id}`;
    },

    // 视频号
    sph() {
      this.$router.push({ path: '/about', query: { id: this.list.id } });
    },

    // 自定义小程序
    Customize() {
      let result = '';
      let sub = '';
      var str = this.list.mini_program_path;
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
          `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}`
        );
        window.location.href = `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}`;
      } else {
        window.location.href = `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}&query=${id_id}`;
      }
    },

    // 朋友圈
    showPopup() {
      // this.cope(this.list.friend_content);
      // if (this.cope(this.list.friend_content)) {
      //   MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //     window.location.href = this.list.friend_scheme;
      //   });
      // }
    },

    // 美团
    MT() {
      // this.cope(this.list.meituan_content);
      // if (this.cope(this.list.meituan_content)) {
      //   MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //     window.location.href = this.list.meituan_scheme;
      //   });
      // }
    },

    // 小程序链接wifi
    wifi() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pagesub/touch/wifi&query=id=${this.list.id}`;
    },

    // 套餐详情
    set_meal() {
      // const { activity_id, set_meal_id } = this.list.set_meal;
      // // let meal_id = set_meal_id;
      // // const obj = { activity_id, meal_id };
      // const que = `id=${activity_id}&meal_id=${set_meal_id}`;
      // let activity = encodeURIComponent(que);
      // window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pagesub/seller/detail&query=${activity}`;
    },

    //小红书
    xhs() {
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'snake',
      // });
      getXhs({ id: this.list.id })
        .then((res) => {
          if (res.data) {
            this.xhs_data = res.data;
            getSignature().then((res) => {
              this.signature = res.data;
              if (
                this.xhs_data.xhs_type === 1 ||
                this.xhs_data.xhs_type === 3
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
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : '网络错误';
          // MessageBox('提示', msg);
        })
        .finally(() => {
          // Indicator.close();
        });
    },

    // 剪切板
    cope(value) {
      // var clipboard = new ClipboardJS("body", {
      //   text: function () {
      //     return value;
      //   },
      // });
      // clipboard.on("success", function (e) {
      //   clipboard.destroy();
      //   e.clearSelection();
      //   return e.text;
      // });

      // clipboard.on("error", function () {
      //   console.log("复制失败");
      // });
      // return value;
    },

    // 抖音
    douYin() {
      // this.$router.push({ path: "/about", query: { id: this.list.id } });
      // Indicator.open({
      //   text: "加载中...",
      //   spinnerType: "snake",
      // });
      getDouYin({ id: this.list.id })
        .then((res) => {
          window.location.href = res.data.scheme;
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          // MessageBox("提示", msg);
        })
        .finally(() => {
          // Indicator.close();
        });
    },

    // 大众点评
    dianPing() {
      // this.cope(this.list.dianping_content);
      // if (this.cope(this.list.dianping_content)) {
      //   MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //     window.location.href = this.list.dianping_scheme;
      //   });
      // }
    },


    // 去点评+收藏
    poi() {
      // this.cope(this.list.poi_content);
      // if (this.cope(this.list.poi_content)) {
      //   MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //     window.location.href = this.list.poi_scheme;
      //   });
      // }
    },

    // 点评+收藏
    CommentCollection() {
      // this.cope(this.list.gaode_content);
      // if (this.cope(this.list.gaode_content)) {
      //   MessageBox.confirm("允许复制文案到剪切板").then(() => {
      //     window.location.href = this.list.gaode_scheme;
      //   });
      // }
    },

    // 关注抖音
    TikTok() {
      window.location.href = this.list.home_scheme;
    },


    // 发布快手
    ks() {
      MessageBox.alert("即将发布视频，请点击确定", "提示").then((res) => {
        if (res === "confirm") {
          // 快手授权页
          getKS({ id: this.list.id })
            .then((res) => {
              // sessionStorage.setItem("kuaishouurl", res.data.url);
              window.location.href = res.data.url;
            })
            .catch((err) => {
              const msg = err && err.message ? err.message : "网络错误";
              // MessageBox("提示", msg);
            });
        }
      });
    },

    // 
    toKs() {
      window.location.href = this.list.kuaishou_url;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
}
</style>
