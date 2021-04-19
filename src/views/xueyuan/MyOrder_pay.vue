<template>
  <div class="xueyuanindex clearfix">

    <div class="pay_header">
      <p class="t1">{{ orderstatus(order.orderStatus) }}</p>
      <p class="t2" v-if="order.orderStatus == 1">创建时间：{{ order.orderCreateTime }}</p>
      <p class="t2" v-if="order.orderStatus == 2">支付时间：{{ order.orderPayTime }}</p>
      <p class="t2" v-if="order.orderStatus == 3">客服正在处理中</p>
      <p class="t2" v-if="order.orderStatus == 4">退款时间：{{ order.orderRefundTime }}</p>
    </div>
    <div class="MyOrder_card">
      <div class="MyOrder_card_main">
        <div class="MyOrder_list">
          <div class="MyOrder_item" v-for="(item, index) in order.orderDetail" :key="index">
            <span class="tip" v-show="item.type == 2">课程包</span>
            <span class="number">编号：{{ item.number }}</span>
            <p class="title text-over">{{ item.name }}</p>
            <div class="row">
              <span class="col t1">共 <b>{{ item.period }}</b> 课时</span>
              <span class="price">¥{{item.price}}</span>
            </div>
            <span class="tag">{{ item.categoryName }}</span>
          </div>
        </div>
<!--        <p class="total">实付款¥{{pricesum(order.orderDetail)}}</p>-->
      </div>
      <div class="MyOrder_footer">
        <p class="shifu">实付金额：<span class="price">￥{{ order.orderPayMoney }}</span></p>
        <p class="youhui">优惠金额：<span class="price">{{isnull(order.orderDiscountMoney)?0:order.orderDiscountMoney}}元</span></p>
      </div>
    </div>

    <div class="confirm_list">
      <div class="item row row-center">
        <span class="title">发票</span>
        <div class="col text" @click="showinvoice()">{{ order.invoiceContent }}</div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>
      <div class="item row row-center">
        <span class="title">订单号</span>
        <div class="col text">{{ order.orderNumber }}</div>
      </div>
    </div>

    <div class="zhezhao" v-show="zhezhao"></div>

    <invoice ref="invoice" @save="getinvoice"></invoice>

    <div style="height: 60px;"></div>
    <div class="MyOrder_pay_footer">
      <template v-if="order.orderStatus == 1">
        <div class="btn_cancel" @click="cancel()">取消</div>
        <div class="btn_pay" @click="handlepost()">立即支付</div>
      </template>
      <template v-if="order.orderStatus == 2">
        <div class="btn_cancel" @click="look()">查看发票</div>
        <div class="btn_cancel" @click="tuikuan()" style="margin-left: 20px;">申请退款</div>
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Invoice from "./invoice";
import { MessageBox } from 'mint-ui';

export default {
  name: 'ShopCar',
  components: {Invoice},
  data() {
    return {
      pid: '',
      code: '',
      order: {},
      zhezhao: false
    }
  },
  created: function () {
    this.pid = this.$route.query.id
    this.getorderdetails()
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
        this.$http.get(`/api/WxAuth/SaveOpenId?code=${this.code}`).then(() => {
        })
      }
    },
    pricesum (list) {
      let d = 0
      if (list !== undefined && list.length > 0) {
        list.forEach(e => {
          d += parseFloat(e.price)
        })
      }
      return d
    },
    orderstatus (status) {
      // 待付款 = 1,已付款 = 2,已退款 = 3,退款中 = 4,拒绝退款 = 5
      switch (status){
        case 1:
          return '待支付'
        case 2:
          return '已支付'
        case 3:
          return '退款'
        case 4:
          return '退款中'
        case 5:
          return '拒绝退款'
      }
    },
    getorderdetails () {
      this.$http.get(`/api/My/OrderDetail?Id=${this.pid}`).then((res) => {
        if (res !== 500) {
          this.order = res
        }
      })
    },
    showinvoice () {
      // if (this.order.orderStatus == 1) {
        const invoicedata = {
          "invoiceType": this.order.invoiceType,
          "invoiceHeader": this.order.invoiceHeader,
          "invoiceTaxpayer": this.order.invoiceTaxpayer,
          "invoiceContent": this.order.invoiceContent
        }
        this.$refs.invoice.showModal(invoicedata)
      // }
    },
    getinvoice (data) {
      this.order = Object.assign(this.order, data)
      if (this.order.orderStatus == 2) {
        const option = Object.assign(data, {
          "id": this.pid
        })
        this.$http.post(`/api/My/UpdateInvoice`, option).then((res) => {
          if (res !== 500) {
            this.Toast('发票修改成功')
          }
        })
      }
    },
    cancel () {
      MessageBox.confirm('确认取消订单?').then(action => {
        if (action) {
          const id = this.$route.query.id
          this.$http.get(`/api/My/CancellationOrder?Id=${id}`).then((res) => {
            if (res !== 500) {
              this.Toast('取消成功')
              this.$router.go(-1)
            }
          })
        }
      });
    },
    handlepost () {
      if (this.isnull(this.order.invoiceType)) {
        this.Toast('请填写发票信息')
        return false
      }
      this.zhezhao = true
      const option = Object.assign({
        "id": this.pid,
        code: this.code
      }, this.order)
      this.$http.post(`/api/Order/PayBuy`,option).then((res) => {
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
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 跳转到订单已支付
              _this.$router.push({name: 'MyOrder', query: {nav: 2}})
            }
            else {
              _this.$router.push({name: 'MyOrder', query: {nav: 1}})
            }
          }
      );
    },
    look () {},
    tuikuan () {},
  }
}
</script>
