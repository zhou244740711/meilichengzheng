<template>
  <div class="z-select">
    <div class="z-input" @click="showpopper">
      <input type="text" placeholder="请选择" v-model="selectvalue" readonly autocomplete="off">
      <i class="iconfont icon-jiantou-xia"></i>
    </div>
    <div class="z-select-dropdown z-popper" v-if="show">
      <div class="btnbox row row-center">
        <span class="cancel" @click="show = false">取消</span>
        <div class="col"></div>
        <span class="ok" @click="select()">确认</span>
      </div>
      <div class="z-scrollbar">
        <div class="z-scrollbar__view z-select-dropdown__list">
          <picker :slots="slots" valueKey="value" @change="onValuesChange"></picker>
        </div>
<!--        <div class="z-select-option" v-for="item in options" :key="item.value" :class="{'active': item.value == value}" @click="select(item)">-->
<!--          <span>{{ item.label }}</span>-->
<!--        </div>-->
      </div>
    </div>
    <div class="z-popper_bg" v-if="show" @click="show=false"></div>
  </div>
</template>

<script>
import { Picker } from 'mint-ui';

export default{
  name: 'ZSelect',
  components: {
    Picker
  },
  props: {
    value: [String, Number],
    options: Array
  },
  data () {
    return {
      show: false,
      selectvalue: '',
      changedata: '',
      slots: [
        {
          flex: 1,
          values: this.options,
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  watch: {
    value (newdata) {
      this.initvalue(newdata)
    }
  },
  mounted () {
    this.initvalue(this.value)
  },
  methods: {
    initvalue (newdata) {
      this.options.forEach(e => {
        if (e.value === newdata) {
          this.selectvalue = e.label
        }
      })
    },
    showpopper () {
      if (this.options.length > 0) {
        this.show = true
      } else {
        this.Toast('暂无数据')
      }
    },
    select () {
      this.selectvalue = this.changedata.label
      this.$emit('input', this.changedata.value)
      this.show = false
    },
    onValuesChange (picker, values) {
      this.changedata = values[0]
    }
  }
}
</script>

<style lang="less" scoped>
  .z-select{
    width: 100%;

    .z-input{
      height: 35px;
      line-height: 35px;
      border: 1px solid #dcdfe6;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding: 0 10px;

      input{
        flex: 1;
        height: 35px;
        line-height: 35px;
        border: none;
        cursor: pointer;
      }
    }

    .z-select-option{
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      color: #606266;
      text-align: center;
    }
    .z-select-option +
    .z-select-option{
      border-top: solid 1px #dcdfe6;
    }
    .z-select-option.active{
      font-weight: bold;
      color: #1a69c1;
    }
  }

  .z-popper{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 40;
    max-height: 60%;
    background: #ffffff;
    border-radius: 5px;

    .z-scrollbar{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-scrolling: touch;
      -webkit-overflow-scrolling: touch;
    }
  }
  .z-popper_bg{
    position: fixed;
    background: rgba(0,0,0,0.2);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 30;
  }
  .z-select-dropdown__list{
    padding: 5px 0;
  }
  .z-select-dropdown{
    .btnbox{
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
      background: #F7F7F7;;
      font-size: 14px;

      .cancel{
        color: #999999;
      }
      .ok{
        color: #10A14C;
      }
    }
  }
</style>