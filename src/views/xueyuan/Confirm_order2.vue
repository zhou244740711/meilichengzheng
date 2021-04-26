<template>
  <div class="xueyuanindex clearfix">

    <div class="confirm_order_card_list">
      <div class="stydy_card confirm_order_card" v-for="(item, index) in list" :key="index">
        <div class="card_header">
          <span class="number">编号：{{ item.number }}</span>
          <span class="tip" v-show="item.type === 2">课程包</span>
        </div>
        <div class="card_main">
          <p class="title">{{ item.name }}</p>
          <div class="row">
          <span class="col t1">
            共 <b>{{item.period}}</b> 课时
            <span class="tag">{{ item.categoryName }}</span>
          </span>
            <span class="t2">¥{{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="confirm_list">
      <div class="item row row-center">
        <span class="title">优惠劵</span>
        <div class="col text" @click="choseCoupon()">{{ isnull(Coupon.discount)?'请选择优惠劵':Coupon.discount+'折' }}</div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>
      <div class="item row row-center">
        <span class="title">发票</span>
        <div class="col text" :class="{'greg9':isnull(invoicedata.invoiceHeader)}" @click="showinvoice()">{{ !isnull(invoicedata.invoiceHeader)?invoicedata.invoiceHeader:'填写发票'}}</div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>
    </div>
    <div class="confirm_tip">提示：请谨慎购买，购买课程进行了课程学习，将不予退费。</div>

    <div style="height: 46px;"></div>
    <div class="confirm_footer row row-center">
      <div class="col text">
        <p class="t1">实付金额：<span class="t3">¥{{orderPayMoney}}</span></p>
        <p class="t2">优惠金额：¥ {{orderDiscountMoney}}</p>
      </div>
      <div class="button" @click="handlepost()">确认支付</div>
    </div>

    <div class="zhezhao" v-show="zhezhao"></div>

    <invoice ref="invoice" @save="getinvoice"></invoice>

    <chose-coupon ref="couponlist" @chose="getcoupon"></chose-coupon>
  </div>
</template>

<script>
// @ is an alias to /src
import Invoice from "./invoice";
import ChoseCoupon from "./ChoseCoupon";
export default {
  name: 'ConfirmOrder',
  components: {ChoseCoupon, Invoice},
  data() {
    return {
      list: [],
      code: '',
      buytype: 0, // 1 直接购买 2 购物车购买,
      invoicedata: {},
      Coupon: {},
      zhezhao: false,
      orderPayMoney: 0,
      orderTotalMoney: 0,
      orderDiscountMoney: 0,
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
  },
  created: function () {
    this.buytype = this.$route.query.buytype
    if (sessionStorage.getItem('buylist')) {
      this.list = JSON.parse(sessionStorage.getItem('buylist'))
    }
    if (localStorage.getItem('invoicedata')) {
      this.invoicedata = JSON.parse(localStorage.getItem('invoicedata'))
    }
    // this.SaveOpenId()
    this.jisuan()
  },
  methods: {
    jisuan () {
      let discountsId = 0
      if (this.Coupon.id !== '' ){
        discountsId = this.Coupon.id
      }
      if (this.buytype == 1) {
        const option = {
          "courseId": this.list[0].id,
          "discountsId": discountsId,
        }
        console.log(option)
        this.$http.post(`/api/Order/BuyMoney`, option).then((res) => {
          console.log(res)
          if (res !== 500) {
            this.orderPayMoney = res.orderPayMoney
            this.orderTotalMoney = res.orderTotalMoney
            this.orderDiscountMoney = res.orderDiscountMoney
          }
        })
      } else if (this.buytype == 2){
        let shopCarIds = []
        this.list.forEach(e => {
          shopCarIds.push(e.id)
        })
        const option = {
          "shopCarIds": shopCarIds,
          "discountsId": discountsId,
        }
        console.log(option)
        this.$http.post(`/api/Order/ShopCarBuyMoney`,option).then((res) => {
          console.log(res)
          if (res !== 500) {
            this.orderPayMoney = res.orderPayMoney
            this.orderTotalMoney = res.orderTotalMoney
            this.orderDiscountMoney = res.orderDiscountMoney
          }
        })
      }
    },
    choseCoupon () {
      this.popupVisible = true
      let shopCarIds = []
      if (this.list.length > 0) {
        this.list.forEach(e => {
          shopCarIds.push(e.id)
        })
      }
      this.$refs.couponlist.showmodal(shopCarIds)
    },
    getcoupon (d) {
      this.Coupon = d
      this.jisuan()
    },
    showinvoice () {
      this.$refs.invoice.showModal()
    },
    getinvoice (data) {
      this.invoicedata = data
    },
    handlepost () {
      if (this.isnull(this.invoicedata.invoiceType)) {
        this.Toast('请填写发票信息')
        return false
      }
      this.zhezhao = true
      let discountsId = 0
      if (this.Coupon.id !== '' ){
        discountsId = this.Coupon.id
      }
      let option
      if (this.buytype == 1) {
        option = Object.assign({
          "courseId": this.list[0].id,
          "discountsId": discountsId,
          code: this.code
        }, this.invoicedata)

      } else if (this.buytype == 2){
        let shopCarIds = []
        this.list.forEach(e => {
          shopCarIds.push(e.id)
        })
        option = Object.assign({
          "shopCarIds": shopCarIds,
          "discountsId": discountsId,
          code: this.code
        }, this.invoicedata)

      }
      sessionStorage.setItem('payoption', JSON.stringify(option))

      const url = process.env.VUE_APP_BASE + '/paysuccess?buytype=1'
      this.$http.get(`/api/WxAuth/GetAuthorizeUrl?redirectUrl=${url}`).then((res) => {
        location.href = res
      })
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
