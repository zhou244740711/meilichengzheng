<template>
  <div class="myorder clearfix">

    <div class="noclass" v-if="MyClasslist.length <=0 && !isreqursting" style="margin-top: 30vh;">
      <img src="images/kecheng-kong@2x.png" alt="">
      <p>暂无模拟考试</p>
    </div>

    <div class="MyOrder_main"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">

      <div class="monilist clearfix">
        <div class="box" :class="{'active': item.status}" v-for="(item, index) in MyClasslist" :key="index" @click="tokaoshi(item)">
          <div class="item">
            <div class="title">{{ item.name }}</div>

            <mt-button type="primary" size="small" v-show="item.count > 0" plain @click.stop="kaoshilog(item)">考试记录</mt-button>

<!--            <div class="button" v-show="item.count > 0" @click.stop="kaoshilog(item)">考试记录</div>-->
            <div class="textbox">
              <p>已考：{{item.count}}次</p>
              <p>上次得分：{{item.lastScore}}分</p>
            </div>
          </div>
          <div class="textbox2">
            <p class="t1">考试时间</p>
            <p>
              {{ item.startDate }}
              <br>
              至
              <br>
              {{ item.endDate }}
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
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  computed: {

  },
  methods: {
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
      this.$http.post(`/api/MockExam/GetExamQuestion`,{
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
    tokaoshi (item) {
      if (item.status) {
        this.$router.push({name: 'kaoshimoni', query: {id: item.id}})
      }
    },
    kaoshilog (item) {
      this.$router.push({name: 'kaoshimonilog', query: {id: item.id}})
    },
  }
}
</script>
