<template>
  <main class="videomain">
    <div class="col">
      <video ref="video" :src="sectionVideo" controls @loadedmetadata="loadedmetadata" @ended="ended" @playing="playing" @timeupdate="timeupdate">
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
      currentTime: 0,
      isplay: false,
      isend: false,
      timeobj: '',
      ispost: false,
    }
  },
  created: function () {
    this.sectionVideo = process.env.VUE_APP_IMG_API + this.$route.params.sectionVideo
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  mounted () {
  },
  methods: {
    loadedmetadata () {
      if (this.$refs.video) {
        const l = this.$refs.video.duration
        if (this.$route.params.lookDuration < l) {
          this.$refs.video.currentTime = this.$route.params.lookDuration
          this.currentTime = this.$route.params.lookDuration
        } else {
          this.isend = true
        }
      }
    },
    timeupdate (e){
      if (this.isend) {
        return
      }
      // console.log('timeupdate' + e.target.currentTime)
      // console.log(Math.abs(this.$refs.video.currentTime - this.currentTime))
      if (this.isplay) {
        if (!this.ispost) {
          this.ispost = true
          this.$http.post(`/api/My/AddVideoLog`, {
            "duration": this.$refs.video.currentTime,
            "sectionId": this.$route.params.sectionId,
            "status": 1
          }).then(() => {
            this.timeobj = setTimeout(() => {
              this.ispost = false
            }, 2000)
          })
        }
        if (Math.abs(this.$refs.video.currentTime - this.currentTime) < 0.3) {
          this.currentTime = e.target.currentTime
          this.isplay = true
        } else {
          this.isplay = false
        }
      }
    },
    playing (){
      if (this.isend) {
        return
      }
      if (!this.isplay) {
        if (Math.abs(this.$refs.video.currentTime - this.currentTime) > 0.3) {
          this.$refs.video.currentTime = this.currentTime
        }
      }
      this.isplay = true
    },
    ended (e){
      if (this.isend) {
        return
      }
      this.isplay = false
      // console.log('ended' + e.target.currentTime)
      // console.log(e)
      // console.log(e.target.currentTime)
      this.currentTime = e.target.currentTime
      this.isend = true
      this.$http.post(`/api/My/AddVideoLog`,{
        "duration": this.$refs.video.currentTime,
        "sectionId": this.$route.params.sectionId,
        "status": 2
      }).then(() => {
        this.ispost = false
      })
    }
  }
}
</script>

<style scoped>
 video{
   width: 100%;
 }
</style>