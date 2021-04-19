<template>
  <div style="padding-top: 10vh;">
    <div class="forget_title">
      <p class="title">设置新手机号</p>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">新手机号</span>
        <input type="tel" class="col input" v-model="formdata.phone" placeholder="请输入手机号码">
      </div>
      <div class="login_row row row-center">
        <span class="title">验证码</span>
        <input type="text" class="col input" v-model="formdata.textCode" placeholder="请输入验证码">
        <div class="yzbtn" @click="gettextcode()" :class="{'disable':codetime < 60}">{{ codetext }}</div>
      </div>
    </div>
    <div class="login_btn" @click="handlesubmit()">完成</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ChangePhone',
  data() {
    return {
      codetext: '获取验证码',
      codetime: 60,
      formdata: {
        "phone": "",
        "textCode": "",
      }
    }
  },
  created: function () {
  },
  methods: {
    gettextcode () {
      if (this.codetime > 0 && this.codetime !== 60) {
        return
      }
      console.log(this.formdata)
      if(this.isnull(this.formdata.phone)){
        this.Toast("请输入手机号");
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.formdata.phone))){
        this.Toast("请输入正确的手机号");
        return false;
      }
      let timeout;
      this.$http.get(`/api/Account/SendEditPhoneCode?Phone=${this.formdata.phone}`).then((res) => {
        if (res !== 500) {
          this.Toast('已发送验证码')
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
      if(this.isnull(this.formdata.phone)){
        this.Toast("请输入手机号码");
        return false;
      }
      if(this.isnull(this.formdata.textCode)){
        this.Toast("请输入验证码");
        return false;
      }
      this.$http.post('/api/Account/EditPhone', this.formdata).then((res) => {
        if (res !== 500) {
          this.Toast('手机号修改成功')
          this.$router.push({name: 'xueyuanindex'})
        }
      })
    },
  }
}
</script>
