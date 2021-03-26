<template>
  <div>
    <header class="header row row-center">
      <router-link :to="{ name: 'Home'}" class="logo col">
        <img src="images/logo.png" alt="">
      </router-link>
      <i class="i_menu iconfont icon-caidan" @click="menuclick"></i>
    </header>
    <div class="header_box"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MyHeader',
  data () {
    return {
    }
  },
  methods: {
    menuclick () {
      this.$emit('menuclick')
    }
  }
}
</script>
