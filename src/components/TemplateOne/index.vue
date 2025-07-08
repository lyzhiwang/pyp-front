<template>
  <div class="home_content">
    <img
      v-if="activity && activity.custom_bg === 2"
      :src="activity.custom_image"
      alt=""
      class="home_bg"
    />
    <img v-else src="@/assets/home/bg.png" alt="" class="home_bg" />

    <div class="home_content_box">
      <!--  -->
      <Header />

      <!--  -->
      <template
        v-if="
          activity.douyin_switch ||
          activity.xhs_switch ||
          activity.kuaishou_switch
        "
      >
        <ModuleOne @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.bxh_ad_switch">
        <AdOne @openCover="openCover" />
      </template>

      <!--  -->
      <template
        v-if="
          activity.dianping_switch ||
          activity.poi_switch ||
          activity.gaode_switch
        "
      >
        <ModuleTwo @openCover="openCover" @openPopup="openPopup" />
      </template>

      <!--  -->
      <template
        v-if="
          activity.home_switch ||
          activity.wechat_switch ||
          activity.shipinhao_switch
        "
      >
        <ModuleThree @openCover="openCover" />
      </template>

      <!--  -->
      <template
        v-if="
          activity.meituan_switch ||
          activity.friend_switch ||
          activity.mini_program_switch
        "
      >
        <ModuleFour @openCover="openCover" @openPopup="openPopup" />
      </template>

      <!--  -->
      <template
        v-if="
          activity.share_switch ||
          activity.act_switch ||
          activity.wifi_switch ||
          activity.xhs_follow_switch ||
          activity.xhs_image_switch ||
          activity.custom_url_switch
        "
      >
        <ModuleFive @openCover="openCover" />
      </template>

      <!--  -->
      <template v-if="activity.set_meal_switch && activity.set_meal">
        <ModuleSix @openCover="openCover" />
      </template>
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
import AdOne from '@/components/Advertisement/AdOne';
export default {
  components: {
    Header,
    ModuleOne,
    ModuleTwo,
    ModuleThree,
    ModuleFour,
    ModuleFive,
    ModuleSix,
    AdOne,
  },

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
    // ...mapActions('activity', ['getActivityDetail']),
  },

  methods: {
    ...mapMutations('activity', ['SET_OPEN_ID']),

    // 打开遮罩层
    openCover() {
      this.$emit('openCover');
    },

    // 弹窗 复制文案 打开弹窗
    openPopup(item) {
      this.$emit('openPopup', item);
    },
  },
};
</script>

<style lang="scss" scoped>
.home_content {
  position: relative;
  background-color: #efeef3;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 80px;
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
  .home_content_box {
    position: relative;
  }
}
</style>
