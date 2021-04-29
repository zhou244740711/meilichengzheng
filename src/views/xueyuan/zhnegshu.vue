<template>
  <div class="zhengshu">
    <div class="zhengshuimg">
      <img :src="imgurl(zhengshudata.filePath)" alt="">
    </div>
    <p class="text">长按保存证书</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'zhengshu',
  data() {
    return {
      passId: '',
      zhengshudata: ''
    }
  },
  created: function () {
    this.passId = this.$route.query.passId

  },
  mounted () {
    this.getzhengshu()
  },
  methods: {
    getzhengshu () {
      this.$http.get(`/api/My/GetCert?Id=${this.passId}`).then((res) => {
        if (res !== 500) {
          this.zhengshudata = res[0]
        }
      })
    }
  }
}
</script>

<style scoped>

</style>