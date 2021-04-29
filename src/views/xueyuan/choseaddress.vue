<template>
  <div class="address" style="background: #f7f7f7">

    <div class="noclass" v-if="Addresslist.length <=0 && !isreqursting">
      <img src="images/wei-kong@2x.png" alt="">
      <p>暂无地址</p>
    </div>

    <div class="address_list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <label class="item row row-center" v-for="item in Addresslist" :key="item.id">
        <input type="radio" class="input-checked" name="check" v-model="AddressId" :value="item.id">
        <i class="checked"></i>
        <div class="col box">
          <div class="row row-center">
            <span class="name">{{ item.name }}</span>
            <span class="phone">{{ item.phone }}</span>
            <div class="moren" v-show="morenid == item.id">默认</div>
          </div>
          <p class="place">{{item.provinces}}{{ item.address }}</p>
        </div>
        <img class="ico-edit" @click="handleEdit(item)" src="/images/bainji@2x.png" alt="">
        <img class="ico-del" @click.stop="del(item)" src="/images/shanchu@2x.png" alt="">
      </label>

    </div>
    <div class="login_btn" @click="handlePost()">选择地址</div>

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
      courseId: '',
      Addresslist: [],
      isreqursting: false,
      morenid: '',
      AddressId: ''
    }
  },
  created: function () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    }
    this.getOrder(1)
  },
  computed: {

  },
  methods: {
    // handleAdd () {
    //   this.$router.push({name: 'addressAdd'})
    // },
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
        if (res) {
          this.Addresslist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        } else {
          this.Toast(res.msg)
        }
      }).finally(() => {
        this.isreqursting = false
        this.getchose()
      })
    },
    getchose () {
      this.$http.get(`/api/My/GetCourseAddress?CourseId=${this.courseId}`).then((res) => {
        if (res !== 500) {
          this.morenid = res
          this.AddressId = res
        }
      })
    },
    del (item) {
      MessageBox.confirm('是否确认删除?').then(action => {
        if (action) {
          this.$http.get(`/api/My/AddressDelete?Id=${item.id}`).then((res) => {
            if (res !== 500) {
              this.Toast('删除成功')
              this.getOrder(1)
            }
          })
        }
      });
    },
    handlePost () {
      if (this.isnull(this.AddressId)) {
        this.Toast('请选择地址')
        return
      }
      this.$http.get(`/api/My/AddCourseAddress?AddressId=${this.AddressId}&CourseId=${this.courseId}`).then((res) => {
        if (res !== 500) {
          this.Toast('课程地址添加成功')
        }
      })
    },
  }
}
</script>
