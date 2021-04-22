<template>
  <div class="xueyuanindex">
    <div class="xueyuanindex_header">
      <img src="images/Mask2@2x.png" alt="">
    </div>
    <div class="xueyuan_header2">
      <div class="xueyuan_header2_select">
<!--        <select>-->
<!--          <option value="">2021年度课程</option>-->
<!--          <option value="">2021年度课程2232244244</option>-->
<!--        </select>-->
        <z-select :options="classlist" valuekey="id" v-model="formdata.select1" @change="getlist2"></z-select>
      </div>
      <div class="row row-center xueyuan_header2_navbox">
        <div class="col navselect">
          <z-select :options="selectoption" valuekey="id" v-model="formdata.select2" @change="getlist3(...arguments, 1)"></z-select>
        </div>
        <div class="col navselect">
          <z-select :options="selectoption2" valuekey="id" v-model="formdata.select3" @change="getlist3(...arguments, 2)"></z-select>
        </div>
        <div class="col navselect">
          <z-select :options="selectoption3" valuekey="id" v-model="formdata.select4" @change="getlist4"></z-select>
        </div>
      </div>
    </div>
    <div class="noclass" v-if="studylist.length <=0 && !isreqursting">
      <img src="images/wu1@2x.png" alt="">
      <p>请选择课程</p>
    </div>
    <div class="stady_list"
         v-else
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="stydy_card" v-for="item in studylist" :key="item.id">
        <div class="card_header">
          <span class="tip" v-show="item.type == 2">课程包</span>
          <span class="number">编号：{{ item.number }}</span>
        </div>
        <div class="card_main">
          <p class="title text-over">{{ item.name }}</p>
          <div class="row"><span class="col t1">共 <b>{{item.period}}</b> 课时</span> <span class="t2">¥{{item.price}}</span></div>
        </div>
        <div class="card_footer">
          <div class="row">
            <div class="col">
              <span class="tag">{{ item.categoryName }}</span>
            </div>
            <div class="z-button z-button-blue__kx" v-show="item.type !== 2" @click="join(item)">加入购物车</div>
            <div class="z-button" @click="buy(item)">立即购买</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import ZSelect from "@/components/ZSelect";
export default {
  name: 'Help',
  components: {ZSelect},
  data() {
    return {
      selected: '',
      formdata: {
        select1: '',
        select2: '',
        select3: '',
        select4: '',
      },
      classlist: [],
      selectoption: [],
      selectoption2: [],
      selectoption3: [],
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      categoryId: 0,
      studylist: [],
      isreqursting: false
    }
  },
  created: function () {
    if (localStorage.getItem('indexdata')) {
      this.readformdata()
    } else {
      this.GetCategoryTreeAll()
    }
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.getstudylist(2)
    },
    saveformdata () {
      const data = {
        selected: this.selected,
        formdata: this.formdata,
        classlist: this.classlist,
        selectoption: this.selectoption,
        selectoption2: this.selectoption2,
        selectoption3: this.selectoption3,
        loading: this.loading,
        pageSize: this.pageSize,
        page: this.page,
        pageCount: this.pageCount,
        categoryId: this.categoryId,
        studylist: this.studylist,
      }
      localStorage.setItem('indexdata', JSON.stringify(data))
    },
    readformdata () {
      alert('读取缓存')
      const data = JSON.parse(localStorage.getItem('indexdata'))
      this.selected = data.selected
      this.formdata = data.formdata
      this.classlist = data.classlist
      this.selectoption = data.selectoption
      this.selectoption2 = data.selectoption2
      this.selectoption3 = data.selectoption3
      this.loading = data.loading
      this.pageSize = data.pageSize
      this.page = data.page
      this.pageCount = data.pageCount
      this.categoryId = data.categoryId
      if (!this.isnull(this.formdata.select3) || !this.isnull(this.formdata.select4)) {
        this.getstudylist(1)
      }
    },
    GetCategoryTreeAll () {
      this.$http.get('/api/Course/GetCategoryTreeAll').then((res) => {
        this.classlist = res
        if (res.length > 0) {
          this.categoryId = res[0].id
          this.$set(this.formdata,'select1', res[0].id)
          this.getlist2(res[0])
        }
        this.saveformdata()
      })
    },
    getlist2 (data) {
      this.categoryId = data.id
      if (data.list !== undefined && data.list !== null && data.list.length > 0) {
        this.selectoption = data.list
        this.selectoption2 = []
        this.selectoption3 = []
        this.studylist = []
        this.$set(this.formdata,'select2', '')
        this.$set(this.formdata,'select3', '')
        this.$set(this.formdata,'select4', '')
      }
      this.saveformdata()
    },
    getlist3 (data, t) {
      this.categoryId = data.id
      if (t === 2) {
        this.getstudylist(1)
      }
      this.$http.get(`/api/Course/GetCategory?ParentId=${data.id}`).then((res) => {
        if (res !== 500) {
          if (t === 1) {
            this.selectoption2 = res
            this.selectoption3 = []
            this.$set(this.formdata,'select3', '')
            this.$set(this.formdata,'select4', '')
            this.studylist = []
          } else {
            this.selectoption3 = res
            this.$set(this.formdata,'select4', '')
          }
        }
        this.saveformdata()
      })
    },
    getlist4 (data) {
      this.categoryId = data.id
      this.getstudylist(1)
      this.saveformdata()
    },
    getstudylist (ftype) {
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
      this.$http.post(`/api/Course/GetCourseList`,{
        "categoryId": this.categoryId,
        "pageSize": this.pageSize,
        "pageIndex": this.page,
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res !== 500) {
          this.studylist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        } else {
          this.Toast(res.msg)
        }
        this.saveformdata()
      }).finally(() => {
        this.isreqursting = false
      })
    },
    join (item) {
      this.$http.get(`/api/Order/AddShopCar?CourseId=${item.id}`).then((res) => {
        if (res !== 500) {
          this.Toast('加入购物车成功')
        }
      })
    },
    is_weixn () {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    },
    buy (item) {
      sessionStorage.setItem('buylist', JSON.stringify([item]))
      if (this.is_weixn()) {
        const url = process.env.VUE_APP_BASE + '/ConfirmOrder?buytype=1'
        this.$http.get(`/api/WxAuth/GetAuthorizeUrl?redirectUrl=${url}`).then((res) => {
          location.href = res
        })
      } else {
        this.$router.push({name: 'ConfirmOrder', query: {buytype: 1}})
      }
    }
  }
}
</script>
