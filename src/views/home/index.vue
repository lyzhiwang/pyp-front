<template>
  <div class="home">
    <!-- 背景 -->
    <img
      v-if="activity && activity.custom_image"
      :src="activity.custom_image"
      alt=""
      class="home_bg"
    />
    <img v-else :src="pageBg" alt="" class="home_bg" />

    <!-- <img :src="pageBg" alt="" class="home_bg" />  -->

    <div class="home_content">
      <!--  -->
      <Header />

      <!--  -->
      <template v-if="activity.douyin_switch || activity.xhs_switch || activity.kuaishou_switch">
        <ModuleOne @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.dianping_switch || activity.poi_switch || activity.gaode_switch">
        <ModuleTwo @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.home_switch || activity.wechat_switch || activity.shipinhao_switch">
        <ModuleThree @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.meituan_switch || activity.friend_switch || activity.mini_program_switch">
        <ModuleFour @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.share_switch || activity.act_switch || activity.wifi_switch">
        <ModuleFive @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.set_meal_switch && activity.set_meal">
        <ModuleSix @openCover="openCover" />
      </template>
      

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
      <van-dialog v-model="popupVisible" title="提示" show-cancel-button confirm-button-color="#e57cff">
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
            <img
              class="yesPng"
              src="@/assets/home/yes.png"
            />
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
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Header from '@/components/TemplateOne/Header';
import ModuleOne from '@/components/TemplateOne/ModuleOne';
import ModuleTwo from '@/components/TemplateOne/ModuleTwo';
import ModuleThree from '@/components/TemplateOne/ModuleThree';
import ModuleFour from '@/components/TemplateOne/ModuleFour';
import ModuleFive from '@/components/TemplateOne/ModuleFive';
import ModuleSix from '@/components/TemplateOne/ModuleSix';

import bgOne from '@/assets/home/bg.png';

import { Toast , Dialog} from 'vant-green';
import {
  getKsAuthorizeLink,
  getCodeToOpenid,
  PostAddTouchNumber,
  PostAddScanNumber,
  getCode,
  postKsPublishVideo
} from '@/api/index';

export default {
  components: {
    Header,
    ModuleOne,
    ModuleTwo,
    ModuleThree,
    ModuleFour,
    ModuleFive,
    ModuleSix,
  },

  data() {
    return {
      pageBg: bgOne, //默认背景图

      isShow: false, //微信中点击打开引导
      id: null,

      popupVisible: false, //快手发布等待中弹窗
      publish_type: 1, //快手发布 1，发布等待 2，成功 3,失败
      defeat: '', // 失败原因

    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType
    }),
    // ...mapActions('activity', ['getActivityDetail']),
  },

  created() {
    this.init()
  },

  methods: {
    ...mapMutations('activity', [
      'SET_OPEN_ID'
    ]),

    //初始化
    init() {
      // 
      if(this.$route.query.code && !this.$route.query.touch_activity_id && !this.$route.query.state){
        getCode({code:this.$route.query.code}).then(res=>{
          if(res.data){
            this.id = res.data.touch_activity_id;
            // 将touch_activity_id添加到url
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('touch_activity_id', this.id);
            history.pushState({}, document.title, newUrl.toString());
            PostAddScanNumber(this.id).then(res=>{
              // 增加扫码次数
              // console.log('增加扫码次数')
              // console.log(res)
            })
            this.PageJudgment()
          }
        })
      } else if(this.$route.query.touch_activity_id && !this.$route.query.code && !this.$route.query.state){
        PostAddTouchNumber(this.$route.query.touch_activity_id).then(res=>{
          // 增加碰一碰次数
          // console.log('增加碰一碰次数')
          // console.log(res) 
        })
        this.PageJudgment()
      } else {
        this.PageJudgment()
      }

    },

    // 页面判断
    PageJudgment(){
      // 微信网页浏览器
      if(this.PageType === 2 || this.PageType === '2'){
        console.log('微信网页初始化')
        if(this.$route.query.touch_activity_id){
          this.id = this.$route.query.touch_activity_id;
        }
        this.getDetail();
      } else {
        // 其他
        // if (this.$route.query.code && !this.$route.query.state) {
        //   console.log(1);
        //   // 获取code  绑定码
        //   getCode({ code: this.$route.query.code })
        //     .then((res) => {
        //       if (res.data) {
        //         this.id = res.data.touch_activity_id;
        //         this.getDetail();
        //       }
        //     })
        // } else 
        if (this.$route.query.code && this.$route.query.state) {
          //快手授权完成拿到code后
          this.id = JSON.parse(this.$route.query.state).touch_activity_id;
          this.getDetail();
          // this.urlKs();
          console.log(2);
        } else if (this.$route.query.from) {
          console.log(3);
          //跳快手授权
          if(this.$route.query.touch_activity_id){
            this.id = this.$route.query.touch_activity_id;
          }
          this.getDetail();
          // this.faBuKs();
        } else {
          console.log(4);
          console.log(this.$route.query);
          console.log(this.$route.query.touch_activity_id);
          //正常打开页面
          if(this.$route.query.touch_activity_id){
            console.log('进入')
            this.id = this.$route.query.touch_activity_id;
          }
          console.log(this.id);
          this.getDetail();
        }
      }
    },

    // 获取数据详情
    getDetail() {
      this.$store.dispatch('activity/getActivityDetail', { id: this.id }).then(res=>{
        console.log('进入1111');
        // 微信网页判断
        if( this.PageType === 2 || this.PageType === '2'){
          console.log('进入2222');
          if(this.$route.query.code && !this.$route.query.openid){
            console.log('进入3333');
            // code存在换取openid
            getCodeToOpenid({code:this.$route.query.code}).then(res=>{
              console.log('code存在换取openid并存储');
              console.log(res);
              this.SET_OPEN_ID(res.data.openid)
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
            })
          } else if(!this.$route.query.openid) {
            console.log('进入4444');
            this.$store.dispatch('user/refreshLink',this.activity).then((link) => {
              // code不存在 跳转授权
              console.log('code不存在 跳转授权');
              console.log(link);
              window.location.href = link
            })
          }
        } else if(this.$route.query.code && this.$route.query.state){
          this.urlKs();
        } else if (this.$route.query.from) {
          this.faBuKs();
        }
      })
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
      postKsPublishVideo(JSON.parse(this.$route.query.state).touch_activity_id, {
        code: this.$route.query.code,
      })
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
          getKsAuthorizeLink({ id: this.activity.id })
            .then((res) => {
              // sessionStorage.setItem("kuaishouurl", res.data.url);
              window.location.href = res.data.url;
            })
          })
        .catch(() => {
          // on cancel
        });
    },

    // 打开遮罩层
    openCover(){
      this.isShow = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  min-height: 100vh; 
  padding-top: 20px;
  padding-bottom: 30px;
  .home_bg {
    width: 100%;
    height: 100%;
    position: absolute;
    filter: blur(2.35px);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .home_content {
    position: relative;
  }

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
    .load_2{
      // border: 1px solid red;
      width: 150px;
      height: 100px;
      // width: 73px;
      // height: 100px;
      .yesPng{
        width: 100px;
        height: 100px;
        // position: relative;
        // left: -40px;
        // top: -20px;
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
</style>
