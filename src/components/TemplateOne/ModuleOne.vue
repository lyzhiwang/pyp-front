<template>
  <div class="ModuleOne">
    <div class="ModuleOne_title">
      发视频/种草
    </div>
    <div class="ModuleOne_list">
      <div class="list_item" v-if="activity.douyin_switch" @click="douYin()">
        <img class="icon" src="@/assets/home/dy.png" />
        <div v-if="isRed" class="title">发视频 领红包</div>
        <div v-else class="title">发抖音</div>
      </div>
      <div class="list_item" v-if="activity.xhs_switch" @click="xhs()">
        <img class="icon" src="@/assets/home/xhs.png" />
        <div class="title">发小红书</div>
      </div>
      <div class="list_item" v-if="activity.kuaishou_switch" @click="ks()">
        <div>
          <img class="icon" src="@/assets/home/kuaishou.png" />
          <div class="title">发快手</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { 
  getDy,
  getDyTwo, 
  getXhs, 
  getSignature 
} from '@/api/index';

export default {
  name: '',
  data() {
    return {
      xhs_data:{},  //小红书数据
      info: {},
      signature: []
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType,
      openid: (state) => state.activity.openid,
      // is_redpacket: (state) => state.activity.form.is_redpacket,
    }),
    // 
    isRed(){
      if(this.activity && this.activity.is_redpacket === true && (this.$route.query.openid || this.openid)){
        console.log('isRed11111');
        console.log(this.$route.query.openid);
        return true
      } else {
        console.log('isRed22222');
        console.log(this.$route.query.openid);
        return false
      }
    }
  },

  created() {},

  methods: {
    // 发抖音
    douYin() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      if (this.activity && this.is_redpacket === true && this.$route.query.openid) {
        getDyTwo({ id: this.activity.id, openid:this.$route.query.openid })
          .then((res) => {
            window.location.href = res.data.scheme;
          })
      } else {
        getDy({ id: this.activity.id })
          .then((res) => {
            window.location.href = res.data.scheme;
          })
      }
      
    },

    // 发小红书
    xhs() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      getXhs({ id: this.activity.id })
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
    },

    // 发快手
    ks(){
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      window.location.href = this.activity.kuaishou_url;
    }
  },
};
</script>

<style lang="scss" scoped>
.ModuleOne{
  padding: 0 4%;
  margin-top: 10px;
  .ModuleOne_title{
    color: #ffffff;
    font-size: 13px;
    text-align: left;
    margin: 6px 0 2px 0;
  }
  .ModuleOne_list{
    margin-top: 10px;
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .list_item{
      // width: 106px;
      width: 30%;
      height: 74px;
      // background-image: url("@/assets/home/btn_bg.png");
      background-image: url("../../assets/home/btn_bg.png");
      background-repeat: round;
      background-size: cover;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 5%;
      .icon{
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .title{
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
