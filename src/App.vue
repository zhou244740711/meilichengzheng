<template>
  <div id="app">
    <my-header @menuclick="menuclick"></my-header>
    <my-nav ref="nav"></my-nav>
    <router-view/>
  </div>
</template>

<style lang="less">
@import "assets/css/style";

</style>
<script>
import MyHeader from "./components/header";
import MyNav from "./components/nav";
export default {
  components: {MyNav, MyHeader},
  methods: {
    menuclick () {
      this.$refs.nav.showmenu()
    }
  }
}
</script>