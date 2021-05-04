<template>
  <div class="z-uploader">
    <div class="z-upload" v-for="(item,index) in list" :key="index">
      <div class="box">
        <div class="z-upload-del" @click="del(item,index)"></div>
        <div class="z-upload-img" :style="`background-image: url(${imgurl(item)})`"></div>
      </div>
    </div>
    <div class="z-upload" ref="upload" v-show="list.length < maxlength">
      <div class="box">
        <label class="z-upload-img z-upload-addbox">
          <input hidden="hidden" v-on:change="change" id="fileImage" multiple="true" type="file" accept="image/*" class="file_btn01" name="fileselect[]"/>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default{
  name: 'ImgUpload',
  props: {
    imglist: [String,Array],
    maxLength: Number
  },
  data () {
    return {
      list: [],
      maxlength: this.maxLength || '9',
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
    imglist (newdata) {
      if (typeof newdata === "string"){
        if (newdata.indexOf(',') !== -1) {
          this.list = newdata.split(',')
        } else {
          this.list = [newdata]
        }
      } else if (typeof newdata === Array){
        this.list = newdata
      }
      this.$nextTick(() => {
        this.contentWidthChange()
      })
    },
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
      var file = e.target.files;
      if (file.length > this.maxlength) {
        this.Toast({
          message: '最大上传数' + this.maxlength,
          duration: 2000
        })
        return
      }
      var formFile = new FormData();
      formFile.append("action", "UploadVMKImagePath");
      for (var i=0;i<file.length;i++) {
        if (file[i].size > 5*1024*1024) {
          this.Toast({
            message: '上传图片不能超过5M',
            duration: 2000
          })
          return;
        }
        formFile.append("files", file[i]); //加入文件对象
      }
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$http.post('/api/Files/UploadImage', formFile).then((res) => {
        console.log(res)
        if (res !== 500) {
          this.list = res.map((item) => {
            return item.filePath
          })
          this.$nextTick(() => {
            this.contentWidthChange()
          })
        }
      }).catch(() => {
        this.Toast({
          message: '图片上传错误，请重试',
          duration: 2000
        })
      }).finally(() => {
        Indicator.close();
      })
    },
    del (item, index) {
      MessageBox.confirm('是否确认删除?').then(action => {
        if (action) {
          this.list.splice(index, 1)
        }
      });
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
      position: relative;
    }
    .z-upload-del{
      width: 30px;
      height: 30px;
      display: block;
      background: url("/images/imgdel.png") no-repeat center center;
      background-size: 80% auto;
      position: absolute;
      right: 0;
      top: 0;
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