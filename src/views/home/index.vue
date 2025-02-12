<template>
  <div class="home">
    <!--  -->
  </div>
</template>

<script>
import {
  getActivityDetail,
  getdouyin,
  getscheme,
  getsignature,
  getCode,
  getkuaishou,
  postkuaishou,
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

  created(){

  },

  methods:{
    // 
  }
};
</script>

<style lang="scss" scoped>
.home{
  position: relative;
}
</style>
