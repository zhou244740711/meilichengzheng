<template>
  <nav class="nav" v-show="menushow" v-cloak>
    <ul>
      <li @click="hidemenu()"><router-link :to="{name:'Home'}">官网首页</router-link></li>
      <li @click="hidemenu()"><router-link :to="{name:'classshow'}">课程展示</router-link></li>
      <li @click="hidemenu()"><router-link :to="{name:'newslist'}">最新消息</router-link></li>
      <li @click="hidemenu()"><router-link :to="{name:'zhengce'}">政策法规</router-link></li>
      <li @click="hidemenu()"><router-link :to="{name:'help'}">帮助中心</router-link></li>
      <li @click="hidemenu()"><router-link :to="{name:'Contact'}">联系我们</router-link></li>
    </ul>
    <div class="nav_bg" @click="menushow = false"></div>
  </nav>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MyNav',
  data () {
    return {
      menushow: false
    }
  },
  methods: {
    showmenu () {
      this.menushow = true
    },
    hidemenu () {
      this.menushow = false
    }
  }
}
</script>
