<template>
  <div class="login">
    <div class="login_navbox clearfix">
      <router-link :to="{ name: 'login'}" class="login_nav active">登陆</router-link>
      <router-link :to="{ name: 'register'}" class="login_nav">注册</router-link>
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <div class="img_ico">
          <img src="images/haoma@2x.png" alt="">
        </div>
        <input type="text" class="col input" placeholder="请输入身份证号" v-model="formdata.identityCard">
      </div>
      <div class="login_row row row-center">
        <div class="img_ico">
          <img src="images/mima@2x.png" alt="">
        </div>
        <input type="password" class="col input" placeholder="请输入密码" v-model="formdata.password">
      </div>
    </div>
    <div class="login_btn" @click="login">登陆</div>
    <router-link :to="{name: 'forgetpassword'}" class="login_forget">忘记密码</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
      formdata: {
        "identityCard": "",
        "password": ""
      }
    }
  },
  created: function () {
    if (localStorage.getItem('token')) {
      this.$router.push({name: 'Stady'})
    }
    if (localStorage.getItem('admin')) {
      this.$set(this.formdata,'identityCard',localStorage.getItem('admin'))
    }
    if (localStorage.getItem('password')) {
      this.$set(this.formdata,'password',localStorage.getItem('password'))
    }
  },
  methods: {
    login () {
      if (this.isnull(this.formdata.identityCard)) {
        this.Toast('请输入身份证号')
        return
      }
      if(!(/\d{15}(\d\d[0-9xX])?/.test(this.formdata.identityCard))){
        this.Toast("请输入正确的身份证号");
        return false;
      }
      if (this.isnull(this.formdata.password)) {
        this.Toast('请输入密码')
        return
      }
      localStorage.removeItem('token')
      this.$http.post('/api/Account/Login', this.formdata).then((res) => {
        if (res !== 500) {
          localStorage.setItem('token', res)
          localStorage.setItem('tokensavetime', new Date().getTime())
          localStorage.setItem('admin', this.formdata.identityCard)
          localStorage.setItem('password', this.formdata.password)
          localStorage.removeItem('indexdata')
          this.getmsg()
        }
      })
    },
    getmsg () {
      this.$http.get('/api/Account/GetCurrentAccount').then((res) => {
        if (this.isnull(res.birth) && this.isnull(res.sex)){
          this.Toast('请完善信息')
          this.$router.push({name: 'information'})
        } else {
          this.$router.push({name: 'Stady'})
        }
      })
    }
  }
}
</script>
