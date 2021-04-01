<template>
  <div class="xueyuanindex clearfix">

    <div class="confirm_order_card_list">
      <div class="stydy_card confirm_order_card">
        <div class="card_header">
          <span class="number">编号：202120200214</span>
          <span class="tip">课程包</span>
        </div>
        <div class="card_main">
          <p class="title">名称课程包名称…</p>
          <div class="row">
          <span class="col t1">
            共 <b>4</b> 课时
            <span class="tag">驻镇规划师</span>
          </span>
            <span class="t2">¥10</span>
          </div>
        </div>
      </div>
      <div class="stydy_card confirm_order_card">
        <div class="card_header">
          <span class="number">编号：202120200214</span>
        </div>
        <div class="card_main">
          <p class="title">名称课程包名称…</p>
          <div class="row">
          <span class="col t1">
            共 <b>4</b> 课时
            <span class="tag">驻镇规划师</span>
          </span>
            <span class="t2">¥10</span>
          </div>
        </div>
      </div>
      <div class="stydy_card confirm_order_card">
        <div class="card_header">
          <span class="number">编号：202120200214</span>
        </div>
        <div class="card_main">
          <p class="title">名称课程包名称…</p>
          <div class="row">
          <span class="col t1">
            共 <b>4</b> 课时
            <span class="tag">驻镇规划师</span>
          </span>
            <span class="t2">¥10</span>
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
        <div class="col text greg9" @click="showinvoice()">填写发票</div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>
    </div>
    <div class="confirm_tip">提示：请谨慎购买，购买课程进行了课程学习，将不予退费。</div>

    <div style="height: 46px;"></div>
    <div class="confirm_footer row row-center">
      <div class="col text">
        <p class="t1">实付金额：<span class="t3">¥10</span></p>
        <p class="t2">优惠金额：¥3</p>
      </div>
      <div class="button">确认支付</div>
    </div>

    <invoice ref="invoice"></invoice>

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
      type: 1,
      id: "",
    }
  },
  created: function () {
    this.type = this.$route.params.type
    this.id = this.$route.params.id
  },
  methods: {
    choseCoupon () {
      this.$router.push({name: 'Coupon'})
    },
    showinvoice () {
      this.$refs.invoice.showModal()
    }
  }
}
</script>
