<template>
  <div class="login">
    <div class="login_navbox clearfix">
      <router-link :to="{ name: 'login'}" class="login_nav">登陆</router-link>
      <router-link :to="{ name: 'register'}" class="login_nav active">注册</router-link>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">姓名</span>
        <input type="text" class="col input" placeholder="请输入姓名" v-model="formdata.name" @blur.prevent="checkValue">
      </div>
      <div class="login_row row row-center">
        <span class="title">身份证号码</span>
        <input type="text" class="col input" placeholder="请输入证件号码" v-model="formdata.identityCard" @blur.prevent="checkValue">
      </div>
      <div class="login_row row row-center">
        <span class="title">手机号码</span>
        <input type="text" class="col input" placeholder="请输入手机号码" v-model="formdata.phone" @blur.prevent="checkValue">
      </div>
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" placeholder="请输入验证码" v-model="formdata.textCode" @blur.prevent="checkValue">
        <div class="yzbtn" @click="gettextcode()" :class="{'disable':codetime < 60}">{{ codetext }}</div>
      </div>
      <div class="login_row row row-center">
        <span class="title">邀请码选填</span>
        <input type="text" class="col input" placeholder="请输入号码" v-model="formdata.invitationCode" @blur.prevent="checkValue">
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
        "name": "",
        "identityCard": "",
        "phone": "",
        "textCode": "",
        "invitationCode": ""
      }
    }
  },
  created: function () {
    this.$wxShare.updateWxShareConfig({
      link: location.href
    });
  },
  methods: {
    checkValue () {
      this.inputBlur()
      this.$emit('checkValue')
    },
    gettextcode () {
      if (this.codetime > 0 && this.codetime !== 60) {
        return
      }
      if(this.isnull(this.formdata.phone)){
        this.Toast({
          message: "请输入手机号",
          duration: 2000
        });
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formdata.phone))){
        this.Toast("请输入正确的手机号");
        return false;
      }
      let timeout;
      this.$http.get(`/api/Account/SendRegisterCode?Phone=${this.formdata.phone}`).then((res) => {
        if (res !== 500) {
          this.Toast('已发送验证码')
          this.codetime = 59
          timeout = setInterval(() => {
            this.codetext = this.codetime + 's'
            this.codetime--
            if (this.codetime === 0) {
              this.codetext = '获取验证码'
              this.codetime = 60
              clearInterval(timeout)
            }
          }, 1000)
        }
      })
    },
    // 提交
    handlesubmit() {
      if(this.formdata.name === ''){
        this.Toast({
          message: "请输入姓名",
          duration: 2000
        });
        return false;
      }
      if(this.isnull(this.formdata.identityCard)){
        this.Toast({
          message: "请输入身份证号",
          duration: 2000
        });
        return false;
      }
      if(this.isnull(this.formdata.phone)){
        this.Toast({
          message: "请输入手机号",
          duration: 2000
        });
        return false;
      }
      if(this.isnull(this.formdata.textCode)){
        this.Toast({
          message: "请输入验证码",
          duration: 2000
        });
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formdata.phone))){
        this.Toast({
          message: "请输入正确的手机号",
          duration: 2000
        });
        return false;
      }
      if(!(/\d{15}(\d\d[0-9xX])?/.test(this.formdata.identityCard))){
        this.Toast({
          message: "请输入正确的身份证号",
          duration: 2000
        });
        return false;
      }
      this.$http.post('/api/Account/Regiester', this.formdata).then((res) => {
        if (res !== 500) {
          this.Toast("注册成功");
          localStorage.removeItem('tokensavetime')
          localStorage.removeItem('token')
          localStorage.removeItem('invoicedata')
          localStorage.removeItem('indexdata')
          this.$router.push({name: 'login'})
        }
      })
    },
  }
}
</script>
