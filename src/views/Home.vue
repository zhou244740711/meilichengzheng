<template>
  <div>
    <div class="banner">
      <img src="images/banner.png" alt="">
    </div>
    <main class="index_main">
      <div class="index_title row row-center">
        <div class="title col"><img class="ico" src="images/laba@2x.png" alt="">最新消息</div>
        <router-link :to="{ name: 'newslist'}" class="more">更多></router-link>
      </div>
      <textscroll :list="newslist"></textscroll>
      <div class="index_navlink row row-center row-stretch">
        <div class="col navimg" v-for="item in CategoryList" :key="item.id" @click="navclick(item)">
          <img :src="imgurl(item.coverImg)" alt="">
        </div>
      </div>
      <div class="index_title row row-center">
        <div class="title col"><img class="ico" src="images/ico-kecheng@2x.png" alt="">课程展示</div>
        <router-link :to="{ name: 'classshow'}" class="more">更多></router-link>
      </div>
      <div class="index_classlist clearfix">
        <router-link class="item" v-for="item in classlist" :key="item.id" :to="{ name: 'ClassDetails', query: { id: item.id}}">
          <div class="box row row-stretch">
            <div class="img"><img :src="imgurl(item.coverImgs)" alt=""></div>
            <div class="text col row row-stretch">
              <p class="title">{{ item.title }}</p>
              <p class="subtitle">{{ item.msName }}</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="index_title row row-center">
        <div class="title col"><img class="ico" src="images/ico-zhengce@2x.png" alt="">政策法规</div>
        <router-link :to="{ name: 'zhengce'}" class="more">更多></router-link>
      </div>
      <div class="index_zhengcelist">
        <router-link class="item" v-for="item in zhengcelist" :key="item.id" :to="{ name: 'NewsDetails', query: { id: item.id}}">
          <p class="title text-over">{{ item.title }}</p>
          <time>{{ item.releaseTime | dateformat }}</time>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import Textscroll from "../components/textscroll";
export default {
  name: 'Home',
  components: {Textscroll},
  data () {
    return {
      classlist: [],
      zhengcelist: [],
      newslist: [],
      CategoryList: []
    }
  },
  created: function () {
    this.GetCategoryList()
    this.getclasslist()
    this.getzhengcelist()
    this.getzhengcelist2()
  },
  methods: {
    navclick (item) {
      if (item.url.indexOf('http') > -1 ) {
        location.href = item.url
      } else {
        location.href = process.env.VUE_APP_BASE + item.url
      }
    },
    GetCategoryList () {
      this.$http.post('/api/Website/GetCategoryList',{
        "parentId": 0,
        "pageSize": 2,
        "pageIndex": 1,
        "orderby": "",
        "key": ""
      }).then((res) => {
        if (res !== 500) {
          this.CategoryList = res.data
        }
      })
    },
    // 获取课程列表
    getclasslist() {
      this.$http.post('/api/Website/GetCourseShowList', {
        "pageSize": 4,
        "pageIndex": 1,
      }).then((res) => {
        this.classlist = res.data
      })
    },
    // 获取 消息列表
    getzhengcelist() {
      this.$http.post('/api/Website/GetMsgList', {
        "type": 1,
        "categoryId": 0,
        "pageSize": 5,
        "pageIndex": 1,
      }).then((res) => {
        this.newslist = res.data
      })
    },
    // 获取 政策法规
    getzhengcelist2() {
      this.$http.post('/api/Website/GetMsgList', {
        "type": 2,
        "categoryId": 0,
        "pageSize": 5,
        "pageIndex": 1,
      }).then((res) => {
        this.zhengcelist = res.data
      })
    }
  }
}
</script>
