<template>
  <div class="xueyuanindex clearfix">

    <div class="Stadyend_header">
      <z-select :options="option" v-model="year" @change="handleselect"></z-select>
    </div>

    <div class="noclass" v-if="MyClasslist.length <=0 && !isreqursting">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>暂无学时证明</p>
    </div>
    <div class="Stady_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="stadyendcard" v-for="(item, index) in MyClasslist" :key="index">
        <div class="stadyendcard_header row row-center">
          <div class="name col">{{ item.categoryName }}</div>
          <div class="btn" @click="zhengming">学时证明</div>
        </div>
        <div class="stadyendcard_main">
          <div class="stadyendcard_list">
            <div class="item" v-for="(data, dindex) in item.children" :key="dindex">
              <p class="t1">{{ data.categoryName }}({{data.isBuy?'已购买':'未购买'}})</p>
              <p class="t2">共 <span class="num">{{data.period}}</span> 学时</p>
            </div>
          </div>
        </div>
        <div class="stadyendcard_footer row row-center">
          <div class="nav col">
            <p class="t1">{{item.buyTotalPeriod}}</p>
            <p class="t2">总计(已购买)</p>
          </div>
          <div class="nav col">
            <p class="t1">{{ item.passPeriod }}</p>
            <p class="t2">考试通过</p>
          </div>
          <div class="nav col">
            <p class="t1">{{item.successPeriod}}</p>
            <p class="t2">总计完成</p>
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
  name: 'MyClass',
  components: { ZSelect },
  data() {
    return {
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      MyClasslist: [],
      option: [],
      year: '',
      isreqursting: false
    }
  },
  created: function () {
    this.getselect()
  },
  computed: {

  },
  methods: {
    getselect () {
      this.option = []
      const nowyear = new Date().getFullYear()
      this.$http.get(`/api/Course/GetCategoryTreeAll`).then((res) => {
        if (res !== 500) {
          res.forEach(e => {
            this.option.push({
              name: e.name,
              value: e.id
            })
            if (e.name.indexOf(nowyear) !== -1) {
              this.year = e.id
            }
          })
        }
      }).finally(() => {
        this.getClass()
      })
    },
    handleselect () {
      this.getClass()
    },
    loadMore() {
      this.loading = true;
      this.getClass()
    },
    getClass () {
      this.isreqursting = true
      if (this.year === '') {
        return
      }
      this.$http.get(`/api/My/GetPeriod?ParentId=${this.year}`).then((res) => {
        if (res !== 500) {
          this.MyClasslist = res
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
    zhengming (){
      this.$router.push({name: 'zhengming', query: {year: this.year}})
    }
  }
}
</script>

<style lang="less" scoped>
.Stadyend_header /deep/ .z-input{
  border: none;
  height: 70px;
  line-height: 70px;
  input{
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>