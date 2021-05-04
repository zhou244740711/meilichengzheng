<template>
  <main class="index_main">

    <div class="index_zhengcelist"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <router-link class="item" v-for="item in newslist" :key="item.id" :to="{ name: 'NewsDetails', query: { id: item.id}}">
        <p class="title">{{ item.title }}</p>
        <time>{{ item.releaseTime | dateformat }}</time>
      </router-link>
    </div>

  </main>
</template>


<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
      newslist: [],
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1
    }
  },
  created: function () {
    this.getnewslist(1)
    this.$wxShare.updateWxShareConfig({
      link: location.href
    });
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.getnewslist(2)
    },
    getnewslist(ftype) {
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
      this.$http.post('/api/Website/GetMsgList', {
        "type": 1,
        "categoryId": 0,
        "pageSize": this.pageSize,
        "pageIndex": this.page,
      }).then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 2500);
        if (res !== 500) {
          if (ftype === 1) {
            this.newslist = res.data
          } else {
            this.newslist = [...this.newslist, ...res.data]
          }
          this.pageCount = res.pageCount
          this.page = res.page
        }
      })
    }
  }
}
</script>
