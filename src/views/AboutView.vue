<template>
  <div class="abouts">
    <div class="video-box">
      <video
        class="video"
        @pause="is_stop = true"
        @play="is_stop = false"
        :src="list.video_path"
        ref="video"
        @click="play()"
      ></video>
      <div v-if="is_stop" class="play" @click.stop="play()"></div>
      <div class="computed">
        <div class="time">视频时长：{{ list.duration }}</div>
        <div class="change" @click="getSchemeDetail()">
          <img class="icon_s" src="@/assets/mode/change.png" />换一换
        </div>
        <div class="download" @click="download(list.video_path)">下载视频</div>
      </div>
    </div>
    <div class="content_box">
      <div class="title_s">推广文案</div>
      <div class="copy" v-for="(item, index) in content" :key="index">
        <div class="names">{{ item }}</div>
        <div
          :class="index == is_copy ? 'bottn' : 'bottn_y'"
          @click="copy(item, index)"
        >
          {{ index == is_copy ? "已复制" : "一键复制" }}
        </div>
      </div>
      <div class="change" @click="getexchanging()">
        <img class="icon_s" src="@/assets/mode/change.png" />换一批
      </div>
    </div>
    <div class="steps_box">
      <div class="title_s">发布步骤</div>
      <div class="steps">
        <div>① 下载视频到手机相册</div>
        <div>② 点击复制推荐文案</div>
        <div>③ 打开抖音APP，点击+号发布视频</div>
      </div>
    </div>
  </div>
</template>
<script>
import "mint-ui/lib/style.css";
import { getvideo, getcontent, postDownload } from "@/api/index";
import { MessageBox } from "mint-ui";
import ClipboardJS from "clipboard";

export default {
  name: "AboutView",
  data() {
    return {
      is_stop: true,
      content: [],
      list: [],
      // is_copy: 0,
      is_copy: null,
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get("id");
    this.getSchemeDetail();
    this.getexchanging();
  },
  methods: {
    getSchemeDetail() {
      getvideo({ id: this.id })
        .then((res) => {
          if (res.data) {
            console.log(res.data, "data");
            this.list = res.data;
          }
        })
        .catch((err) => {
          const msg = err && err.message ? err.message : "网络错误";
          MessageBox("提示", msg);
        });
    },
    getexchanging() {
      getcontent({ id: this.id }).then((res) => {
        console.log(res.data, "评论");
        this.content = res.data.content;
        this.is_copy = null;
      });
    },
    download(row) {
      console.log(row, "row");
      if (!row) {
        MessageBox("提示", "已无视频");
      } else {
        var name = "download";
        var url = row;
        // var suffix = url.substring(url.lastIndexOf("."), url.length);
        //跳过浏览直接下载
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const a = document.createElement("a");
            const objectUrl = window.URL.createObjectURL(blob);
            a.download = name;
            a.href = objectUrl;
            a.click();
            window.revokeObjectURL(objectUrl);
          });
        console.log(this.list.id, "this.list.id");
        postDownload(this.list.id).then((res) => {
          console.log("78888", res);
        });
      }
    },
    copy(content, index) {
      // console.log(content, "content");
      this.cope(content);
      console.log(index, "index");
      this.is_copy = index;
      if (this.cope(content)) {
        MessageBox.confirm("允许复制文案到剪切板").then(() => {});
      }
    },
    play() {
      if (this.is_stop) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },
    cope(value) {
      // 剪切板
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
  },
};
</script>
<style lang="css">
.abouts {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  font-size: 14px;
  color: #333;
  position: absolute;
  /* padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important; */
}
.video-box {
  width: 355px;
  height: 240.09px;
  background-color: #ffffff;
  border-radius: 7.5px;
  overflow: hidden;
  margin: 12px auto 0;
  position: relative;
}
.content_box {
  width: 355px;
  height: 170px;
  background-color: #ffffff;
  border-radius: 7.5px;
  overflow: hidden;
  margin: 10px auto 0;
  position: relative;
}
.steps_box {
  width: 355px;
  height: 123px;
  background-color: #ffffff;
  border-radius: 7.5px;
  overflow: hidden;
  margin: 10px auto 0;
  position: relative;
  margin-bottom: 20px;
}
.video {
  width: 317.51px;
  height: 178.5px;
  background-color: #000000;
  margin: 16px 18px 0 18px;
  border-radius: 5px;
}
.play {
  width: 50px;
  height: 50px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  background-image: url("@/assets/mode/play.png");
}
.computed {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 22px;
}
.time {
  color: #212121;
  font-size: 14px;
  font-weight: Regular;
}
.change {
  color: #666666;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.icon_s {
  width: 14.5px;
  height: 12px;
}
.download {
  width: 83.5px;
  height: 29.5px;
  background-image: url("@/assets/mode/download.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  font-size: 12px;
  font-weight: Bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title_s {
  color: #212121;
  font-size: 14px;
  font-weight: Bold;
  text-align: left;
  margin: 7px 0 13px 17px;
}
.names {
  width: 222px;
  color: #666666;
  font-size: 12px;
  font-weight: Regular;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-align: left;
}
.bottn {
  color: #ffffff;
  font-size: 9px;
  background-image: url("@/assets/mode/copy.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 55.5px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottn_y {
  color: #ffffff;
  font-size: 9px;
  background: linear-gradient(90deg, #ff9c5a 0%, #ff5151 60%);
  background-repeat: no-repeat;
  background-size: cover;
  width: 55.5px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9.77px;
}
.copy {
  width: 317.38px;
  height: 40px;
  background-color: #f8f8f8;
  display: flex;
  justify-content: space-between;
  margin: 8px 9px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
}
.change {
  color: #666666;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon_s {
  width: 14.5px;
  height: 12px;
}
.steps {
  text-align: left;
  margin-left: 16px;
  color: #333333;
  font-size: 13px;
}
</style>
