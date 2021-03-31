<template>
  <div class="login">
    <div class="login_navbox clearfix">
      <router-link :to="{ name: 'login'}" class="login_nav">登陆</router-link>
      <router-link :to="{ name: 'register'}" class="login_nav active">注册</router-link>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">姓名</span>
        <input type="text" class="col input" placeholder="请输入姓名" v-model="formdata.name">
      </div>
      <div class="login_row row row-center">
        <span class="title">身份证号码</span>
        <input type="text" class="col input" placeholder="请输入证件号码" v-model="formdata.identityCard">
      </div>
      <div class="login_row row row-center">
        <span class="title">手机号码</span>
        <input type="text" class="col input" placeholder="请输入手机号码" v-model="formdata.phone">
      </div>
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" placeholder="请输入验证码" v-model="formdata.textCode">
        <div class="yzbtn" @click="gettextcode()">获取验证码</div>
      </div>
      <div class="login_row row row-center">
        <span class="title">邀请码选填</span>
        <input type="text" class="col input" placeholder="请输入号码" v-model="formdata.invitationCode">
      </div>
    </div>
    <div class="login_btn" @click="handlesubmit()">注册</div>
    <p class="login_tishi">提示：密码默认为身份证后六位</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
      codetext: '获取验证码',
      codetime: 60,
      formdata: {
        // "name": "string",
        // "identityCard": "string",
        // "phone": "string",
        // "textCode": "string",
        // "invitationCode": "string"
      }
    }
  },
  created: function () {
  },
  methods: {
    gettextcode () {
      if (this.codetime > 0) {
        return
      }
      if(this.formdata.phone !== ''){
        this.Toast("请输入手机号");
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formdata.phone))){
        this.Toast("请输入正确的手机号");
        return false;
      }
      let timeout;
      this.$http.post(`/api/Account/SendRegisterCode?Phone=${this.formdata.phone}`).then((res) => {
        console.log(res)
        this.codetime = 60
        timeout = setInterval(() => {
          this.codetext = this.codetime + 's'
          this.codetime--
          if (this.codetime == 0) {
            this.codetext = '获取验证码'
            this.codetime = 60
            clearInterval(timeout)
          }
        }, 1000)
      })
    },
    // 提交
    handlesubmit() {
      if(this.formdata.name !== ''){
        this.Toast("请输入姓名");
        return false;
      }
      if(this.formdata.identityCard !== ''){
        this.Toast("请输入身份证号");
        return false;
      }
      if(this.formdata.phone !== ''){
        this.Toast("请输入手机号");
        return false;
      }
      if(this.formdata.textCode !== ''){
        this.Toast("请输入验证码");
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formdata.phone))){
        this.Toast("请输入正确的手机号");
        return false;
      }
      if(!(/\d{15}(\d\d[0-9xX])?/.test(this.formdata.identityCard))){
        this.Toast("请输入正确的身份证号");
        return false;
      }
      this.$http.post('/api/Account/Regiester', this.formdata).then((res) => {
        if (res) {
          console.log(res)
        }
      })
    },
  }
}
</script>
