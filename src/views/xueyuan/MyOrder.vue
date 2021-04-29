<template>
  <div class="xueyuanindex clearfix">

    <div class="MyOrder_headernav row row-center">
      <div class="nav col" :class="{'active':nav == 1}" @click="navclick(1)">
        <span>待支付</span>
      </div>
      <div class="nav col" :class="{'active':nav == 2}" @click="navclick(2)">
        <span>已支付</span>
      </div>
      <div class="nav col" :class="{'active':nav == 3}" @click="navclick(3)">
        <span>退款</span>
      </div>
    </div>
    <div style="height: 40px;"></div>

    <div class="noclass" v-if="Myorderlist.length <=0 && !isreqursting">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>暂无订单</p>
    </div>
    <div class="MyOrder_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="MyOrder_card" v-for="(item, index) in Myorderlist" :key="index" @click="todetails(item)">
        <div class="MyOrder_card_header row row-center">
          <img src="/images/digndanhao_icon@2x.png" alt="">
          <div class="title col">订单号：{{ item.orderNumber }}</div>
          <span :style="orderstatusstyle(item.orderStatus)">{{ orderstatus(item.orderStatus) }}</span>
        </div>
        <div class="MyOrder_card_main">
          <div class="MyOrder_list">
            <div class="MyOrder_item" v-for="(li, lindex) in item.orderDetail" :key="lindex">
              <span class="tip" v-show="li.type == 2">课程包</span>
              <span class="number">编号：{{ li.number }}</span>
              <p class="title">{{ li.name }}</p>
              <div class="row"><span class="col t1">共 <b>{{li.period}}</b> 课时 <span class="tag">{{ li.categoryName }}</span></span></div>
            </div>
          </div>
          <p class="total">实付款¥ {{item.orderPayMoney}}</p>
        </div>
        <div class="MyOrder_footer" v-if="item.orderStatus == 1">
          <mt-button type="default" size="small" @click.stop="cancel(item)" plain>取消订单</mt-button>
          <mt-button type="primary" size="small" @click.stop="todetails(item)">去支付</mt-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { MessageBox } from 'mint-ui';

export default {
  name: 'ShopCar',
  components: {},
  data() {
    return {
      nav: 1,
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      Myorderlist: [],
      isreqursting: false
    }
  },
  created: function () {
    if (this.$route.query.nav){
      this.nav = this.$route.query.nav
    }

    this.getOrder(1)
  },
  computed: {

  },
  methods: {
    loadMore() {
      this.loading = true;
      this.getOrder(2)
    },
    navclick (n) {
      this.nav = n
      this.getOrder(1)
    },
    pricesum (list) {
      let d = 0
      list.forEach(e => {
        d += parseFloat(e.price)
      })
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
          return '已退款'
        case 4:
          return '退款中'
        case 5:
          return '拒绝退款'
      }
    },
    orderstatusstyle () {
      return 'color: #F7342B'
      // switch (status){
      //   case 1:
      //     return 'color: #F7342B'
      //   case 2:
      //     return 'color: #F7342B'
      //   case 3:
      //     return 'color: #F7342B'
      // }
    },
    getOrder (ftype) {
      if (ftype === 1) {
        this.page = 1
      } else {
        if (this.page < this.pageCount) {
          this.page++
        } else {
          this.loading = false;
          return
        }
      }
      this.isreqursting = true
      this.$http.post(`/api/My/OrderList`,{
        "orderStatus": this.nav,
        "orderby": "",
        "key": "",
        "pageSize": this.pageSize,
        "pageIndex": this.page,
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res) {
          this.Myorderlist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        } else {
          this.Toast(res.msg)
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
    is_weixn () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    },
    todetails (item) {
      if (this.is_weixn()) {
        const url = process.env.VUE_APP_BASE + '/MyOrderPay?id=' + item.id
        this.$http.get(`/api/WxAuth/GetAuthorizeUrl?redirectUrl=${url}`).then((res) => {
          location.href = res
        })
      } else {
        this.$router.push({name: 'MyOrderPay', query: {id: item.id} })
      }
    },
    cancel (item) {
      MessageBox.confirm('确认取消订单?').then(action => {
        if (action) {
          this.$http.get(`/api/My/CancellationOrder?Id=${item.id}`).then((res) => {
            if (res !== 500) {
              this.Toast('取消成功')
              this.getOrder(1)
            }
          })
        }
      });
    }
  }
}
</script>
