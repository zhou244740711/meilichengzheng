<template>
  <main class="index_main detailsmain">
    <div class="title">{{ helpdata.name }}</div>
    <div class="subtitle">{{ helpdata.updateDate | dateformat }}</div>
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
    this.$wxShare.updateWxShareConfig({
      link: location.href
    });
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
