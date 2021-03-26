<template>
  <div class="login">
    <div class="login_navbox clearfix">
      <router-link :to="{ name: 'login'}" class="login_nav">登陆</router-link>
      <router-link :to="{ name: 'register'}" class="login_nav active">注册</router-link>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">姓名</span>
        <input type="text" class="col input" placeholder="请输入姓名">
      </div>
      <div class="login_row row row-center">
        <span class="title">身份证号码</span>
        <input type="text" class="col input" placeholder="请输入证件号码">
      </div>
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" placeholder="请输入验证码">
        <div class="yzbtn">获取验证码</div>
      </div>
      <div class="login_row row row-center">
        <span class="title">邀请码选填</span>
        <input type="text" class="col input" placeholder="请输入号码">
      </div>
    </div>
    <div class="login_btn">注册</div>
    <p class="login_tishi">提示：密码默认为身份证后六位</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>
