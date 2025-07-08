<template>
  <div class="Buying">
    <img class="bg_img" src="@/assets/TemplateTwo/buying/bg.png" alt="" />
    <div class="content_box">
      <img
        class="content_box_title"
        src="@/assets/TemplateTwo/buying/title.png"
        alt=""
      />
      <div class="content">
        <img
          class="mealImg"
          v-if="activity && activity.set_meal && activity.set_meal.icon_path"
          :src="activity.set_meal.icon_path"
        />
        <div class="BoxCard_info">
          <div class="title">{{ activity.set_meal.title }}</div>
          <div class="tag_list">
            <div class="tag">周末节假日通用</div>
            <div class="tag">免费预约</div>
            <div class="tag">过期自动退</div>
          </div>
          <div class="bottom_btn">
            <div class="money">￥{{ activity.set_meal.price }}</div>
            <div class="receive" @click="set_meal()">抢购</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Buying',
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapState({
      activity: (state) => state.activity.form,
      PageType: (state) => state.activity.PageType,
      openid: (state) => state.activity.openid,
    })
  },

  created() {},

  methods: {
    //
    set_meal() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover');
        return;
      }
      const { activity_id, set_meal_id } = this.activity.set_meal;
      const que = `id=${activity_id}&meal_id=${set_meal_id}`;
      let activity = encodeURIComponent(que);
      window.location.href = `weixin://dl/business/?appid=${this.activity.appid}&path=pagesub/seller/detail&query=${activity}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.Buying {
  position: relative;
  width: 92%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
  .bg_img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
  }
  .content_box {
    position: relative;
    text-align: left;
    padding: 20px 15px;
    .content_box_title {
      width: 90px;
      height: 30px;
    }
    .content {
      width: 100%;
      display: flex;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 8px 9px;
      align-items: center;
      margin-top: 8px;
      .mealImg {
        width: 72.5px;
        height: 72.5px;
        margin-right: 8px;
      }
      .BoxCard_info {
        text-align: left;
        flex: 1;
        height: 72.5px;
        width: 68%;
        .title {
          font-size: 13px;
          color: #222;
          white-space: nowrap; /* 防止文本换行 */
          overflow: hidden; /* 隐藏溢出的文本 */
          text-overflow: ellipsis; /* 显示省略号 */
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
  }
}
</style>
