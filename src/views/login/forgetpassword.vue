<template>
  <div style="padding-top: 10vh;">
    <div class="forget_title">
      <p class="title">设置新密码</p>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">手机号</span>
        <input type="tel" class="col input" v-model="fromdata.phone" placeholder="请输入手机号码" @blur.prevent="checkValue">
      </div>
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" v-model="fromdata.textCode" placeholder="请输入验证码" @blur.prevent="checkValue">
        <div class="yzbtn" @click="gettextcode()" :class="{'disable':codetime < 60}">{{ codetext }}</div>
      </div>
      <div class="login_row row row-center">
        <span class="title">新密码</span>
        <input type="text" class="col input" v-model="fromdata.password" placeholder="请输入新密码" @blur.prevent="checkValue">
      </div>
      <div class="login_row row row-center">
        <span class="title">再次输入</span>
        <input type="text" class="col input" v-model="fromdata.password2" placeholder="再次输入新密码" @blur.prevent="checkValue">
      </div>
    </div>
    <div class="login_btn" @click="handlesubmit()">完成</div>
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
      fromdata: {
        "phone": "",
        "textCode": "",
        "password": "",
        "password2": ''
      }
    }
  },
  created: function () {
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
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
      if(this.isnull(this.fromdata.phone)){
        this.Toast({
          message: "请输入手机号",
          duration: 2000
        });
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.fromdata.phone))){
        this.Toast({
          message: "请输入正确的手机号",
          duration: 2000
        });
        return false;
      }
      let timeout;
      this.$http.get(`/api/Account/SendForgetPwdCode?Phone=${this.fromdata.phone}`).then((res) => {
        if (res !== 500) {
          this.Toast({
            message: '已发送验证码',
            duration: 2000
          })
          this.codetime = 60
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
      if(this.isnull(this.fromdata.phone)){
        this.Toast({
          message: "请输入手机号码",
          duration: 2000
        });
        return false;
      }
      if(this.isnull(this.fromdata.textCode)){
        this.Toast({
          message: "请输入验证码",
          duration: 2000
        });
        return false;
      }
      if(this.isnull(this.fromdata.password)){
        this.Toast({
          message: "请输入新密码",
          duration: 2000
        });
        return false;
      }
      if (this.fromdata.password !== this.fromdata.password2){
        this.Toast({
          message: "两次密码不一致",
          duration: 2000
        });
        return false;
      }
      this.$http.post('/api/Account/ForgetPwd', this.fromdata).then((res) => {
        if (res !== 500) {
          this.Toast({
            message: '密码修改成功',
            duration: 2000
          })
          localStorage.removeItem('tokensavetime')
          localStorage.removeItem('token')
          this.$router.push({name: 'login'})
        }
      })
    },
  }
}
</script>
