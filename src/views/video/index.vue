<template>
  <div class="video_box">
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
          <img class="icon_s" src="@/assets/home/change.png" />换一换
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
          {{ index == is_copy ? '已复制' : '一键复制' }}
        </div>
      </div>
      <div class="change" @click="getexchanging()">
        <img class="icon_s" src="@/assets/home/change.png" />换一批
      </div>
    </div>
    <div class="steps_box">
      <div class="title_s">发布步骤</div>
      <div class="steps">
        <div>① 下载视频到手机相册</div>
        <div>② 点击复制推荐文案</div>
        <div>
          ③
          打开微信视频号，点击发表视频，相册选择下载好的视频点击下一步，粘贴复制好的文案发布即可；
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideo, getContent, postDownload } from "@/api/index";
import ClipboardJS from "clipboard";
export default {
  name: "Video",
  data() {
    return {
      is_stop: true,
      content: [],
      list: [],
      is_copy: null,
    };
  },

  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get("id");
    // this.getSchemeDetail();
    // this.getexchanging();
  },

  methods: {

    // 视频号获取视频
    getSchemeDetail() {
      getVideo({ id: this.id })
        .then((res) => {
          if (res.data) {
            console.log(res.data, "data");
            this.list = res.data;
          }
        })
    },

    // 视频号获取评论
    getExchanging() {
      getcontent({ id: this.id }).then((res) => {
        console.log(res.data, "评论");
        this.content = res.data.content;
        this.is_copy = null;
      });
    },

    // 下载视频
    download(row) {
      console.log(row, "row");
      if (!row) {
        // MessageBox("提示", "已无视频");
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

    // 
    copy(content, index) {
      // console.log(content, "content");
      this.cope(content);
      console.log(index, "index");
      this.is_copy = index;
      if (this.cope(content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {});
      }
    },

    // 
    play() {
      if (this.is_stop) {
        this.$refs.video.play();
      } else {
        this.$refs.video.pause();
      }
    },

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
  },
};

</script>

<style lang="scss" scoped>
.video_box{

}
</style>
