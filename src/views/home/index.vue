<template>
  <div class="home">
    <!-- 背景 -->
    <img v-if="activity.custom_image" :src="activity.custom_image" alt="" class="home_bg" />
    <img v-else :src="pageBg" alt="" class="home_bg" />

    <div class="home_content">
      <!--  -->
      <Header />

      <!--  -->
      <ModuleOne />

      <!--  -->
      <ModuleTwo />

      <!--  -->
      <ModuleThree />

      <!--  -->
      <ModuleFour />

      <!--  -->
      <ModuleFive />

      <!--  -->
      <ModuleSix />
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

// import {
//   // getCode,
//   getActivityDetail,
//   // postKS,
//   // getXhs,
//   // getSignature,
//   // getDouYin,
//   // getKS
// } from '@/api/index';

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

      //
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

  computed: {
    ...mapState({
      activity: (state) => state.activity.form
    })
    // ...mapActions('activity', ['getActivityDetail']),
  },

  created() {
    this.getDetail();
  },

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
      this.$store.dispatch('activity/getActivityDetail', {id:15})
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

  },
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
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
  .home_content{
    position: relative;
  }
}
</style>
