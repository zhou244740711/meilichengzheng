<template>
  <div class="tongzhi z-row">
    <div class="tongzhi_view z-col">
      <div class="tongzhi_list" ref="list">
        <div class="tongzhi_item row row-center"  v-for="(item, index) in newslist" :key="index" @click="handleclick(item)">
<!--          <div class="col" :style="`animation-duration:${s}s`">{{item.title}}</div>-->
          <div class="col text-over">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'textscroll',
  props: {
    list: Array
  },
  data () {
    return {
      w: false,
      s: 15,
      newslist: this.list
    }
  },
  watch: {
    list (newsdata) {
      this.newslist = newsdata
      // this.widthchange()
    }
  },
  mounted () {
    // this.widthchange()
  },
  methods: {
    handleclick (item) {
      this.$router.push({name: 'NewsDetails', query: { id: item.id}})
    },
    widthchange () {
      this.w = 0
      this.$refs.list.children.forEach((item) => {
        this.w += item.clientWidth + 50
      })
      this.s = this.w / 50
    }
  }
}
</script>
