<template>
  <div class="z-uploader">
    <div class="z-upload" v-for="(item,index) in list" :key="index">
      <div class="box">
        <div class="z-upload-del" @click="del(item,index)"></div>
        <div class="z-upload-img" :style="`background-image: url(${item})`"></div>
      </div>
    </div>
    <div class="z-upload" ref="upload">
      <div class="box">
        <label class="z-upload-img z-upload-addbox">
          <input hidden="hidden" v-on:change="change" id="fileImage" multiple="true" type="file" accept="image/*" class="file_btn01" name="fileselect[]"/>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'textscroll',
  data () {
    return {
      list: [],
      screenWidth: document.body.clientWidth,
      timer: false
    }
  },
  mounted () {
    this.contentWidthChange()
    let that = this;
    window.addEventListener("resize", function () {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    })
  },
  watch: {
    screenWidth: {
      // eslint-disable-next-line no-unused-vars
      handler(newVal, oldVal) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = newVal;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            that.timer = false;
            that.contentWidthChange();//执行自己的逻辑
          }, 100)
        }
      },
      immediate: true,
    }
  },
  methods:{
    contentWidthChange () {
      const w = document.getElementsByClassName('z-upload')[0].clientWidth
      var list = document.getElementsByClassName('z-upload')
      for (var i = 0; i < list.length; i++) {
        list[i].style.height = w+ 'px'
      }
    },
    change (e) {
      var _this = this;
      var file = e.target.files;
      if (Math.ceil(file[0].size / 1024 / 1024) > _this.limitSize) {
        alert('文件太大');
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function (f) {
        _this.upload(f.target.result);
      };
    },
    upload: function(data){
      var _this = this;
      console.log(data)
      _this.list.push(data);
      this.$nextTick(() => {
        this.contentWidthChange()
      })
    }
  }
}
</script>

<style lang="less">
.z-uploader{

  &:before,
  &:after{
    content: '';
    display: block;
    clear: both;
  }
  .z-upload{
    width: 33.3333%;
    float: left;
    padding: 10px;

    .box{
      border: solid 1px #333333;
      height: 100%;
    }
    .z-upload-img{
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
    }
    .z-upload-addbox{
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyBjbGFzcz0iaWNvbiIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMC4wMHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iIzMzMzMzMyIgZD0iTTU1NC43NiA1NDkuODg5djM0MWMwIDI2LjUxLTIxLjQ5MSA0OC00OCA0OC0yNi41MSAwLTQ4LTIxLjQ5LTQ4LTQ4di0zNDFIMTE0LjE3MmMtMjYuNTEgMC00OC0yMS40OS00OC00OHMyMS40OS00OCA0OC00OEg0NTguNzZ2LTM0MGMwLTI2LjUxIDIxLjQ5LTQ4IDQ4LTQ4czQ4IDIxLjQ5IDQ4IDQ4djM0MGgzNDYuNDE0YzI2LjUxIDAgNDggMjEuNDkgNDggNDhzLTIxLjQ5IDQ4LTQ4IDQ4SDU1NC43NnoiIC8+PC9zdmc+") no-repeat center center;
      background-size: 50%;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>