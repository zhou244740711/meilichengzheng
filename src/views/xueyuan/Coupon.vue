<template>
  <div class="myorder clearfix" style="background: #FFFFFF">

    <div class="noclass" v-if="Couponlist.length <=0 && !isreqursting" style="margin-top: 30vh;">
      <img src="images/quan-kong@2x.png" alt="">
      <p>暂无优惠券</p>
    </div>

    <div class="Coupon"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="Coupon_list">
        <div class="item row" :class="{'select': item.id === choseid,'item_timeout': item.status !== 1}" v-for="(item, index) in Couponlist" :key="index">
          <div class="shiyong" v-show="item.status == 2"><img src="images/yishiyong@2x.png" alt=""></div>
          <div class="guoqi" v-show="item.status == 3"><img src="images/guoqi@2x.png" alt=""></div>
          <div class="img row">
            <p class="t1">{{ item.discount }}折</p>
            <p class="t2">优惠券</p>
          </div>
          <div class="col textbox">
            <span class="tip">{{ item.useConditions === 1?'无门槛使用':'满'+item.useMoney+'元使用' }}</span>
            <p class="t1">有效期至：{{ item.endDate | dateformat }}</p>
            <p class="t2">指定课程：{{ item.courseName }}</p>
          </div>
        </div>
<!--        <div class="item row">-->
<!--          <div class="img row">-->
<!--            <p class="t1">9折</p>-->
<!--            <p class="t2">优惠券</p>-->
<!--          </div>-->
<!--          <div class="col textbox">-->
<!--            <span class="tip">无门槛使用</span>-->
<!--            <p class="t1">有效期间：<br>2019.09.19-2019.10.19</p>-->
<!--            <p class="t2">指定课程：课程包名称</p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="item row item_timeout">-->
<!--          <div class="img row">-->
<!--            <p class="t1">9折</p>-->
<!--            <p class="t2">优惠券</p>-->
<!--          </div>-->
<!--          <div class="col textbox">-->
<!--            <span class="tip">满155使用</span>-->
<!--            <p class="t1">有效期间：<br>2019.09.19-2019.10.19</p>-->
<!--            <p class="t2">指定课程：课程包名称</p>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ConfirmOrder',
  data() {
    return {
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      Couponlist: [],
      choseid: '',
      isreqursting: false
    }
  },
  created: function () {
    this.getCoupon(1)
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.getCoupon(2)
    },
    getCoupon (ftype) {
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
      const option = {
        "pageSize": this.pageSize,
        "pageIndex": this.page,
        "orderby": "",
        "key": ""
      }
      this.isreqursting = true
      this.$http.post(`/api/My/CouponList`,option).then((res) => {
        if (res !== 500) {
          if (!this.isnull(res.data)) {
            if (ftype === 1) {
              this.Couponlist = res.data
            } else {
              this.Couponlist = [...this.Couponlist, ...res.data]
            }
            this.pageCount = res.pageCount
            this.page = res.page
          }
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
  }
}
</script>
