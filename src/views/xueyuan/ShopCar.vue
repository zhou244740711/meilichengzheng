<template>
  <div class="xueyuanindex clearfix">

    <div class="noshopcar" v-if="shopcarlist.length <= 0" v-cloak>
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
          <div >
            <div class="del" @click.stop="handeldel(item, index)"></div>
            <br>
            <p class="t2">¥<span>{{ item.price }}</span></p>
          </div>
        </div>
      </div>
    </div>

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
      shopcarlist: []
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
            sum = sum + parseFloat(e.price)
          }
        })
      }
      return sum
    }
  },
  methods: {
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
      this.$http.post(`/api/My/ShopCar`,{
        "pageSize": this.pageSize,
        "pageIndex": this.page,
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res) {
          this.shopcarlist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        } else {
          this.Toast(res.msg)
        }
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
        this.$router.push({name: 'ConfirmOrder', params: {list: list, buytype: 2}})
      }
    },
    handeldel (item, index) {
      MessageBox.confirm('确认从购物车删除？').then(action => {
        if (action) {
          this.shopcarlist.splice(index, 1)
        }
      })
    }
  }
}
</script>
