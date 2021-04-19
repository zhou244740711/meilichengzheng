<template>
  <div style="padding-top: 10vh;">
    <div class="yaoqing_img">
      <img src="/images/bangding@2x.png" alt="">
    </div>
    <div class="login_form">
      <div class="login_row row row-center">
        <span class="title">邀请码</span>
        <input type="text" class="col input" v-model="yaoqingma" placeholder="请输入邀请码">
      </div>
    </div>
    <div class="login_btn" @click="handlesubmit()">确认绑定</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Yaoqing',
  data() {
    return {
      yaoqingma: ''
    }
  },
  created: function () {
    this.yaoqingma = this.$route.query.code
  },
  methods: {
    // 提交
    handlesubmit() {
      if(this.isnull(this.yaoqingma)){
        this.Toast("请输入邀请码");
        return false;
      }
      this.$http.get(`/api/Account/UpdateCode?InvitationCode=${this.yaoqingma}`).then((res) => {
        if (res !== 500) {
          this.Toast("邀请码修改成功");
        }
      })
    },
  }
}
</script>
