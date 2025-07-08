<template>
  <div class="home_content">
    <div class="bg_box">
      <img class="bg_img" src="@/assets/TemplateTwo/ModuleOne/bg.png" alt="" />
    </div>
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
      <ModuleOne @openCover="openCover" @openPopup="openPopup"  />
    </template>

    <!--  -->
    <!-- <template v-if="activity.bxh_ad_switch">
      <AdOne @openCover="openCover" />
    </template> -->

    <!--  -->
    <template
      v-if="
        activity.dianping_switch || activity.poi_switch || activity.gaode_switch
      "
    >
      <ModuleTwo @openCover="openCover" @openPopup="openPopup" />
    </template>

    <!--  -->
    <template
      v-if="
        activity.friend_switch ||
        activity.wechat_switch ||
        activity.shipinhao_switch
      "
    >
      <ModuleThree @openCover="openCover" @openPopup="openPopup"  />
    </template>

    <!--  -->
    <template v-if="activity.meituan_switch">
      <ModuleFour @openCover="openCover" @openPopup="openPopup" />
    </template>

    <!--  -->
    <template v-if="activity.home_switch || activity.xhs_follow_switch">
      <ModuleFive @openCover="openCover" @openPopup="openPopup"  />
    </template>

    <!--  -->
    <template
      v-if="
        activity.share_switch &&
        activity.act_switch &&
        activity.mini_program_switch
      "
    >
      <ModuleSix @openCover="openCover" @openPopup="openPopup"  />
    </template>

    <!--  -->
    <template v-if="activity.wifi_switch">
      <Wifi @openCover="openCover" @openPopup="openPopup"  />
    </template>

    <!--  -->
    <template v-if="activity.set_meal_switch && activity.set_meal">
      <Buying @openCover="openCover"  />
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import Header from '@/components/TemplateTwo/Header';
import ModuleOne from '@/components/TemplateTwo/ModuleOne';
import ModuleTwo from '@/components/TemplateTwo/ModuleTwo';
import ModuleThree from '@/components/TemplateTwo/ModuleThree';
import ModuleFour from '@/components/TemplateTwo/ModuleFour';
import ModuleFive from '@/components/TemplateTwo/ModuleFive';
import ModuleSix from '@/components/TemplateTwo/ModuleSix';
import AdOne from '@/components/Advertisement/AdOne';
import Wifi from '@/components/TemplateTwo/Wifi';
import Buying from '@/components/TemplateTwo/Buying';

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
    Wifi,
    Buying,
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
  .bg_box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .bg_img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
