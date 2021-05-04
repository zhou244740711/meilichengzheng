<template>
  <div class="invoice" v-show="show">
    <div class="invoice_modal">
      <div class="invoice_header">填写发票</div>
      <div class="invoice_main">
        <div class="invoice_list">
          <div class="item row row-center" style="border-bottom: none;">
            <span class="title">发票类型：</span>
            <div class="col text">电子</div>
          </div>
          <div class="item">
            <mt-radio
                class="list_radio"
                v-model="invoicedata.invoiceType"
                :options="slist">
            </mt-radio>
          </div>
          <div class="item row row-center">
            <span class="title">邮箱*：</span>
            <input type="text" class="col input" v-model="invoicedata.email" placeholder="请填写邮箱" @blur.prevent="checkValue">
          </div>
          <div class="item row row-center">
            <span class="title">发票抬头*：</span>
            <input type="text" class="col input" v-model="invoicedata.invoiceHeader" placeholder="请填写发票抬头" @blur.prevent="checkValue">
          </div>
          <div class="item row row-center" v-show="invoicedata.invoiceType == 2">
            <span class="title">纳税人识别号：</span>
            <input type="text" class="col input" v-model="invoicedata.invoiceTaxpayer" placeholder="请填写纳税人识别号" @blur.prevent="checkValue">
          </div>
          <div class="item row row-center">
            <span class="title">发票内容：</span>
            <input type="text" class="col input" v-model="invoicedata.invoiceContent" placeholder="请填写发票内容" @blur.prevent="checkValue">
          </div>
        </div>

        <div class="z-button" @click="save()">保存</div>

      </div>
    </div>
    <div class="invoice_bg" @click="show = false"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'invoice',
  components: {},
  data() {
    return {
      show: false,
      invoicedata: {
        email: '',
        invoiceType: '1',
        invoiceHeader: '',
        invoiceTaxpayer: '',
        invoiceContent: '*现代服务*培训费'
      },
      slist: [
        {
          label: '个人',
          value: '1'
        },
        {
          label: '企业',
          value: '2'
        }
      ]
    }
  },
  created: function () {
    this.$wxShare.updateWxShareConfig({
      link: process.env.VUE_APP_BASE + '/login'
    });
  },
  methods: {
    checkValue () {
      this.inputBlur()
      this.$emit('checkValue')
    },
    showModal (invoicedata) {
      this.show = true
      if (localStorage.getItem('invoicedata')) {
        this.invoicedata = JSON.parse(localStorage.getItem('invoicedata'))
      }
      this.invoicedata = Object.assign(this.invoicedata, invoicedata)
    },
    save () {
      if (this.isnull(this.invoicedata.email)) {
        this.Toast({ message: '请填写邮箱',  duration: 2000})
        return
      }
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.invoicedata.email)) {
        this.Toast({ message: '邮件格式不正确',  duration: 2000})
        return
      }
      if (this.isnull(this.invoicedata.invoiceHeader)) {
        this.Toast({ message: '请填写发票抬头',  duration: 2000})
        return
      }
      if (this.invoicedata.invoiceType === '2') {
        if (this.isnull(this.invoicedata.invoiceTaxpayer)) {
          this.Toast({ message: '请填写纳税人识别号',  duration: 2000})
          return
        }
      }
      if (this.isnull(this.invoicedata.invoiceContent)) {
        this.Toast({ message: '请填写发票内容',  duration: 2000})
        return
      }
      localStorage.setItem('invoicedata', JSON.stringify(this.invoicedata))
      this.$emit('save', this.invoicedata)
      this.show = false
    }
  }
}
</script>

<style lang="less">
.invoice{
  .invoice_modal{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 20;
    background: #FFFFFF;
    .invoice_header{
      font-weight: 500;
      font-size: 16px;
      color: #333333;
      height: 45px;
      line-height: 45px;
      text-align: center;
    }
    .invoice_main{
      padding: 15px;

      .invoice_list{
        .item{
          border-bottom: solid 1px #EEEEEE;
          height: 40px;
          line-height: 40px;
          overflow: hidden;

          .title{
            white-space: nowrap;
            margin-right: 15px;
            width: 100px;
          }
          .z-select{
            width: auto;
          }
          .list_radio{
            height: 40px;
            padding: 0;

            .mint-cell-wrapper{
              height: 40px;
              line-height: 40px;
            }
          }
        }
      }
      .z-button{
        background: linear-gradient(146deg, #10A14C 0%, #50D08F 100%);
        border-radius: 22px;
        height: 44px;
        line-height: 44px;
        font-size: 20px;
        text-align: center;
        margin: 15px 20px;
      }
    }
  }
  .invoice_bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>