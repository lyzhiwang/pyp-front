<template>
  <div class="video_page">
    <div class="video_box">
      <video
        class="video"
        @pause="is_stop = true"
        @play="is_stop = false"
        :src="list.video_path"
        ref="video"
        @click="play()"
      ></video>

        <!-- disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback" -->
      <div v-if="is_stop" class="play" @click.stop="play()"></div>
      <div class="computed">
        <div class="time">视频时长：{{ list.duration }}</div>
        <div class="change" @click="getSchemeDetail(id)">
          <img class="icon_s" src="@/assets/home/change.png" />换一换
        </div>
        <!-- <div class="download" @click="download(list.video_path)">下载视频</div>  -->
        <div class="download" @click="downloadVideo(list.video_path)">
          下载视频
        </div>
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
      <div class="change" @click="getExchanging(id)">
        <img class="icon_s" src="../../assets/home/change.png" />换一批
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

    <!--  -->
    <div v-if="isDownloading" class="progress_container">
      <div class="icon_load">
        <van-loading type="spinner" color="#ffffff" />
      </div>

      <div class="tip_text">{{ `下载中... ${downloadProgress}%` }}</div>
      <div class="progress_bar_box">
        <div
          class="progress_bar"
          :style="{ width: downloadProgress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideo, getContent, postDownload } from '@/api/index';
import ClipboardJS from 'clipboard';
import { Toast, Dialog } from 'vant-green';
export default {
  name: 'Video',
  data() {
    return {
      id: null,
      is_stop: true,
      content: [],
      list: [],
      is_copy: null,

      videoUrl: 'your-video-url.mp4', // 替换为你的视频URL
      isDownloading: false,
      downloadProgress: 0,
      downloadController: null, // 用于取消下载
    };
  },

  mounted() {
    // const urlParams = new URLSearchParams(window.location.search);
    // this.id = urlParams.get('id');
    // this.getSchemeDetail();
    // this.getExchanging();
  },

  created() {
    this.id = this.$route.query.id;
    this.getSchemeDetail(this.id);
    this.getExchanging(this.id);
  },

  beforeUnmount() {
    // 组件卸载时取消下载
    this.cancelDownload();
  },

  methods: {
    // 视频号获取视频
    getSchemeDetail(id) {
      getVideo({ id: id }).then((res) => {
        if (res.data) {
          console.log(res.data, 'data');
          this.list = res.data;
        }
      });
    },

    // 视频号获取评论
    getExchanging(id) {
      getContent({ id: id }).then((res) => {
        console.log(res.data, '评论');
        this.content = res.data.content;
        this.is_copy = null;
      });
    },

    // 下载视频
    download(row) {
      console.log(row, 'row');
      if (!row) {
        // MessageBox("提示", "已无视频");
      } else {
        var name = 'download';
        var url = row;
        // var suffix = url.substring(url.lastIndexOf("."), url.length);
        //跳过浏览直接下载
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            const a = document.createElement('a');
            const objectUrl = window.URL.createObjectURL(blob);
            a.download = name;
            a.href = objectUrl;
            a.click();
            window.revokeObjectURL(objectUrl);
          });
        console.log(this.list.id, 'this.list.id');
        postDownload(this.list.id).then((res) => {
          console.log('78888', res);
        });
      }
    },

    //
    copy(content, index) {
      // console.log(content, "content");
      this.cope(content);
      // console.log(index, 'index');
      this.is_copy = index;
      if (this.cope(content)) {
        // MessageBox.confirm("允许复制文案到剪切板").then(() => {});
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
      var clipboard = new ClipboardJS('body', {
        text: function () {
          return value;
        },
      });
      clipboard.on('success', function (e) {
        clipboard.destroy();
        e.clearSelection();
        return e.text;
      });

      clipboard.on('error', function () {
        console.log('复制失败');
      });
      return value;
    },

    // 下载视频
    async downloadVideo(row) {
      if (this.isDownloading) return;

      this.isDownloading = true;
      this.downloadProgress = 0;

      try {
        // 创建AbortController以便可以取消下载
        this.downloadController = new AbortController();

        const response = await fetch(row, {
          signal: this.downloadController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 获取内容长度用于计算进度
        const contentLength = response.headers.get('content-length');
        let receivedLength = 0;

        // 创建读取流
        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          chunks.push(value);
          receivedLength += value.length;

          // 更新进度
          if (contentLength) {
            this.downloadProgress = Math.round(
              (receivedLength / contentLength) * 100
            );
          }

          // 防止Vue频繁更新导致的性能问题
          await new Promise((resolve) => setTimeout(resolve, 10));
        }

        // 合并所有chunks
        const blob = new Blob(chunks);
        this.saveFile(blob);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('下载失败:', error);
          alert('下载失败: ' + error.message);
        }
      } finally {
        this.isDownloading = false;
        this.downloadController = null;
      }
    },

    // 保存文件
    saveFile(blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();

      // 清理
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },

    // 获取文件名
    getFileNameFromUrl(url) {
      return url.split('/').pop().split('?')[0];
    },

    // 取消下载
    cancelDownload() {
      if (this.downloadController) {
        this.downloadController.abort();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.video_page {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  font-size: 14px;
  color: #333;
  position: absolute;
  .video_box {
    width: 355px;
    height: 240.09px;
    background-color: #ffffff;
    border-radius: 7.5px;
    overflow: hidden;
    margin: 12px auto 0;
    position: relative;
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
      background-image: url('../../assets/home/play.png');
    }
    .computed {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px 22px;
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
        .icon_s {
          width: 14.5px;
          height: 12px;
        }
      }
      .download {
        width: 83.5px;
        height: 29.5px;
        background-image: url('../../assets/home/download.png');
        background-repeat: no-repeat;
        background-size: cover;
        color: #ffffff;
        font-size: 12px;
        font-weight: Bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .content_box {
    width: 355px;
    height: 170px;
    background-color: #ffffff;
    border-radius: 7.5px;
    overflow: hidden;
    margin: 10px auto 0;
    position: relative;
    .title_s {
      color: #212121;
      font-size: 14px;
      font-weight: Bold;
      text-align: left;
      margin: 7px 0 13px 17px;
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
        background-image: url('../../assets/home/copy.png');
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
    }
    .change {
      color: #666666;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon_s {
        width: 14.5px;
        height: 12px;
      }
    }
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
    .title_s {
      color: #212121;
      font-size: 14px;
      font-weight: Bold;
      text-align: left;
      margin: 7px 0 13px 17px;
    }

    .steps {
      /* width: 1050px; */
      text-align: left;
      margin-left: 16px;
      color: #333333;
      font-size: 13px;
    }
  }
}

.progress_container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 150px;
  background-color: rgba(26, 24, 24, 0.5);
  border-radius: 5px;
  overflow: hidden;
  .icon_load {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .tip_text {
    text-align: center;
    color: #ffffff;
    // margin-top: 10px;
  }
  .progress_bar_box {
    width: 90%;
    background-color: #f8f8f8;
    margin: 0 auto;
    margin-top: 10px;
    height: 10px;
    border-radius: 50px;
    transition: width 0.3s ease;
    .progress_bar {
      height: 10px;
      background-color: #33d1f8;
      border-radius: 50px;
      transition: width 0.3s ease;
    }
  }
}
</style>

<style>
/* video::-webkit-media-controls-download-button {
  display: none !important;
}
video::-moz-media-controls-download-button {
  display: none !important;
}
video::-ms-media-controls-download-button {
  display: none !important;
}

video::-webkit-media-controls-download-button {
  display: none !important;
} */
</style>
