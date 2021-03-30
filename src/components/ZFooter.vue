<template>
  <div class="footer">
    <div class="footer_view row row-center">
      <div class="footer_nav col active" @click="navclick(1)">
        <div class="footer_ico footer_ico_home"></div>
        <span>首页</span>
      </div>
      <div class="footer_nav col" @click="navclick(2)">
        <div class="footer_ico footer_ico_shop"></div>
        <span>购物车</span>
      </div>
      <div class="footer_nav col" @click="navclick(3)">
        <div class="footer_ico footer_ico_my"></div>
        <span>我的</span>
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
    }
  },
  methods: {
    navclick (t) {
      switch (t){
        case 1:
          this.$router.push({name: 'xueyuanindex'})
          break
        case 2:
          this.$router.push({name: 'Shopcar'})
          break
        case 3:
          this.$router.push({name: 'Myself'})
          break
      }
    }
  }
}
</script>
