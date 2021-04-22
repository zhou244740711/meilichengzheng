<template>
  <div class="xueyuanindex clearfix">

    <div class="noshopcar" v-if="shopcarlist.length <= 0 && !isreqursting" v-cloak>
      <img src="/images/kong@2x.png" alt="">
      <p>购物车暂无课程</p>
    </div>

    <div class="ShopCarlist"
         v-else
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="stydy_card" :class="{'select': item.chose}" v-for="(item, index) in shopcarlist" :key="item.id" @click="select(item,index)" v-cloak>
        <div class="card_main row row-center">
          <i class="check"></i>
          <div class="col">
            <p class="number">编号：{{ item.number }}</p>
            <p class="title">{{ item.name }}</p>
            <div class="row">
              <span class="col t1">共 <b>{{item.period}}</b> 课时 <span class="tag">{{ item.categoryName }}</span></span>
            </div>
          </div>
          <div style="text-align: right">
            <div class="del" @click.stop="handeldel(item, index)"></div>
            <p class="clearfix"></p>
            <br>
            <p class="t2">¥<span>{{ item.price }}</span></p>
          </div>
        </div>
      </div>
    </div>

    <div style="height: 50px;"></div>
    <div class="shopcar_footer row row-stretch row-center">
      <div class="col text">合计：<span class="hejiprice">￥{{ heji }}</span></div>
      <div class="btn" :class="{'buybtn': heji > 0}" @click="buypost()">确认购买</div>
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
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      shopcarlist: [],
      zhezhao: false,
      isreqursting: false
    }
  },
  created: function () {
    this.getshopcar(1)
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    heji () {
      let sum = 0
      if (this.shopcarlist.length > 0){
        this.shopcarlist.forEach(e => {
          if (e.chose) {
            sum = sum + e.price
          }
        })
      }
      return sum.toFixed(2)
    }
  },
  methods: {
    is_weixn () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    },
    loadMore() {
      this.loading = true;
      this.getshopcar(2)
    },
    getshopcar (ftype) {
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
      this.$http.post(`/api/My/ShopCar`,{
        "pageSize": this.pageSize,
        "pageIndex": this.page,
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res !== 500) {
          this.shopcarlist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
    select (item, index) {
      if (item.chose === undefined) {
        this.$set(this.shopcarlist[index], 'chose', true)
      } else {
        this.$set(this.shopcarlist[index], 'chose', !item.chose)
      }
    },
    buypost () {
      if (this.heji > 0) {
        let list = []
        this.shopcarlist.forEach(e => {
          if (e.chose) {
            list.push(e)
          }
        })
        sessionStorage.setItem('buylist', JSON.stringify(list))
        if (this.is_weixn()) {
          const url = process.env.VUE_APP_BASE + '/ConfirmOrder?buytype=2'
          this.$http.get(`/api/WxAuth/GetAuthorizeUrl?redirectUrl=${url}`).then((res) => {
            location.href = res
          })
        } else {
          this.$router.push({name: 'ConfirmOrder', query: {buytype: 2}})
        }
      }
    },
    handeldel (item) {
      MessageBox.confirm('确认从购物车删除？').then(action => {
        if (action) {
          this.$http.get(`/api/My/DelShopCar?Id=${item.id}`).then((res) => {
            if (res !== 500) {
              this.Toast('删除成功')
              this.getshopcar(1)
            }
          })
        }
      })
    }
  }
}
</script>
