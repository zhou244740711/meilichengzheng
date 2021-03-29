<template>
  <div class="tongzhi z-row">
    <i class="iconfont icon-tongzhi"></i>
    <div class="tongzhi_view z-col">
      <div class="tongzhi_list" ref="list" :style="`width: ${w}px; animation-duration:${s}s`">
        <div class="tongzhi_item" v-for="(item, index) in newslist" :key="index">{{item.title}}</div>
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
  mounted () {
    this.w = 0
    this.$refs.list.children.forEach((item) => {
      this.w += item.clientWidth + 105
    })
    this.s = this.w / 100
  }
}
</script>
