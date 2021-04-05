<template>
  <div>
    <div class="footer_box"></div>
    <div class="footer">
      <div class="footer_view row row-center">
        <div class="footer_nav col" :class="{'active': router === 'xueyuanindex'}" @click="navclick('xueyuanindex')">
          <div class="footer_ico footer_ico_home"></div>
          <span>首页</span>
        </div>
        <div class="footer_nav col" :class="{'active': router === 'Shopcar'}" @click="navclick('Shopcar')">
          <div class="footer_ico footer_ico_shop"></div>
          <span>购物车</span>
        </div>
        <div class="footer_nav col" :class="{'active': router === 'Myself'}" @click="navclick('Myself')">
          <div class="footer_ico footer_ico_my"></div>
          <span>我的</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ZFooter',
  data () {
    return {
      router: 'xueyuanindex'
    }
  },
  watch: {
    $route (newsdata) {
      this.router = newsdata.name
    }
  },
  created: function () {
    this.router = this.$route.name
  },
  methods: {
    navclick (t) {
      if (t === this.$route.name) {
        return
      }
      this.$router.push({name: t})
    }
  }
}
</script>
