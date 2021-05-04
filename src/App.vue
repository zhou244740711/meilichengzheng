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
    // eslint-disable-next-line no-unused-vars
    $route(to, from){
      // console.log(to.path);
      // console.log(to.meta.title)
      // console.log(from.path);
      // console.log(from.meta.title)
      // this.$wxShare.updateWxShareConfig({
      //   link: location.href,
      // });
      if (to.meta.title) {
        document.title = to.meta.title
      }
    }
  },
  methods: {
  },
}
</script>