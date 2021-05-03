<template>
  <mt-popup
      v-model="popupVisible"
      position="right"
      modal="false"
      popup-transition="popup-fade"
      style="width: 100%;height: 100%;">
    <div style="overflow:auto; height: 100%;">

      <div class="noclass" v-if="Couponlist.length <=0 && !isreqursting" style="margin-top: 30vh;">
        <img src="images/quan-kong@2x.png" alt="">
        <p>暂无优惠券</p>
      </div>

      <div class="Coupon"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="Coupon_list">
          <div class="item row" :class="{'select': item.id === choseitem.id,'item_timeout': item.status !== 1}" v-for="(item, index) in Couponlist" :key="index" @click="handleselect(item,index)">
            <div class="shiyong" v-show="item.status == 2"><img src="images/yishiyong@2x.png" alt=""></div>
            <div class="guoqi" v-show="item.status == 3"><img src="images/guoqi@2x.png" alt=""></div>
            <div class="img row">
              <p class="t1">{{ item.discount }}折</p>
              <p class="t2">优惠券</p>
            </div>
            <div class="col textbox">
              <span class="tip">{{ item.useConditions === 1?'无门槛使用':'满'+item.useMoney+'元使用' }}</span>
              <p class="t1">有效期至：<br>{{ item.endDate | dateformat }}</p>
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

      <div style="height: 60px;"></div>
      <div class="Coupon_footer row row-center">
        <div class="login_btn col" @click="chose">确定</div>
        <div class="btn_cancel col" @click="popupVisible=false">取消</div>
      </div>
    </div>
  </mt-popup>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'ChoseCoupon',
  data() {
    return {
      popupVisible: false,
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      Couponlist: [],
      shopCarIds: [],
      choseitem: {},
      isreqursting: false
    }
  },
  created: function () {
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.getCoupon(2)
    },
    handleselect (item) {
      if (item.status === 1) {
        this.choseitem = item
      }
    },
    chose () {
      this.$emit('chose', this.choseitem)
      this.popupVisible = false
    },
    showmodal (shopCarIds) {
      this.popupVisible = true
      this.shopCarIds = shopCarIds
      this.getCoupon(1)
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
        "courseIds": this.shopCarIds
      }
      this.isreqursting = true
      this.$http.post(`/api/My/PayCouponList`,option).then((res) => {
        if (ftype === 1) {
          this.Couponlist = res
        } else {
          this.Couponlist = [...this.Couponlist, ...res]
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
  }
}
</script>
