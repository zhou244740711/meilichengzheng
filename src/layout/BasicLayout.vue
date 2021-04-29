<template>
  <div>
    <my-header @menuclick="menuclick"></my-header>
    <my-nav ref="nav"></my-nav>
    <router-view/>
  </div>
</template>

<script>
import MyNav from "../components/nav";
import MyHeader from "../components/header";
export default {
  name: 'BasicLayout',
  components: {MyHeader, MyNav},
  methods: {
    menuclick () {
      this.$refs.nav.togglemenu()
    },
  },
  //页面加载完成后调用
  mounted () {
  }
}
</script>