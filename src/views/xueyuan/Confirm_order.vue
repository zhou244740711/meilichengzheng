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
        <div class="col text" @click="choseCoupon()">9折</div>
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
        <p class="t1">实付金额：<span class="t3">¥{{heji}}</span></p>
        <p class="t2">优惠金额：¥0</p>
      </div>
      <div class="button" @click="handlepost()">确认支付</div>
    </div>

    <invoice ref="invoice" @save="getinvoice"></invoice>

  </div>
</template>

<script>
// @ is an alias to /src

import Invoice from "./invoice";
export default {
  name: 'ConfirmOrder',
  components: {Invoice},
  data() {
    return {
      list: [],
      buytype: 0, // 1 直接购买 2 购物车购买,
      invoicedata: {}
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    heji () {
      let sum = 0
      if (this.list !== undefined && this.list.length > 0){
        this.list.forEach(e => {
          sum = sum + parseFloat(e.price)
        })
      }
      return sum
    }
  },
  created: function () {
    this.buytype = this.$route.params.buytype
    this.list = this.$route.params.list
    console.log(this.buytype)
    console.log(this.list)
  },
  methods: {
    choseCoupon () {
      this.$router.push({name: 'Coupon'})
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
      if (this.buytype === 1) {
        const option = Object.assign({
          "courseId": this.list[0].id,
          "discountsId": 0,
        }, this.invoicedata)
        this.$http.post(`/api/Order/Buy`,option).then(() => {
          this.Toast("购买成功")
        })
      } else if (this.buytype === 2){
        let shopCarIds = []
        this.list.forEach(e => {
          shopCarIds.push(e.id)
        })
        const option = Object.assign({
          "shopCarIds": shopCarIds,
          "discountsId": 0,
        }, this.invoicedata)
        this.$http.post(`/api/Order/ShopCarBuy`,option).then((res) => {
          if (res !== 500) {
            this.Toast('购买成功')
            this.$router.push({name: 'xueyuanindex'})
          }
        })
      }
    }
  }
}
</script>
