<template>
  <div class="lookpdf" v-show="show">
    <div class="lookpdfbox">
      <pdf :src="url"></pdf>
      <a ref="down" :href="downurl" download hidden></a>
      <button class="lookpdf_btn" v-longpress="() => handledown()">长按保存</button>
    </div>
    <div class="lookpdf_bg" @click="hidepdf"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import pdf from 'vue-pdf'
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'

export default {
  name: 'lookpdf',
  components: {
    pdf
  },
  data() {
    return {
      show: false,
      url: '',
      downurl: ''
    }
  },
  created: function () {
  },
  mounted () {
  },
  methods: {
    showpdf (url) {
      console.log(url)
      this.url = pdf.createLoadingTask({ url: 'http://jywapi.nonghanxue.com' + url, CMapReaderFactory })
      this.downurl = 'http://jywapi.nonghanxue.com' + url
      // this.url = process.env.VUE_APP_IMG_API + url
      this.show = true
    },
    hidepdf() {
      this.show = false
    },
    handledown () {
      console.log('下载')
      this.$refs.down.click()
    }
  }
}
</script>

<style scoped lang="less">
  .lookpdf_bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0,0,0,0.5);
  }
  .lookpdfbox{
    position: fixed;
    z-index: 20;
    width: 90vw;
    min-height: 40vw;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    border-radius: 3px;
    padding: 10px;

    .lookpdf_btn{
      width: 115px;
      height: 37px;
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      color: #FFFFFF;
      background: linear-gradient(-90deg, #4DD18E, #10A14E);
      border-radius: 19px;
      margin: 0 auto;
      display: block;
      border: none;
    }
  }
</style>