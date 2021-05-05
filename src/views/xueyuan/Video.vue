<template>
  <main class="videomain">
    <div class="col">
<!--      <div class="text" style="color: #FFFFFF">-->
<!--        <p>isend: {{isend}}</p>-->
<!--        <p>isload: {{isload}}</p>-->
<!--        <p>currentTime: {{currentTime}}</p>-->
<!--        <p>last: {{last}}</p>-->
<!--        <p>loadedmetadatatext: {{loadedmetadatatext}}</p>-->
<!--        <p>timeupdatetext: {{timeupdatetext}}</p>-->
<!--        <p>endedtext: {{endedtext}}</p>-->
<!--        <p>lookDuration: {{lookDuration}}</p>-->
<!--        <p>duration: {{duration}}</p>-->
<!--      </div>-->
      <video id="my-video" ref="video" :src="sectionVideo" controls>
        <p>视频无法播放</p>
      </video>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Video',
  data() {
    return {
      sectionVideo: '',
      last: 0,
      currentTime: 0,
      isplay: false,
      isend: false,
      timeobj: '',
      ispost: false,
      isload: true,
      loadedmetadatatext: '',
      timeupdatetext: '',
      endedtext: '',
      lookDuration: '',
      duration: ''
    }
  },
  created: function () {
    this.sectionVideo = process.env.VUE_APP_IMG_API + this.$route.params.sectionVideo
    this.lookDuration = this.$route.params.lookDuration
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  mounted () {
    let video = document.getElementById("my-video");
    video.onloadedmetadata = () => {
      this.loadedmetadatatext = true
      this.duration = video.duration
      if (this.formatDecimal(this.lookDuration, 3) < this.formatDecimal(this.duration, 3)) {
        video.currentTime = this.$route.params.lookDuration
        this.currentTime = this.$route.params.lookDuration
        this.last = this.currentTime
      } else {
        this.isend = true
      }
      this.isload = false
    }
    //当目前的播放位置已更改时
    video.ontimeupdate = () => {
      this.timeupdatetext = true
      if (this.isend) {
        return
      }
      // 视频已加载
      if (!this.isload) {
        this.currentTime = video.currentTime;
        if(this.currentTime - this.last > 0.5) {
          video.currentTime = this.last;
        } else {
          this.last = this.currentTime;
        }
        // 是否提交接口
        if (!this.ispost) {
          this.ispost = true
          this.$http.post(`/api/My/AddVideoLog`, {
            "duration": this.currentTime,
            "sectionId": this.$route.params.sectionId,
            "status": 1
          }).then(() => {
            this.timeobj = setTimeout(() => {
              this.ispost = false
            }, 2000)
          })
        }
      }
    };
    // 播放完成
    video.onended = () => {
      this.endedtext = true
      if (this.isend) {
        return
      }
      this.currentTime = video.currentTime
      this.isend = true
      this.$http.post(`/api/My/AddVideoLog`,{
        "duration": this.currentTime,
        "sectionId": this.$route.params.sectionId,
        "status": 2
      }).then(() => {
        this.ispost = false
      })
    }
  },
  methods: {
    formatDecimal(num, decimal) {
      num = num.toString()
      let index = num.indexOf('.')
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
      } else {
        num = num.substring(0)
      }
      return parseFloat(num).toFixed(decimal)
    }
  }
}
</script>

<style scoped>
 video{
   width: 100%;
 }
</style>