<template>
  <div class="ModuleSix">
    <img class="mealImg" :src="activity.set_meal.icon_path" />
    <div class="BoxCard_info">
      <div class="title">{{ activity.set_meal.title }}</div>
      <div class="tag_list">
        <div class="tag">周末节假日通用</div>
        <div class="tag">免费预约</div>
        <div class="tag">过期自动退</div>
        <!-- <div class="tag">已售3022</div> -->
      </div>
      <div class="bottom_btn">
        <div class="money">￥{{ activity.set_meal.price }}</div>
        <div class="receive" @click="set_meal()">抢购</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: '',
  data() {
    return {
      //
    };
  },

  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
    }),
  },

  created() {},

  methods: {
    // 
    set_meal() {
      const { activity_id, set_meal_id } = this.activity.set_meal;
      // let meal_id = set_meal_id;
      // const obj = { activity_id, meal_id };
      const que = `id=${activity_id}&meal_id=${set_meal_id}`;
      let activity = encodeURIComponent(que);
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/seller/detail&query=${activity}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleSix {
  width: 90%;
  display: flex;
  // margin: 0 auto;
  // margin-top: 20px;
  margin: 20px auto 8px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 8px 9px;
  align-items: center;
  .mealImg {
    width: 72.5px;
    height: 72.5px;
    margin-right: 8px;
  }
  .BoxCard_info {
    text-align: left;
    flex: 1;
    height: 72.5px;
    .title {
      font-size: 13px;
      color: #222;
    }
    .tag_list {
      display: flex;
      flex-wrap: wrap;
      margin: 6px 0;
      .tag {
        padding: 0px 4px;
        border: solid 0.5px #e2e0e1;
        margin: 2px 5px 0 0;
        font-size: 8px;
        color: #666666;
        flex-wrap: wrap;
        border-radius: 3px;
      }
    }
    .bottom_btn {
      display: flex;
      justify-content: space-between;
      .money {
        color: #fe3234;
        font-weight: 500;
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
    }
  }
}
</style>
