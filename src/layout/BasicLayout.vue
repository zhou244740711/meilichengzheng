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
    var _this = this;
    console.log(this.$route.name)
    _this.uuid = _this.$route.query.uuid;
    var shareUrl = process.env.VUE_APP_BASE + '/login?uuid=' + _this.uuid;
    this.$wxShare.updateWxShareConfig({
      title: document.title,
      desc: '打造新时代美丽城镇建设人才培养体系！',
      link: shareUrl
    });
  }
}
</script>