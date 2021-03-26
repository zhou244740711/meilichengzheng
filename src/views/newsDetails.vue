<template>
  <main class="index_main detailsmain">
    <div class="title">{{ helpdata.title }}</div>
    <div class="subtitle">{{ helpdata.subhead }}</div>
    <div v-html="helpdata.textContent"></div>
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
      this.$http.get('/api/Website/GetDetailMsg?Id=' + this.$route.query.id).then((res) => {
        this.helpdata = res
      })
    }
  }
}
</script>
