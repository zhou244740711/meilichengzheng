<template>
  <main class="index_main detailsmain">
    <div class="title">{{helpdata.name}}</div>
    <div class="subtitle">{{helpdata.updateDate}}</div>
    <div v-html="helpdata.textContent"></div>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data () {
    return {
      helpdata: {}
    }
  },
  created: function () {
    this.gethelp()
  },
  methods: {
    gethelp () {
      this.$http.get('http://42.192.77.195:7020/api/Website/GetModelByType').then((data) => {
        console.log(data)
      })
      // $.get('http://42.192.77.195:7020/api/Website/GetModelByType', {
      //   type: 1
      // }, (data) => {
      //   console.log(data)
      //   if (data.success){
      //     this.helpdata = data.data
      //   } else {
      //     alert(data.msg)
      //   }
      // })
    }
  }
}
</script>
