<template>
  <div style="background: #f7f7f7">
    <div class="addressedit_list">
      <div class="item row row-center">
        <span class="title">收货人</span>
        <div class="col">
          <input class="input" type="text" placeholder="请输入收货人姓名" v-model="infodata.name" @blur.prevent="checkValue">
        </div>
      </div>
      <div class="item row row-center">
        <span class="title">手机号码</span>
        <div class="col">
          <input class="input" type="text" placeholder="请输入收货人手机号" v-model="infodata.phone" @blur.prevent="checkValue">
        </div>
      </div>
      <div class="item row row-center">
        <span class="title">选择地址</span>
        <div class="col greg9">
          <chose-place v-model="infodata.provinces"></chose-place>
        </div>
        <i class="iconfont icon-jiantou-you"></i>
      </div>
      <div class="item row row-center">
        <span class="title">详细地址</span>
        <div class="col">
          <input class="input" type="text" placeholder="街道、楼牌号等" v-model="infodata.address" @blur.prevent="checkValue">
        </div>
      </div>
    </div>
    <div class="information_list" style="margin-top: 20px;">
      <div class="item row row-center">
        <span class="title">设为默认地址</span>
        <div class="col"></div>
        <mt-switch v-model="infodata.isDefault"></mt-switch>
      </div>
    </div>

    <div class="login_btn" style="margin-top: 5vh;" @click="handlesubmit">完成</div>
  </div>
</template>

<script>
// @ is an alias to /src

import ChosePlace from "../../components/choseplace";
export default {
  name: 'addressAdd',
  components: {ChosePlace},
  data() {
    return {
      isadd: true,
      courseId: '',
      infodata: {}
    }
  },
  created: function () {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId
    }
    if (this.$route.query.id) {
      this.isadd = false
      this.getAddressDetail(this.$route.query.id)
    }
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  methods: {
    checkValue () {
      this.inputBlur()
      this.$emit('checkValue')
    },
    getAddressDetail (id) {
      this.$http.get(`/api/My/AddressDetail?Id=${id}`).then((res) => {
        if (res !== 500) {
          this.infodata = res
        }
      })
    },
    handlesubmit () {
      if (this.isnull(this.infodata.name)) {
        this.Toast({
          message: "请填写收货人姓名",
          duration: 2000
        });
        return
      }
      if (this.isnull(this.infodata.phone)) {
        this.Toast({
          message: "请填写收货人手机号",
          duration: 2000
        });
        return
      }
      if (this.isnull(this.infodata.provinces)) {
        this.Toast({
          message: "请选择地址",
          duration: 2000
        });
        return
      }
      if (this.isnull(this.infodata.address)) {
        this.Toast({
          message: "请填写详细地址",
          duration: 2000
        });
        return
      }
      this.$http.post(`/api/My/AddOrEditAddress`, this.infodata).then((res) => {
        if (res !== 500) {
          if (this.isadd) {
            this.Toast({
              message: "地址新增成功",
              duration: 2000
            });
          } else {
            this.Toast({
              message: "地址修改成功",
              duration: 2000
            });
          }
        }
      }).finally(() => {
        if (this.courseId !== '') {
          this.$router.push({name: 'choseaddress', query: {courseId: this.courseId}})
        } else {
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
