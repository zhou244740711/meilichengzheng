<template>
  <div class="xueyuanindex clearfix">
    <div class="Myself_header row">
      <div class="tx"></div>
      <div class="col"></div>
      <div class="ico_setting"></div>
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

  },
  computed: {

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
