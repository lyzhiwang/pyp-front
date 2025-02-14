<template>
  <div class="ModuleTwo">
    <div class="ModuleTwo_title">打卡点评</div>
    <div class="ModuleTwo_list">
      <div class="list_item" v-show="activity.dianping_switch" @click="dianPing()">
        <img class="icon" src="@/assets/home/dzdp.png" />
        <div class="title">去点评+打卡</div>
      </div>
      <div class="list_item" v-show="activity.poi_switch" @click="poi()">
        <img class="icon" src="@/assets/home/dy.png" />
        <div class="title">去点评+收藏</div>
      </div>
      <div class="list_item" v-show="activity.gaode_switch" @click="gaoDe()">
        <div>
          <img class="icon" src="@/assets/home/gaode.png" />
          <div class="title">点评+收藏</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ClipboardJS from "clipboard";
import { Toast , Dialog} from 'vant-green';
export default {
  name: 'ModuleTwo',
  data() {
    return {
      //
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
    // 剪切板
    cope(value) {
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

    // 去点评+打卡
    dianPing() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      this.cope(this.activity.dianping_content);
      if (this.cope(this.activity.dianping_content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {
        //   window.location.href = this.activity.dianping_scheme;
        // });
        Dialog.confirm({
          // title: '标题',
          message: '允许复制文案到剪切板',
          // confirmButtonText: '确认',
          // cancelButtonText: '取消'
        })
          .then(() => {
            // on confirm
            window.location.href = this.activity.dianping_scheme;
          })
          .catch(() => {
            // on cancel
          });
      }
    },

    // 去点评+收藏
    poi() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      this.cope(this.activity.poi_content);
      if (this.cope(this.activity.poi_content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {
        //   window.location.href = this.activity.poi_scheme;
        // });
        Dialog.confirm({
          // title: '标题',
          message: '允许复制文案到剪切板',
          // confirmButtonText: '确认',
          // cancelButtonText: '取消'
        })
          .then(() => {
            // on confirm
            window.location.href = this.activity.poi_scheme;
          })
          .catch(() => {
            // on cancel
          });
      }
    },

    // 点评+收藏
    gaoDe() {
      if (this.PageType === 2 || this.PageType === '2') {
        this.$emit('openCover')
        return;
      }
      this.cope(this.activity.gaode_content);
      if (this.cope(this.activity.gaode_content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {
        //   window.location.href = this.activity.gaode_scheme;
        // });
        Dialog.confirm({
          // title: '标题',
          message: '允许复制文案到剪切板',
          // confirmButtonText: '确认',
          // cancelButtonText: '取消'
        })
          .then(() => {
            // on confirm
            window.location.href = this.activity.gaode_scheme;
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleTwo {
  padding: 0 4%;
  margin-top: 10px;
  .ModuleTwo_title {
    color: #ffffff;
    font-size: 13px;
    text-align: left;
    margin: 6px 0 2px 0;
  }
  .ModuleTwo_list {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    .list_item {
      // width: 106px;
      width: 30%;
      height: 74px;
      // background-image: url("@/assets/home/btn_bg.png");
      background-image: url('../../assets/home/btn_bg.png');
      background-repeat: round;
      background-size: cover;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .icon {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .title {
        font-size: 14px;
        color: #000000;
        font-weight: bold;
      }
    }
  }
}
</style>
