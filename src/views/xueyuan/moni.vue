<template>
  <div class="xueyuanindex clearfix" style="background: #FFFFFF">

    <div class="noclass" v-if="MyClasslist.length <=0 && !isreqursting">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>暂无模拟考试</p>
    </div>

    <div class="MyOrder_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="monilist clearfix">
        <div class="box active">
          <div class="item">
            <div class="title">试卷名称</div>
            <div class="textbox">
              <p>已考：0次</p>
              <p>上次得分：0分</p>
            </div>
          </div>
          <div class="textbox2">
            <p class="t1">考试时间</p>
            <p>
              2020.10.10 13:20
              <br>
              至
              <br>
              2020.10.10 13:20
            </p>
          </div>
        </div>
        <div class="box active">
          <div class="item">
            <div class="title">试卷名称</div>
            <div class="textbox">
              <p>已考：0次</p>
              <p>上次得分：0分</p>
            </div>
          </div>
          <div class="textbox2">
            <p class="t1">考试时间</p>
            <p>
              2020.10.10 13:20
              <br>
              至
              <br>
              2020.10.10 13:20
            </p>
          </div>
        </div>
        <div class="box">
          <div class="item">
            <div class="title">试卷名称</div>
            <div class="textbox">
              <p>已考：0次</p>
              <p>上次得分：0分</p>
            </div>
          </div>
          <div class="textbox2">
            <p class="t1">考试时间</p>
            <p>
              2020.10.10 13:20
              <br>
              至
              <br>
              2020.10.10 13:20
            </p>
          </div>
        </div>
        <div class="box">
          <div class="item">
            <div class="title">试卷名称</div>
            <div class="textbox">
              <p>已考：0次</p>
              <p>上次得分：0分</p>
            </div>
          </div>
          <div class="textbox2">
            <p class="t1">考试时间</p>
            <p>
              2020.10.10 13:20
              <br>
              至
              <br>
              2020.10.10 13:20
            </p>
          </div>
        </div>
        <div class="box">
          <div class="item">
            <div class="title">试卷名称</div>
            <div class="textbox">
              <p>已考：0次</p>
              <p>上次得分：0分</p>
            </div>
          </div>
          <div class="textbox2">
            <p class="t1">考试时间</p>
            <p>
              2020.10.10 13:20
              <br>
              至
              <br>
              2020.10.10 13:20
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MyClass',
  components: {},
  data() {
    return {
      loading: false,
      pageSize: 10,
      page: 1,
      pageCount: 1,
      MyClasslist: [],
      isreqursting: false
    }
  },
  created: function () {
    this.getClass(1)
  },
  computed: {

  },
  methods: {
    btntype (item, t) {
      if (t == 1) {
        return item.status == 1 && item.period < item.finishPeriod
      }
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
      this.isreqursting = true
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
      }).finally(() => {
        this.isreqursting = false
      })
    },
    kaoshi (item, bukao) {
      this.$router.push({name: 'kaoshi', query: {courseId: item.courseId, type: bukao}})
    },
    lookclass (item) {
      if (item.courseType == 1) {
        this.$router.push({name: 'CourseSection', query: {courseId: item.courseId, courseName: item.courseName}})
      } else {
        this.$router.push({name: 'MyClassList', query: {courseId: item.courseId, courseName: item.courseName}})
      }
    },
    kaoshilog (item) {
      this.$router.push({name: 'kaoshilog', query: {courseId: item.courseId}})
    },
    dizhi (item) {
      this.$http.post(`/api/My/AddressList`,{
        "pageSize": 10,
        "pageIndex": 1,
      }).then((res) => {
        if (res !== 500) {
          if (res.data.length > 0) {
            this.$router.push({name: 'choseaddress', query: {courseId: item.courseId}})
          } else {
            this.$router.push({name: 'addressAdd', query: {courseId: item.courseId}})
          }
        }
      })
    },
    zhengshu (item) {
      this.$router.push({name: 'zhengshu', query: {courseId: item.courseId}})
    },
  }
}
</script>
