<template>
  <div class="zhengshu">
    <div class="zhengshuimg">
      <img :src="imgurl(zhengshudata)" alt="">
    </div>
    <p class="text">长按保存证书</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Zhengming',
  data() {
    return {
      year: '',
      zhengshudata: ''
    }
  },
  created: function () {
    this.year = this.$route.query.year
    this.getzhengshu()
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  computed: {
  },
  methods: {
    getzhengshu () {
      this.$http.get(`/api/My/GetPeriodImg?ParentId=${this.year}`).then((res) => {
        if (res !== 500) {
          this.zhengshudata = res
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>