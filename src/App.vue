<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "assets/css/style";

</style>
<script>
export default {
  components: {},
  mounted () {
    // var shareUrl = process.env.VUE_APP_BASE + '/login';
    this.$wxShare.updateWxShareConfig();
  },
  watch: {
    // $route(to, from){
      // console.log(to.path);
      // console.log(from.path);
      // this.$wxShare.updateWxShareConfig({
      //   link: location.href,
      // });
    // }
  },
  methods: {
  },
}
</script>