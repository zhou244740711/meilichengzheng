<template>
  <main class="index_main detailsmain">
    <video></video>
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
      this.$http.get('/api/Website/GetModelByType?type=1').then((res) => {
        this.helpdata = res
      })
    }
  }
}
</script>
