<template>
  <main class="index_main contactusmain">

    <div class="img"><img src="images/contactus.png" alt=""></div>
    <div class="contact_item row row-center">
      <i class="iconfont icon-ziyuan dizhi"></i>
      <div class="t1">公司地址：</div>
      <div class="col t2">杭州市下城区新天地中心</div>
    </div>
    <div class="contact_item row row-center">
      <i class="iconfont icon-dianhua2 phone"></i>
      <div class="t1">咨询电话：</div>
      <div class="col t2">0571-80000000</div>
    </div>
    <div class="contact_item row row-center">
      <i class="iconfont icon-shijian time"></i>
      <div class="t1">上班时间：</div>
      <div class="col t2">周一到周五</div>
    </div>
    <div class="t3">上午 8:30-12：00      下午 13:00-17:00</div>
    <img class="wxcode" src="images/contact_wx.png" alt="">
    <div class="t3">关注微信公众号</div>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Contact',
  data() {
    return {
    }
  },
  created: function () {
    this.$wxShare.updateWxShareConfig({
      link: location.href
    });
  },
  methods: {
  }
}
</script>