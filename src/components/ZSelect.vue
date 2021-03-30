<template>
  <div class="z-select">
    <div class="z-input" @click="show = true">
      <input type="text" placeholder="请选择" v-model="selectvalue" readonly autocomplete="off">
      <i class="iconfont icon-jiantou-xia"></i>
    </div>
    <div class="z-select-dropdown z-popper" v-if="show">
      <div class="z-scrollbar">
        <div class="z-scrollbar__view z-select-dropdown__list"></div>
        <div class="z-select-option" v-for="item in options" :key="item.value" :class="{'active': item.value == value}" @click="select(item)">
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="z-popper_bg" v-if="show" @click="show=false"></div>
  </div>
</template>

<script>
export default{
  name: 'ZSelect',
  props: {
    value: [String, Number],
    options: Array
  },
  data () {
    return {
      show: false,
      selectvalue: ''
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
    select (item) {
      this.selectvalue = item.label
      this.$emit('input', item.value)
      this.show = false
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
    width: 80%;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
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
</style>