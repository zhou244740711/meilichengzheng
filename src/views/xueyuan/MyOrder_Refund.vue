<template>
  <div class="myorder clearfix">

    <div class="MyOrder_Refund_box">
      <div class="title">退款原因</div>
      <textarea v-model="refundRemark" v-show="order.orderStatus == 2" placeholder="请输入退款原因" @blur.prevent="checkValue"></textarea>
      <div v-show="order.orderStatus == 3 || order.orderStatus == 4 || order.orderStatus == 5" class="text">{{order.orderRefundRemark}}</div>
    </div>

    <div class="MyOrder_Refund_count">
      <p class="shifu clearfix">实际退款金额：<span class="price">￥<b>{{ order.orderPayMoney }}</b></span></p>
<!--      <p class="youhui">优惠金额：<span class="price">{{isnull(order.orderDiscountMoney)?0:order.orderDiscountMoney}}元</span></p>-->
    </div>

    <div class="MyOrder_card MyOrder_Refund_card">
      <div class="MyOrder_card_header row row-center">
        <div class="title col">订单号</div>
        <span class="ordernumber">{{ order.orderNumber }}</span>
      </div>
      <div class="MyOrder_card_main">
        <div class="MyOrder_list">
          <div class="MyOrder_item" v-for="(item, index) in order.orderDetail" :key="index">
            <span class="tip" v-show="item.type == 2">课程包</span>
            <span class="number">编号：{{ item.number }}</span>
            <p class="title">{{ item.name }}</p>
            <div class="row">
              <span class="col t1">共 <b>{{ item.period }}</b> 课时</span>
              <span class="price">¥{{item.price}}</span>
            </div>
            <span class="tag">{{ item.categoryName }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottombtn" v-show="order.orderStatus == 2" @click="handlepost">申请退款</div>

  </div>
</template>

<script>
// @ is an alias to /src
// import { MessageBox } from 'mint-ui';

export default {
  name: 'ShopCar',
  components: {},
  data() {
    return {
      pid: '',
      order: '',
      refundRemark: '',
    }
  },
  created: function () {
    this.pid = this.$route.query.id
    this.getorderdetails()
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  methods: {
    checkValue () {
      this.inputBlur()
      this.$emit('checkValue')
    },
    getorderdetails () {
      this.$http.get(`/api/My/OrderDetail?Id=${this.pid}`).then((res) => {
        if (res !== 500) {
          this.order = res
        }
      })
    },
    handlepost () {
      if (this.isnull(this.refundRemark)) {
        this.Toast({ message: '请填写退款原因',  duration: 2000})
        return
      }
      this.$http.post(`/api/My/RefundOrder`,{
        "id": this.pid,
        "refundRemark": this.refundRemark
      }).then((res) => {
        if (res !== 500) {
          this.Toast({ message: '提交成功',  duration: 2000})
          this.$router.go(-1)
        }
      })
    },
  }
}
</script>
