<template>
  <div class="myorder clearfix">

    <div class="noclass" v-if="CourseSectionList.length <=0 && !isreqursting" style="margin-top: 30vh;">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>暂无课程</p>
    </div>

    <div class="MyClass_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         v-show="CourseSectionList.length > 0">

      <div class="MyClass_header">
        <div class="tip">课程包</div>
        <div class="title">{{ courseName }}</div>
      </div>

      <div class="MyOrder_list">
        <div class="title">课程列表</div>
        <div class="MyOrder_item" v-for="item in CourseSectionList" :key="item.courseId">
          <div class="row">
            <div class="col">
              <span class="number">{{ courseName }}</span>
              <p class="title">{{ item.courseName }}</p>
              <p class="t1">共 <b>{{ item.period }}</b> 课时 &nbsp;&nbsp;&nbsp;&nbsp; 完成 <b>{{ item.finishPeriod }}</b> 课时</p>
            </div>
            <div class="lookzjbtn col-bottom" @click="look(item)">查看章节</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MyClassList',
  components: {},
  data() {
    return {
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      CourseSectionList: [],
      courseName: '',
      isreqursting: false
    }
  },
  created: function () {
    this.courseName = this.$route.query.courseName
    this.getOrder(1)
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  computed: {

  },
  methods: {
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
      this.$http.post(`/api/My/CoursePackList`,{
        "courseId": this.$route.query.courseId,
        "pageSize": this.pageSize,
        "pageIndex": this.page,
        "orderby": "",
        "key": ""
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res !== 500) {
          this.CourseSectionList = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
    look (item) {
      this.$router.push({name: 'CourseSection', query: {courseId: item.courseId, courseName: item.courseName}})
    }
  }
}
</script>
