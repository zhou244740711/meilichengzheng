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
      this.$refs.nav.showmenu()
    },
  }
}
</script>