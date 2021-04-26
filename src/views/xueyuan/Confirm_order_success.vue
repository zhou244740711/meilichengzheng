<template>
  <div class="xueyuanindex clearfix">
    <p>订单支付中，确认支付成功后 <a href="#">点击刷新</a></p>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'success',
  data() {
    return {
      buytype: 0,
      code: ''
    }
  },
  created: function () {
    this.buytype = this.$route.query.buytype
    this.SaveOpenId()
  },
  methods: {
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    SaveOpenId () {
      if (this.is_weixn()) {
        this.code = this.$route.query.code
        alert(this.code)
        this.$http.get(`/api/WxAuth/SaveOpenId?code=${this.code}`).then((res) => {
          console.log(res)
          this.handlepost()
        })
      }
    },
    handlepost () {
      let option = JSON.parse(sessionStorage.getItem('payoption'))
      option = Object.assign(option ,{
        code: this.code
      })
      alert(JSON.stringify(option))
      if (this.buytype == 1) {
        this.$http.post(`/api/Order/Buy`,option).then((res) => {
          setTimeout(() => {
            this.zhezhao = false
          }, 1000)
          if (res !== 500) {
            if (res.isWxBrowser) {
              console.log(res)
              this.weixinpay(res)
            } else {
              location.href = res.mWebUrl;
            }
          }
        })
      } else if (this.buytype == 2){
        this.$http.post(`/api/Order/ShopCarBuy`,option).then((res) => {
          setTimeout(() => {
            this.zhezhao = false
          }, 1000)
          if (res !== 500) {
            if (res.isWxBrowser) {
              this.weixinpay(res)
            } else {
              location.href = res.mWebUrl;
            }
          }
        })
      }
    },
    weixinpay (result) {
      console.log(result)
      const _this = this
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: result.appId, //公众号名称，由商户传入
            timeStamp: result.timeStamp, //时间戳
            nonceStr: result.nonceStr, //随机串
            package: result.package, //扩展包
            signType: result.signType, //微信签名方式:MD5
            paySign: result.paySign, //微信签名
          },
          function (res) {
            console.log(res)
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 跳转到订单已支付
              _this.$router.push({name: 'MyOrder', query: {nav: 2}})
            }
            else {
              _this.$router.push({name: 'MyOrder', query: {nav: 1}})
            }
          }
      );
    }
  }
}
</script>
