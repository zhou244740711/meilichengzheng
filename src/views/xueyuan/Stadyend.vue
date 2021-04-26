<template>
  <div class="xueyuanindex clearfix">

    <div class="Stadyend_header">
      <z-select :options="option" v-model="year" @change="handleselect"></z-select>
    </div>

    <div class="Stady_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="stadyendcard">
        <div class="stadyendcard_header row row-center">
          <div class="name col">专业名称</div>
          <div class="btn">学时证明</div>
        </div>
        <div class="stadyendcard_main">
          <div class="stadyendcard_list">
            <div class="item">
              <p class="t1">公供科目名称(已购买)</p>
              <p class="t2">共 <span class="num">4</span> 学时</p>
            </div>
            <div class="item">
              <p class="t1">公供科目名称(已购买)</p>
              <p class="t2">共 <span class="num">4</span> 学时</p>
            </div>
            <div class="item">
              <p class="t1">公供科目名称(已购买)</p>
              <p class="t2">共 <span class="num">4</span> 学时</p>
            </div>
          </div>
        </div>
        <div class="stadyendcard_footer row row-center">
          <div class="nav col">
            <p class="t1">8</p>
            <p class="t2">总计(已购买)</p>
          </div>
          <div class="nav col">
            <p class="t1">8</p>
            <p class="t2">总计(已购买)</p>
          </div>
          <div class="nav col">
            <p class="t1">8</p>
            <p class="t2">总计(已购买)</p>
          </div>
        </div>
      </div>
      <div class="stadyendcard">
        <div class="stadyendcard_header row row-center">
          <div class="name col">专业名称</div>
          <div class="btn">学时证明</div>
        </div>
        <div class="stadyendcard_main">
          <div class="stadyendcard_list">
            <div class="item">
              <p class="t1">公供科目名称(已购买)</p>
              <p class="t2">共 <span class="num">4</span> 学时</p>
            </div>
            <div class="item">
              <p class="t1">公供科目名称(已购买)</p>
              <p class="t2">共 <span class="num">4</span> 学时</p>
            </div>
            <div class="item">
              <p class="t1">公供科目名称(已购买)</p>
              <p class="t2">共 <span class="num">4</span> 学时</p>
            </div>
          </div>
        </div>
        <div class="stadyendcard_footer row row-center">
          <div class="nav col">
            <p class="t1">8</p>
            <p class="t2">总计(已购买)</p>
          </div>
          <div class="nav col">
            <p class="t1">8</p>
            <p class="t2">总计(已购买)</p>
          </div>
          <div class="nav col">
            <p class="t1">8</p>
            <p class="t2">总计(已购买)</p>
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
      option: [
        {
          name: '2020年度',
          value: '2020'
        },
        {
          name: '2021年度',
          value: '2021'
        },
      ],
      year: '2021'
    }
  },
  created: function () {
    this.getClass(1)
  },
  computed: {

  },
  methods: {
    handleselect (e) {
      console.log(e)
    },
    loadMore() {
      this.loading = true;
      this.getClass(2)
    },
    getClass (ftype) {
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
      this.$http.post(`/api/My/CourseList`,{
        "pageSize": this.pageSize,
        "pageIndex": this.page,
        "orderby": "",
        "key": ""
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res) {
          this.MyClasslist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        } else {
          this.Toast(res.msg)
        }
      })
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