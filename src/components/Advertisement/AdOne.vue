<template>
  <div class="advertisement">
    <div class="advertisement_item" @click="PhoneBill">
      <img class="item_img" :src="adOne" />
    </div>
    <div class="advertisement_item" @click="film">
      <img class="item_img" :src="adTwo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: '',
  data() {
    return {
      adOne: require('@/assets/ad/adOne.png'),
      adTwo: require('@/assets/ad/adTwo.png')
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType
    }),
  },

  created() {},

  methods: {
    // 小程序交话费
    PhoneBill() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      // const appid = 'wxf069f925066190a5'
      // /pages/tabpages/index?invite_code=87qje9
      const appid = this.activity && this.activity.bxh_appid ? this.activity.bxh_appid : 'wxf069f925066190a5'
      const path = 'pagesub/others/phone/index'
      const invite_code = 'invite_code=87qje9'
      var str = this.activity.bxh_phone_path;
      var id = str.split("?");
      var id_id = id[1]; // 参数
      if(id_id){
        window.location.href = `weixin://dl/business/?appid=${appid}&path=${path}&query=${id_id}`;
      } else {
        window.location.href = `weixin://dl/business/?appid=${appid}&path=${path}`;
      }
    },

    // 电影票
    film() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      // const appid = 'wxf069f925066190a5'
      const appid = this.activity && this.activity.bxh_appid ? this.activity.bxh_appid : 'wxf069f925066190a5'
      // pages/tabpages/index?invite_code=87qje9
      const path = 'pages/film/index'
      const invite_code = 'invite_code=87qje9'

      var str = this.activity.bxh_film_path;
      var id = str.split("?");
      var id_id = id[1]; // 参数
      if(id_id){
        // console.log(`weixin://dl/business/?appid=${appid}&path=${path}&query=${id_id}`);
        window.location.href = `weixin://dl/business/?appid=${appid}&path=${path}&query=${id_id}`;
      } else {
        // console.log(`weixin://dl/business/?appid=${appid}&path=${path}`);
        window.location.href = `weixin://dl/business/?appid=${appid}&path=${path}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.advertisement {
  width: 100%;
  position: relative;
  padding: 0 4%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .advertisement_item{
    width: 48%;
    .item_img{
      width: 100%;
      // height: 74px;
      // height: auto;
      height: 64px;
    }
  }
}
</style>
