<template>
  <div class="ModuleFour">
    <div class="ModuleFour_title">商家团购/朋友圈/小程序</div>
    <div class="ModuleFour_list">
      <div class="list_item" v-show="activity.meituan_switch" @click="meiTuAn()">
        <img class="icon" src="@/assets/home/meituan.png" />
        <div class="title">团购+好评</div>
      </div>
      <div class="list_item" v-show="activity.friend_switch" @click="showPopup()">
        <img class="icon" src="@/assets/home/pyq.png" />
        <div class="title">发朋友圈</div>
      </div>
      <div
        class="list_item"
        v-show="activity.mini_program_switch === 1"
        @click="Customize()"
      >
        <img class="icon" :src="activity.mini_program_icon_path" />
        <div class="title">{{ activity.mini_program_name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
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

    // 团购+好评
    meiTuAn() {
      this.cope(this.activity.meituan_content);
      if (this.cope(this.activity.meituan_content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {
        //   window.location.href = this.activity.meituan_scheme;
        // });
      }
    },

    //朋友圈
    showPopup() {
      this.cope(this.activity.friend_content);
      if (this.cope(this.activity.friend_content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {
        //   window.location.href = this.activity.friend_scheme;
        // });
      }
    },

    // 自定义小程序
    Customize() {
      let result = "";
      let sub = "";
      var str = this.activity.mini_program_path;
      var fdStart = str.indexOf("/");
      if (fdStart === 0) {
        sub = str.slice(1);
      } else {
        sub = str;
      }
      var substr = str.substring(0, str.indexOf("?"));
      if (!substr) {
        result = sub;
      } else {
        if (substr.indexOf("/") == 0) {
          result = substr.slice(1);
        } else {
          result = substr;
        }
      }
      var id = str.split("?");
      var id_id = id[1]; // 参数
      console.log(result, id_id, "sss");
      if (id_id === undefined) {
        console.log(1222);
        console.log(
          `weixin://dl/business/?appid=${this.activity.mini_program_appid}&path=${result}`
        );
        window.location.href = `weixin://dl/business/?appid=${this.activity.mini_program_appid}&path=${result}`;
      } else {
        window.location.href = `weixin://dl/business/?appid=${this.activity.mini_program_appid}&path=${result}&query=${id_id}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ModuleFour {
  padding: 0 4%;
  margin-top: 10px;
  .ModuleFour_title {
    color: #ffffff;
    font-size: 13px;
    text-align: left;
    margin: 6px 0 2px 0;
  }
  .ModuleFour_list {
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
