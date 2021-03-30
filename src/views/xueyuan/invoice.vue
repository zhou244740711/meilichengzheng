<template>
  <div class="invoice" v-show="show">
    <div class="invoice_modal">
      <div class="invoice_header">填写发票</div>
      <div class="invoice_main">
        <div class="invoice_list">
          <div class="item row row-center">
            <span class="title">发票类型：</span>
            <z-select class="col noborder" v-model="invoicedata.type" :options="typelist"></z-select>
          </div>
          <div class="item">
            <mt-radio
                class="list_radio"
                v-model="invoicedata.stype"
                :options="slist">
            </mt-radio>
          </div>
          <div class="item row row-center">
            <span class="title">发票抬头*：</span>
            <input type="text" class="col input">
          </div>
          <div class="item row row-center">
            <span class="title">纳税人识别号：</span>
            <input type="text" class="col input">
          </div>
          <div class="item row row-center">
            <span class="title">发票内容：</span>
            <input type="text" class="col input">
          </div>
        </div>

        <div class="z-button">保存</div>

      </div>
    </div>
    <div class="invoice_bg" @click="show = false"></div>
  </div>
</template>

<script>
// @ is an alias to /src

import ZSelect from "../../components/ZSelect";
export default {
  name: 'invoice',
  components: {ZSelect},
  data() {
    return {
      show: false,
      invoicedata: {
        type: '电子'
      },
      slist: ['个人', '企业'],
      typelist: [
        {
          label: '电子',
          value: '电子'
        }
      ]
    }
  },
  created: function () {
  },
  methods: {
    showModal () {
      this.show = true
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

          .title{
            white-space: nowrap;
            margin-right: 15px;
            width: 100px;
          }
          .z-select{
            width: auto;
          }
          .list_radio{
            padding: 10px 0;
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