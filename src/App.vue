<template>
  <div id="app">
    <header class="header row row-center">
      <div class="logo col">
        <img src="images/logo.png" alt="">
      </div>
      <i class="i_menu iconfont icon-caidan" @click="menushow = true"></i>
    </header>
    <div class="header_box"></div>
    <nav class="nav" v-show="menushow" v-cloak>
      <ul>
        <li><a href="index.html">官网首页</a></li>
        <li><a href="classshow.html">课程展示</a></li>
        <li><a href="newslist.html">最新消息</a></li>
        <li><a href="zhengce.html">政策法规</a></li>
        <li><a href="help.html">帮助中心</a></li>
        <li><a href="contactus.html">联系我们</a></li>
      </ul>
      <div class="nav_bg" @click="menushow = false"></div>
    </nav>
    <div class="banner">
      <img src="images/banner.png" alt="">
    </div>
    <div class="tongzhi row row-center">
      <i class="iconfont icon-tongzhi"></i>
      <div class="col text">住房和城乡建设部办公厅关于开展 一级建造师电子注册...</div>
    </div>
    <div class="index_navlink row row-center row-stretch">
      <div class="col navimg"><img src="images/nav1.png" alt=""></div>
      <div class="col navimg"><img src="images/nav2.png" alt=""></div>
    </div>
    <main class="index_main">
      <div class="index_title row row-center">
        <div class="title col">课程展示</div>
        <div class="more">更多》</div>
      </div>
      <div class="classlist clearfix">
        <a href="index.html" class="item">
          <div class="box">
            <div class="img"><img src="images/classimg.png" alt=""></div>
            <div class="text">
              <p class="title">室内排水系统安装（一）</p>
              <p class="subtitle">专业技术人员</p>
            </div>
          </div>
        </a>
        <a href="index.html" class="item">
          <div class="box">
            <div class="img"><img src="images/classimg.png" alt=""></div>
            <div class="text">
              <p class="title">室内排水系统安装（一）</p>
              <p class="subtitle">专业技术人员</p>
            </div>
          </div>
        </a>
        <a href="index.html" class="item">
          <div class="box">
            <div class="img"><img src="images/classimg.png" alt=""></div>
            <div class="text">
              <p class="title">室内排水系统安装（一）</p>
              <p class="subtitle">专业技术人员</p>
            </div>
          </div>
        </a>
        <a href="index.html" class="item">
          <div class="box">
            <div class="img"><img src="images/classimg.png" alt=""></div>
            <div class="text">
              <p class="title">室内排水系统安装（一）</p>
              <p class="subtitle">专业技术人员</p>
            </div>
          </div>
        </a>
        <a href="index.html" class="item">
          <div class="box">
            <div class="img"><img src="images/classimg.png" alt=""></div>
            <div class="text">
              <p class="title">室内排水系统安装（一）</p>
              <p class="subtitle">专业技术人员</p>
            </div>
          </div>
        </a>
        <a href="index.html" class="item">
          <div class="box">
            <div class="img"><img src="images/classimg.png" alt=""></div>
            <div class="text">
              <p class="title">室内排水系统安装（一）</p>
              <p class="subtitle">专业技术人员</p>
            </div>
          </div>
        </a>
      </div>
      <div class="index_title row row-center">
        <div class="title col">政策法规</div>
        <div class="more">更多》</div>
      </div>
      <div class="index_zhengcelist">
        <a href="index.html" class="item">
          <p class="title">浙江省人力资源和社会保障厅办公室关于印发2020...</p>
          <time>2020-05-16</time>
        </a>
        <a href="index.html" class="item">
          <p class="title">浙江省人力资源和社会保障厅办公室关于印发2020...</p>
          <time>2020-05-16</time>
        </a>
        <a href="index.html" class="item">
          <p class="title">浙江省人力资源和社会保障厅办公室关于印发2020...</p>
          <time>2020-05-16</time>
        </a>
        <a href="index.html" class="item">
          <p class="title">浙江省人力资源和社会保障厅办公室关于印发2020...</p>
          <time>2020-05-16</time>
        </a>
        <a href="index.html" class="item">
          <p class="title">浙江省人力资源和社会保障厅办公室关于印发2020...</p>
          <time>2020-05-16</time>
        </a>
        <a href="index.html" class="item">
          <p class="title">浙江省人力资源和社会保障厅办公室关于印发2020...</p>
          <time>2020-05-16</time>
        </a>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data(){
    return {
      menushow: false
    }
  }
}
</script>

<style lang="less">
@import "./assets/css/style";

</style>
