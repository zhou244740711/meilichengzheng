<template>
  <div class="tongzhi z-row">
    <span class="title">通知：</span>
    <div class="tongzhi_view z-col">

      <div class="tongzhi_list" ref="list" :style="`width: ${w}px; animation-duration:${s}s`">
        <div class="tongzhi_item">因为动画的偏移距离由公告内容长度决定，造成了动画播放速度与公告内容相关。 （动画的duration: 1000：表示在该时间段内播放完整组动画）</div>
        <div class="tongzhi_item">指定要绑定到选择器的关键帧的名称</div>
        <div class="tongzhi_item">动画指定需要多少秒或毫秒完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'textscroll',
  data () {
    return {
      w: false,
      s: 15
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

<style lang="less">
.tongzhi{
  display: flex;
  width: 100%;
}
.tongzhi_view{
  flex: 1;
  display: block;
  width: calc(100vw - 80px);
  overflow: hidden;
}
.tongzhi_list{
  animation: mymove 15s linear infinite;
  //animation-duration: 15s;
  width: auto;
  clear: both;
  white-space: nowrap;
}
.tongzhi_list:after,
.tongzhi_list:before{
  content: '';
  display: block;
  clear: both;
}
.tongzhi_item{
  white-space: nowrap;
  margin-right: 100px;
  float: left;
}
@keyframes mymove
{
  0% {
    transform: translateX(0);
  }
  100%{
    transform: translateX(-100%);
  }
}
</style>