<template>
  <div style="padding-top: 10vh;">
    <div class="forget_title">
      <p class="title">设置新密码</p>
      <p class="subtitle">短信验证码将发送至原手机155****5</p>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" placeholder="请输入验证码">
        <div class="yzbtn">获取验证码</div>
      </div>
      <div class="login_row row row-center">
        <span class="title">新密码</span>
        <input type="text" class="col input" placeholder="请输入新密码">
      </div>
      <div class="login_row row row-center">
        <span class="title">再次输入</span>
        <input type="text" class="col input" placeholder="再次输入新密码">
      </div>
    </div>
    <div class="login_btn">完成</div>
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
    // 提交
    handlesubmit() {
      if(this.formdata.textCode !== ''){
        this.Toast("请输入验证码");
        return false;
      }
      this.$http.post('/api/Account/UpdateAccountInfo', this.formdata).then((res) => {
        if (res) {
          console.log(res)
        }
      })
    },
  }
}
</script>
