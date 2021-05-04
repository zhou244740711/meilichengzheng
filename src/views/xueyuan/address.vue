<template>
  <div class="address">

    <div class="noclass" v-if="Addresslist.length <=0 && !isreqursting" style="margin-top: 20vh;margin-bottom: 20vh;">
      <img src="images/wei-kong@2x.png" alt="">
      <p>暂无地址</p>
    </div>

    <div class="address_list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="item row row-center" v-for="item in Addresslist" :key="item.id">
        <div class="col box">
          <div class="row row-center">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>
            <div class="moren" v-show="item.isDefault">默认</div>
          </div>
          <p class="place">{{item.provinces}}{{ item.address }}</p>
        </div>
        <img class="ico-edit" @click="handleEdit(item)" src="/images/bainji@2x.png" alt="">
        <img class="ico-del" @click.stop="del(item)" src="/images/shanchu@2x.png" alt="">
      </div>

    </div>
    <div class="login_btn" @click="handleAdd()">新增地址</div>

  </div>
</template>

<script>
// @ is an alias to /src
import { MessageBox } from 'mint-ui';

export default {
  name: 'addressList',
  components: {},
  data() {
    return {
      Addresslist: [],
      isreqursting: false
    }
  },
  created: function () {
    // this.getOrder(1)
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  computed: {

  },
  methods: {
    handleAdd () {
      this.$router.push({name: 'addressAdd'})
    },
    handleEdit (item) {
      this.$router.push({name: 'addressAdd', query: {id: item.id}})
    },
    loadMore() {
      this.loading = true;
      this.getOrder(2)
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
      this.$http.post(`/api/My/AddressList`,{
        "pageSize": this.pageSize,
        "pageIndex": this.page,
        "orderby": "",
        "key": ""
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res !== 500) {
          this.Addresslist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
    del (item) {
      MessageBox.confirm('是否确认删除?').then(action => {
        if (action) {
          this.$http.get(`/api/My/AddressDelete?Id=${item.id}`).then((res) => {
            if (res !== 500) {
              this.Toast({
                message: "删除成功",
                duration: 2000
              });
              this.getOrder(1)
            }
          })
        }
      });
    },
  }
}
</script>
