<template>
  <div style="padding-top: 10vh;">
    <div class="forget_title">
      <p class="title">设置新密码</p>
      <p>短信验证码将发送至 {{info.phone}}</p>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" v-model="fromdata.textCode" placeholder="请输入验证码" @blur.prevent="checkValue">
        <div class="yzbtn" @click="gettextcode()" :class="{'disable':codetime < 60}">{{ codetext }}</div>
      </div>
      <div class="login_row row row-center">
        <span class="title">新密码</span>
        <input type="text" class="col input" v-model="fromdata.pwd" placeholder="请输入新密码" @blur.prevent="checkValue">
      </div>
      <div class="login_row row row-center">
        <span class="title">再次输入</span>
        <input type="text" class="col input" v-model="fromdata.pwd2" placeholder="再次输入新密码" @blur.prevent="checkValue">
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
        "textCode": "",
        "pwd": "",
        "pwd2": ''
      },
      info: {}
    }
  },
  created: function () {
    this.getmsg()
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  methods: {
    checkValue () {
      this.inputBlur()
      this.$emit('checkValue')
    },
    getmsg () {
      this.$http.get('/api/Account/GetCurrentAccount').then((res) => {
        if (res !== 500) {
          this.info = res
        }
      })
    },
    gettextcode () {
      if (this.codetime > 0 && this.codetime !== 60) {
        return
      }
      let timeout;
      this.$http.get(`/api/Account/SendEditPwdCode`).then((res) => {
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
      if(this.isnull(this.fromdata.textCode)){
        this.Toast({
          message: "请输入验证码",
          duration: 2000
        });
        return false;
      }
      if(this.isnull(this.fromdata.pwd)){
        this.Toast({
          message: "请输入新密码",
          duration: 2000
        });
        return false;
      }
      if (this.fromdata.pwd !== this.fromdata.pwd2){
        this.Toast({
          message: "两次密码不一致",
          duration: 2000
        });
        return false;
      }
      this.$http.post('/api/Account/EditPwd', this.fromdata).then((res) => {
        if (res !== 500) {
          this.Toast({
            message: '密码修改成功，请重新登陆',
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
