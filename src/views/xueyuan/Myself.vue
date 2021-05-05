<template>
  <div class="myself clearfix">
    <div class="Myself_header row">
      <div class="tx" :style="{'background-image': 'url(' + touxiang(info.photo) + ')'}"></div>
      <div class="col text">
        <p class="title">{{ info.name }}</p>
        <p class="t2">{{ info.identityCard }}</p>
        <div class="yaoqing row row-center">
          <div class="title col">邀请码： <span>{{ info.invitationCode }}</span></div>
<!--          <div class="btn" :data-clipboard-text="info.invitationUserCode" @click="copy()">复制</div>-->
        </div>
      </div>
      <router-link :to="{ name: 'Setting'}" class="ico_setting"></router-link>
    </div>

    <div class="Myself_nav">
      <div class="title" @click="toorder(1)">我的订单</div>
      <div class="nav row row-center">
        <div class="col" @click="toorder(1)">
          <img src="/images/daizhifu@2x.png" alt="">
          <p>待支付</p>
        </div>
        <div class="col" @click="toorder(2)">
          <img src="/images/yizhifu@2x.png" alt="">
          <p>已支付</p>
        </div>
        <div class="col" @click="toorder(3)">
          <img src="/images/tuikuan@2x.png" alt="">
          <p>退款</p>
        </div>
      </div>
    </div>

    <div class="Myself_list" style="margin-top: -25px;">
      <router-link :to="{ name: 'MyClass'}" class="item row row-center">
        <div class="ico"><img src="/images/kecheng@2x.png" alt=""></div>
        <div class="title col">我的课程</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
      <router-link :to="{ name: 'Stadyend'}" class="item row row-center">
        <div class="ico"><img src="/images/xueshi@2x.png" alt=""></div>
        <div class="title col">已完成学时</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
      <router-link :to="{ name: 'moni' }" class="item row row-center">
        <div class="ico"><img src="/images/moni@2x.png" alt=""></div>
        <div class="title col">模拟考试</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
    </div>
    <div class="Myself_list">
      <router-link :to="{ name: 'information2'}" class="item row row-center">
        <div class="ico"><img src="/images/xinxi@2x.png" alt=""></div>
        <div class="title col">个人信息</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
<!--      <router-link :to="{ name: 'Coupon'}" class="item row row-center">-->
<!--        <div class="ico"><img src="/images/quan@2x.png" alt=""></div>-->
<!--        <div class="title col">优惠券</div>-->
<!--        <i class="iconfont icon-jiantou-you"></i>-->
<!--      </router-link>-->
<!--      <router-link :to="{ name: 'address'}" class="item row row-center">-->
<!--        <div class="ico"><img src="/images/dizhi@2x.png" alt=""></div>-->
<!--        <div class="title col">收件地址</div>-->
<!--        <i class="iconfont icon-jiantou-you"></i>-->
<!--      </router-link>-->
      <router-link :to="{ name: 'Yaoqing', query: {code: info.invitationUserCode}}" class="item row row-center">
        <div class="ico"><img src="/images/yaoqing@2x.png" alt=""></div>
        <div class="title col">邀请人码</div>
        <div class="text">{{ info.invitationUserCode }}</div>
        <i class="iconfont icon-jiantou-you"></i>
      </router-link>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import Clipboard from "clipboard"

export default {
  name: 'ShopCar',
  components: {},
  data() {
    return {
      info: ''
    }
  },
  created: function () {
    this.getmsg()
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  computed: {

  },
  methods: {
    touxiang (img) {
      if (this.isnull(img)) {
        return '/images/touxiang.png'
      } else {
        return this.imgurl(img)
      }
    },
    copy () {
      // var _this = this;
      var clipboard = new Clipboard(".btn"); //单页面引用
      // var clipboard = new this.Clipboard(".btn"); //在main.js中引用
      clipboard.on("success", e => {
        console.log(e)
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        console.log(e)
        // 不支持复制
        this.Toast({
          message: "该浏览器不支持自动复制",
          duration: 2000
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    toorder (nav) {
      this.$router.push({name: 'MyOrder', query: {nav: nav}})
    },
    getmsg () {
      this.$http.get('/api/Account/GetCurrentAccount').then((res) => {
        if (res !== 500) {
          this.info = res
        }
      })
    }
  }
}
</script>
