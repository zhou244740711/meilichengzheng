<template>
  <div class="Setting">
    <div class="Setting_list">
      <router-link :to="{ name: 'changephone'}" class="item row row-center">
        <div class="ico"><img src="/images/shouji@2x.png" alt=""></div>
        <div class="title col">修改手机号码</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
      <router-link :to="{ name: 'changepassword'}" class="item row row-center">
        <div class="ico"><img src="/images/mima2@2x.png" alt=""></div>
        <div class="title col">修改密码</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
    </div>

    <div class="login_btn" @click="loginout()">退出登陆</div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Setting',
  data() {
    return {
    }
  },
  created: function () {
  },
  methods: {
    loginout () {
      localStorage.removeItem('tokensavetime')
      localStorage.removeItem('token')
      this.$router.push({name: 'login'})
    },
  }
}
</script>
