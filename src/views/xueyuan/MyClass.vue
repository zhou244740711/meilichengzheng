<template>
  <div class="myorder clearfix">

    <div class="noclass" v-if="MyClasslist.length <=0 && !isreqursting" style="margin-top: 30vh;">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>暂无课程</p>
    </div>

    <div class="MyOrder_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="MyOrder_card" v-for="item in MyClasslist" :key="item.id">
        <div class="MyOrder_card_header row row-center">
          <div class="title col">{{ item.categoryName }}</div>
          <span :style="{color:item.status==1?'#F7342B':'#10A14C'}">{{ classordertext(item)}}</span>
        </div>
        <div class="MyOrder_card_main">
          <span class="tip" v-show="item.courseType == 2">课程包</span>
          <div class="MyOrder_list">
            <div class="MyOrder_item row row-center">
              <div class="col">
                <span class="number">{{ item.categoryTypeName }}</span>
                <p class="title">{{ item.courseName }}</p>
                <p class="t1">已购 <b>{{ item.period }}</b> 学时/完成 <b>{{ item.finishPeriod }}</b> 学时</p>
              </div>
              <div class="fenshu" :class="{'hong': item.status == 3 || item.status == 4 }" v-show="item.status > 1">{{item.score}}分</div>
            </div>
          </div>
        </div>
        <div class="MyOrder_footer">
          <!-- <span class="text">{{ item.period > item.finishPeriod ? "未开始学习": "已完成学习" }}</span>-->
          <mt-button type="primary" size="small" plain @click="lookclass(item)">查看课程</mt-button>

          <!-- 调试 -->
<!--          <mt-button size="small" disabled>开始考试</mt-button>-->
<!--          <mt-button size="small" type="primary" @click="kaoshi(item, 1)">开始考试</mt-button>-->
<!--          <mt-button type="danger" class="orange" size="small" @click="dizhi(item)">收件地址</mt-button>-->
<!--          <mt-button type="primary" class="logbtn" size="small" @click="kaoshilog(item)">考试记录</mt-button>-->
<!--          <mt-button type="primary" class="zhengshubtn" size="small" @click="zhengshu(item)">证书</mt-button>-->
<!--          <mt-button type="danger" size="small" @click="kaoshi(item, 2)">补考</mt-button>-->
          <!-- 调试 -->

          <template v-if="item.status == 1 && item.period > item.finishPeriod">
            <mt-button size="small" disabled>开始考试</mt-button>
          </template>
          <template v-if="item.status == 1 && item.period <= item.finishPeriod">
            <mt-button size="small" type="primary" @click="kaoshi(item, 1)">开始考试</mt-button>
          </template>

          <!--已经考完(通过)-->
          <template v-if="item.status == 2">
            <mt-button type="danger" class="orange" size="small" v-show="item.courseType == 2" @click="dizhi(item)">收件地址</mt-button>
            <mt-button type="primary" class="logbtn" size="small" @click="kaoshilog(item)">考试记录</mt-button>
            <mt-button type="primary" class="zhengshubtn" size="small" v-show="item.passStatus" @click="zhengshu(item)">证书</mt-button>
          </template>
          <!--拥有补考机会-->
          <template v-if="item.status == 3">
            <mt-button type="primary" size="small" @click="kaoshilog(item)">考试记录</mt-button>
            <mt-button type="danger" size="small" @click="kaoshi(item, 2)">补考</mt-button>
          </template>
          <!--已经考完(不通过) -->
          <template v-if="item.status == 4">
            <mt-button type="primary" size="small" @click="kaoshilog(item)">考试记录</mt-button>
          </template>
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
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  computed: {

  },
  methods: {
    classordertext (item){
      switch (item.status) {
        case 1:
          return '待考试'
        case 2:
          return '已考过'
        case 3:
          return '已挂科'
        case 4:
          return '已挂科'
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
        if (res !== 500) {
          this.MyClasslist = res.data
          this.pageCount = res.pageCount
          this.page = res.page
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
      this.$router.push({name: 'zhengshu', query: {passId: item.passId}})
    },
  }
}
</script>
