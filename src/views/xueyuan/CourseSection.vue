<template>
  <div class="xueyuanindex clearfix">

    <div class="noclass" v-if="CourseSectionList.length <=0 && !isreqursting">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>请选择课程</p>
    </div>
    <div class="MyClass_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="MyClass_header">
        <div class="title">{{ courseName }}</div>
      </div>

      <div class="MyOrder_list">
        <div class="title">章节列表</div>
        <div class="MyOrder_item" v-for="item in CourseSectionList" :key="item.sectionId">
          <div class="row">
            <div class="col">
              <p class="title">{{ item.sectionName }}</p>
              <div class="jindubox row row-center">
                <div class="jindu">
                  <div class="jindutiao" :style="{width: item.schedule +'%'}"></div>
                </div>
                <span class="jindu_text">{{item.schedule}}%</span>
              </div>
            </div>
            <div class="lookzjbtn col-bottom" @click="start(item)">开始学习</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'CourseSection',
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
      this.$http.post(`/api/My/CourseSectionList`,{
        "courseId": this.$route.query.courseId,
        "pageSize": this.pageSize,
        "pageIndex": this.page,
        "orderby": "",
        "key": ""
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res) {
          this.CourseSectionList = res.data
          this.pageCount = res.pageCount
          this.page = res.page
        } else {
          this.Toast(res.msg)
        }
      }).finally(() => {
        this.isreqursting = false
      })
    },
    start (item) {
      // if (item.sectionVideo === null) {
      //   this.Toast('暂无视频')
      //   return
      // }
      this.$router.push({name: 'Video', params: {sectionVideo: item.sectionVideo, sectionId: item.sectionId, lookDuration: item.lookDuration}})
    }
  }
}
</script>
