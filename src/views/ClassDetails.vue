<template>
  <main class="index_main detailsmain">
    <vue-core-video-player :src="imgurl(helpdata.video)"></vue-core-video-player>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
      helpdata: {}
    }
  },
  created: function () {
    this.gethelp()
  },
  methods: {
    gethelp() {
      this.$http.get('/api/Website/DetailCourseShow?Id=' + this.$route.query.id).then((res) => {
        this.helpdata = res
      })
    }
  }
}
</script>
