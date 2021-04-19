<template>
  <div>
    <button @click="clear">清除缓存</button>
    <button @click="tologin()">回到登陆页</button>
  </div>
</template>

<script>
export default{
  data () {
    return {
    }
  },
  methods: {
    clear () {
      localStorage.clear()
      sessionStorage.clear()
    },
    tologin () {
      this.$router.push({name: 'login'})
    }
  }
}
</script>