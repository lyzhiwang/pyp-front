<template>
  <div v-if="!isGzh" class="bg_s">
    <img :src="imgData" alt="" class="ty_ty" />
    <div class="font_size">
      <div class="with">
        <img class="headline" :src="list.store.logo.path" />
        <div class="font">{{ list.store.name }}</div>
      </div>
      <img class="name" src="@/assets/mode/name.png" />
      <!-- <img
        v-else
        class="name_big"
        src="@/assets/mode/big_name.png"
        style="width: 257px; height: 120px; margin: 90px 0"
      /> -->
      <!-- 功能表 -->
      <div v-if="Video.length > 0" class="headline_title">发视频/种草</div>
      <div :class="Video.length != 2 ? 'function' : 'function_s'">
        <div class="txt" v-show="list.douyin_switch" @click="douyin()">
          <img class="icon" src="@/assets/mode/dy.png" />
          <div class="title">发抖音</div>
        </div>
        <div class="txt" v-show="list.xhs_switch" @click="xhs()">
          <img class="icon" src="@/assets/mode/xhs.png" />
          <div class="title">发小红书</div>
        </div>
        <div class="txt" v-show="list.kuaishou_switch" @click="kuaishou()">
          <div>
            <img class="icon" src="@/assets/mode/kuaishou.png" />
            <div class="title">发快手</div>
          </div>
        </div>
      </div>
      <div v-if="Clock.length > 0" class="headline_title">打卡点评</div>
      <div :class="Clock.length != 2 ? 'function' : 'function_s'">
        <div class="txt" v-show="list.dianping_switch" @click="dianping()">
          <img class="icon" src="@/assets/mode/dzdp.png" />
          <div class="title">去点评+打卡</div>
        </div>
        <div class="txt" v-show="list.poi_switch" @click="poi()">
          <img class="icon" src="@/assets/mode/dy.png" />
          <div class="title">去点评+收藏</div>
        </div>
        <div class="txt" v-show="list.gaode_switch" @click="gaode()">
          <img class="icon" src="@/assets/mode/gaode.png" />
          <div class="title">点评+收藏</div>
        </div>
      </div>
      <div v-if="focus.length > 0" class="headline_title">关注/加微信</div>
      <div :class="focus.length != 2 ? 'function' : 'function_s'">
        <div class="txt" v-show="list.home_switch" @click="home_dy()">
          <img class="icon" src="@/assets/mode/dy.png" />
          <div class="title">关注抖音</div>
        </div>
        <div class="txt" v-show="list.wechat_switch" @click="wx()">
          <img class="icon" src="@/assets/mode/wx.png" />
          <div class="title">加微信</div>
        </div>
      </div>
      <div v-if="business.length > 0" class="headline_title">
        商家团购/朋友圈/小程序
      </div>
      <div :class="business.length != 2 ? 'function' : 'function_s'">
        <!-- <div class="txt" v-show="list.home_switch" @click="home_dy()">
          <img class="icon" src="@/assets/mode/dy.png" />
          <div class="title">抖音团购</div>
        </div> -->
        <div class="txt" v-show="list.meituan_switch" @click="meituan()">
          <img class="icon" src="@/assets/mode/meituan.png" />
          <div class="title">美团团购</div>
        </div>
        <div class="txt" v-show="list.friend_switch" @click="showPopup()">
          <img class="icon" src="@/assets/mode/pyq.png" />
          <div class="title">发朋友圈</div>
        </div>
        <div
          class="txt"
          v-show="list.mini_program_switch === 1"
          @click="Customize()"
        >
          <img class="icon" :src="list.mini_program_icon_path" />
          <div class="title">{{ list.mini_program_name }}</div>
        </div>
      </div>
      <div v-if="other.length > 0" class="headline_title">其它</div>
      <div :class="other.length != 2 ? 'function' : 'function_s'">
        <div class="txt" v-show="list.share_switch" @click="adddsp()">
          <img class="icon" src="@/assets/mode/dsp.png" />
          <div class="title">分享短视频</div>
        </div>
        <div class="txt" v-show="list.act_switch" @click="addcard()">
          <img class="icon" src="@/assets/mode/yhq.png" />
          <div class="title">领劵活动</div>
        </div>
        <div class="txt" v-show="list.wifi_switch" @click="wifi()">
          <img class="icon" src="@/assets/mode/WIFI.png" />
          <div class="title">连WIFI</div>
        </div>
      </div>
      <!-- 套餐详情 -->
      <div class="starBoxCard" v-if="list.set_meal_switch">
        <img class="mealImg" :src="list.set_meal.icon_path" />
        <div class="BoxCard_info">
          <div class="s_title">{{ list.set_meal.title }}</div>
          <div class="tagRow flex">
            <div class="tag fcenter">周末节假日通用</div>
            <div class="tag fcenter">免费预约</div>
            <div class="tag fcenter">过期自动退</div>
            <!-- <div class="tag fcenter">已售3022</div> -->
          </div>
          <div class="bottom_btn">
            <div class="money">￥{{ list.set_meal.price }}</div>
            <div class="receive" @click="set_meal()">抢购</div>
            <!-- <a href="https://weixin://dl/business/page?param1=value1&param2=value2"></a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mask">
    <div>
      <img class="arrow" src="@/assets/mode/arrow.png" alt="" width="100px" />
      <div class="text">
        <div class="tip1">
          <span>点击右上角</span>
          <img src="@/assets/mode/write.png" width="2%" class="mar20" />
        </div>
        <div class="tip1">
          选择在<img
            src="@/assets/mode/browser.png"
            width="10%"
            class="mar20"
          />浏览器中打开，
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://fe-static.xhscdn.com/biz-static/goten/xhs-1.0.1.js"></script>
<script>
import ClipboardJS from "clipboard";
import { MessageBox, Indicator } from "mint-ui";
import bgimg from "@/assets/mode/bg_s.png";
// import { mapState, mapMutations } from "vuex";
import "mint-ui/lib/style.css";
import checkBrower from "@/utils/checkBrower";
// import store from "../store";
// import Taro from "@tarojs/taro";
import {
  getActivityDetail,
  getdouyin,
  getscheme,
  getsignature,
  getCode,
  getkuaishou,
  postkuaishou,
} from "@/api/index";

export default {
  data() {
    return {
      isGzh: false,
      isShow: false,
      list_length: [],
      features: [],
      Video: [],
      Clock: [], // 打卡
      focus: [], // 关注
      business: [], // 商家
      other: [], //其他
      list: [],
      xhs_data: [],
      signature: [],
      info: {},
      // kuaishouurl: "",
      trial: "trial",
      id: null,
      imgData: null,
    };
  },
  computed: {
    // ...mapState({
    //   activity: (state) => state.activity,
    // }),
  },
  created() {
    this.isGzh = checkBrower() === 1 ? true : false;
    if (!this.isGzh) {
      console.log(this.$route);
      if (this.$route.query.code && !this.$route.query.state) {
        getCode({ code: this.$route.query.code })
          .then((res) => {
            if (res.data) {
              this.id = res.data.touch_activity_id;
              this.getList();
            }
          })
          .catch((err) => {
            const msg = err && err.message ? err.message : "网络错误";
            MessageBox("提示", msg);
          });
      } else if (this.$route.query.code && this.$route.query.state) {
        //跳转新页面
        this.url();
      } else {
        this.id = this.$route.query.touch_activity_id;
        this.getList();
      }
    }
  },
  methods: {
    getList() {
      console.log("this.id", this.id);
      getActivityDetail({ id: this.id })
        .then((res) => {
          if (res.data) {
            this.list = res.data;
            const {
              douyin_switch,
              dianping_switch,
              friend_switch,
              act_switch,
              home_switch,
              poi_switch,
              gaode_switch,
              share_switch,
              wechat_switch,
              wifi_switch,
              kuaishou_switch,
              meituan_switch,
              xhs_switch,
              mini_program_switch,
            } = res.data;
            if (res.data.custom_bg === 1) {
              this.imgData = require("@/assets/mode/bg_s.png");
            } else {
              this.imgData = res.data.bg_image_path;
            }
            // 统计功能为true的时候的数量长度
            if (douyin_switch) this.Video.push({ douyin_switch });
            if (kuaishou_switch) this.Video.push({ kuaishou_switch });
            if (xhs_switch) this.Video.push({ xhs_switch });
            if (friend_switch) this.business.push({ friend_switch });
            if (dianping_switch) this.Clock.push({ dianping_switch });
            if (poi_switch) this.Clock.push({ poi_switch });
            if (gaode_switch) this.Clock.push({ gaode_switch });
            if (home_switch) this.focus.push({ home_switch });
            if (wechat_switch) this.focus.push({ wechat_switch });
            if (act_switch) this.other.push({ act_switch });
            if (share_switch) this.other.push({ share_switch });
            if (wifi_switch) this.other.push({ wifi_switch });
            if (meituan_switch) this.business.push({ meituan_switch });
            if (mini_program_switch === 1)
              this.business.push({ mini_program_switch });
          }
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          MessageBox("提示", msg);
        });
    },
    //加微信
    url() {
      // this.$store.state.activity.base.detail = "11222";
      this.id = JSON.parse(this.$route.query.state).touch_activity_id;
      this.getList();
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake",
      });
      postkuaishou(JSON.parse(this.$route.query.state).touch_activity_id, {
        code: this.$route.query.code,
      })
        .then((res) => {
          MessageBox({
            title: "提示",
            message: res.message,
            // showCancelButton: true,
          }).then((res) => {
            if (res === "confirm") {
              //点击确定
              var str = window.location.href;
              let substr = str.substring(0, str.indexOf("?"));
              const touch_activity_id = JSON.parse(
                this.$route.query.state
              ).touch_activity_id;
              console.log(substr, str, "pp");
              window.location.href = `${substr}?touch_activity_id=${touch_activity_id}`;
            }
          });
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          MessageBox({
            title: "提示",
            message: err.message,
            // showCancelButton: true,
          }).then((res) => {
            if (res === "confirm") {
              //点击确定
              var str = window.location.href;
              let substr = str.substring(0, str.indexOf("?"));
              const touch_activity_id = JSON.parse(
                this.$route.query.state
              ).touch_activity_id;
              console.log(substr, str, "pp");
              window.location.href = `${substr}?touch_activity_id=${touch_activity_id}`;
            }
          });
          // MessageBox("提示", msg);
        })
        .finally(() => {
          Indicator.close();
        });
    },
    wx() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pagesub/touch/wixin&query=id=${this.list.id}`;
    },
    addcard() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pages/home/index&query=activity_id=${this.list.act_activity_id}`;
    },
    adddsp() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pages/home/index&query=activity_id=${this.list.share_activity_id}`;
    },
    Customize() {
      let result = "";
      let sub = "";
      var str = this.list.mini_program_path;
      var fdStart = str.indexOf("/");
      if (fdStart === 0) {
        sub = str.slice(1);
      } else {
        sub = str;
      }
      var substr = str.substring(0, str.indexOf("?"));
      if (!substr) {
        result = sub;
      } else {
        if (substr.indexOf("/") == 0) {
          result = substr.slice(1);
        } else {
          result = substr;
        }
      }
      var id = str.split("?");
      var id_id = id[1]; // 参数
      console.log(result, id_id, "sss");
      if (id_id === undefined) {
        console.log(1222);
        console.log(
          `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}`
        );
        window.location.href = `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}`;
      } else {
        console.log(777);
        console.log(
          `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}&query=${id_id}`
        );
        window.location.href = `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}&query=${id_id}`;
      }
      // console.log(substr, str, "result");
      // var fdStart = substr.indexOf("/");
      // if (fdStart === 0) {
      //   if (!substr) {
      //     // result = str;
      //     result = str.slice(1);
      //   } else {
      //     result = substr.slice(1);
      //   }
      // } else {
      //   if (!substr) {
      //     result = str;
      //   } else {
      //     result = substr;
      //   }
      // }
      // var id = str.split("?");
      // var id_id = id[1]; // 参数
      // console.log(result, "result444444");
      // console.log(
      //   `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}&query=${id_id}`
      // );
      // window.location.href = `weixin://dl/business/?appid=${this.list.mini_program_appid}&path=${result}&query=${id_id}`;
    },
    //朋友圈
    showPopup() {
      this.cope(this.list.friend_content);
      if (this.cope(this.list.friend_content)) {
        MessageBox.confirm("允许复制文案到剪切板").then(() => {
          window.location.href = this.list.friend_scheme;
        });
      }
    },
    meituan() {
      this.cope(this.list.meituan_content);
      if (this.cope(this.list.meituan_content)) {
        MessageBox.confirm("允许复制文案到剪切板").then(() => {
          window.location.href = this.list.meituan_scheme;
        });
      }
    },
    wifi() {
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pagesub/touch/wifi&query=id=${this.list.id}`;
    },
    set_meal() {
      const { activity_id, set_meal_id } = this.list.set_meal;
      // let meal_id = set_meal_id;
      // const obj = { activity_id, meal_id };
      const que = `id=${activity_id}&meal_id=${set_meal_id}`;
      let activity = encodeURIComponent(que);
      window.location.href = `weixin://dl/business/?appid=${this.list.appid}&path=pagesub/seller/detail&query=${activity}`;
    },
    xhs() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake",
      });
      getscheme({ id: this.list.id })
        .then((res) => {
          if (res.data) {
            this.xhs_data = res.data;
            getsignature().then((res) => {
              this.signature = res.data;
              if (this.xhs_data.xhs_type === 1) {
                this.info = {
                  type: "video", // 必填，笔记类型 'video' | 'normal'
                  // images: this.xhs_data.xhs_media,
                  title: this.xhs_data.xhs_title, // 笔记标题
                  content: this.xhs_data.xhs_content, // 笔记正文
                  video: this.xhs_data.xhs_media, // 视频类型必填，必须是服务器地址
                  cover:
                    this.xhs_data.xhs_media +
                    "?x-oss-process=video/snapshot,w_120,t_1000,f_jpg,m_fast,ar_auto", // 视频封面图，必须是服务器地址，暂时不支持本地文件
                };
              }
              if (this.xhs_data.xhs_type === 2) {
                this.info = {
                  type: "normal", // 必填，笔记类型 'video' | 'normal'
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
                  console.log(e, "失败");
                  // 调用失败时执行的回调函数
                },
              });
            });
          }
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          MessageBox("提示", msg);
        })
        .finally(() => {
          Indicator.close();
        });
    },
    cope(value) {
      // 剪切板
      var clipboard = new ClipboardJS("body", {
        text: function () {
          return value;
        },
      });
      clipboard.on("success", function (e) {
        clipboard.destroy();
        e.clearSelection();
        return e.text;
      });

      clipboard.on("error", function () {
        console.log("复制失败");
      });
      return value;
    },
    douyin() {
      // this.$router.push({ path: "/about", query: { id: this.list.id } });
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake",
      });
      getdouyin({ id: this.list.id })
        .then((res) => {
          window.location.href = res.data.scheme;
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          MessageBox("提示", msg);
        })
        .finally(() => {
          Indicator.close();
        });
    },
    dianping() {
      this.cope(this.list.dianping_content);
      if (this.cope(this.list.dianping_content)) {
        MessageBox.confirm("允许复制文案到剪切板").then(() => {
          window.location.href = this.list.dianping_scheme;
        });
      }
    },
    poi() {
      this.cope(this.list.poi_content);
      if (this.cope(this.list.poi_content)) {
        MessageBox.confirm("允许复制文案到剪切板").then(() => {
          window.location.href = this.list.poi_scheme;
        });
      }
    },
    gaode() {
      this.cope(this.list.gaode_content);
      if (this.cope(this.list.gaode_content)) {
        MessageBox.confirm("允许复制文案到剪切板").then(() => {
          window.location.href = this.list.gaode_scheme;
        });
      }
    },
    home_dy() {
      window.location.href = this.list.home_scheme;
    },
    kuaishou() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake",
      });
      getkuaishou({ id: this.list.id })
        .then((res) => {
          sessionStorage.setItem("kuaishouurl", res.data.url);
          window.location.href = res.data.url;
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          MessageBox("提示", msg);
        })
        .finally(() => {
          Indicator.close();
        });
    },
  },
};
</script>
<style lang="css" scoped>
.about {
  min-height: 100vh;
  background-image: url("@/assets/mode/max.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 21.5px 18px;
}
.font_size {
  z-index: 1024;
  padding: 0 21.5px 18px;
}

.bg_s {
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.ty_ty {
  width: 100%;
  height: 100%;
  position: absolute;
  filter: blur(2.35px);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
}
.yt {
  position: absolute;
}

.with {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 10pt;
}
.font {
  display: flex;
  align-items: center;
  margin-left: 1.8vw;
  color: #ffffff;
  font-size: 4.6vw;
}
.about_max {
  min-height: 100vh;
  background-image: url("@/assets/mode/bg.png");
  padding: 0 21.5px 18px;
  background-repeat: no-repeat;
  background-size: cover;
}
.multiple {
  min-height: 100vh;
  background-image: url("@/assets/mode/multiple.png");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 21.5px 18px;
}
.headline {
  width: auto;
  height: 9.13333vw;
}
.headline_title {
  color: #ffffff;
  font-size: 13px;
  text-align: left;
  margin: 6px 0 2px 0;
}
.name {
  width: 250.5px;
  height: 35px;
}
.icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.function {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.function_s {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 2px;
  width: 67%;
  /* .txt {
    width: 108.5px;
    height: 53px;
    background-image: url("@/assets/mode/btn_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin: 3px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  } */
}
.txt {
  width: 106px;
  height: 74px;
  background-image: url("@/assets/mode/btn_bg.png");
  background-repeat: round;
  background-size: cover;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.title {
  font-size: 14px;
  color: #000000;
  font-weight: bold;
}
.starBoxCard {
  width: 331px;
  display: flex;
  margin: 10px auto 8px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 8px 9px;
  align-items: center;
}
.mealImg {
  width: 72.5px;
  height: 72.5px;
  margin-right: 8px;
}
.money {
  color: #fe3234;
  font-weight: 500;
}
.BoxCard_info {
  text-align: left;
  flex: 1;
  height: 72.5px;
}
.tagRow {
  flex-wrap: wrap;
  margin: 6px 0;
}
.tag {
  padding: 0px 4px;
  border: solid 0.5px #e2e0e1;
  margin: 2px 5px 0 0;
  font-size: 8px;
  color: #666666;
  flex-wrap: wrap;
  border-radius: 3px;
}
.s_title {
  font-size: 13px;
  color: #222;
}
.flex {
  display: flex;
}
.features_t {
  margin-top: 380px;
}
.fcenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.receive {
  width: 52.5px;
  height: 25.5px;
  background: linear-gradient(-90deg, #ff003b 0%, #ff6c5c 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 12px;
}
.bottom_btn {
  display: flex;
  justify-content: space-between;
}
.friends_title {
  font-size: 16px;
  margin-top: 20.5px;
  color: #333333;
  font-weight: bold;
}
.copywriter {
  padding: 12px 22px;
  font-size: 12px;
}
.part {
  text-align: left;
  color: #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cope_title {
  width: 286px;
  margin: 10px;
}
.btn {
  width: 34.5px;
  color: #ff2a48;
}
.info_btn {
  width: 168px;
  height: 32.5px;
  font-size: 14px;
  color: #ffffff;
  background-color: #ff003b;
  border-radius: 16.25px;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 28%;
  margin-bottom: 21px;
}
/* zhezhao */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 111112;
  background-color: rgba(41, 37, 37, 0.9);
  /* pointer-events: none; */
}
.mask .arrow {
  margin-left: 264px;
}
.mask .arrowhead {
  margin-left: 204px;
}
.mask .tip1 {
  display: flex;
  align-items: center;
}
.mask .tip2 {
  padding-top: 100px;
}

.text {
  /* width: 253.5px; */
  height: 80.5px;
  font-size: 20px;
  padding-left: 50px;
  text-align: left;
  color: #ffffff;
  line-height: 60.5px;
}
.mar20 {
  margin: 0 12px;
}
.authPop {
  width: 85%;
  min-height: 344px;
  background: #ffffff;
  border-radius: 10px;
}
/* .cl {
  
} */
</style>
