<template>
  <div class="radiolist">
    <label class="radio row" v-for="(item, index) in options" :key="index">
      <input class="input-checked" v-model="datavalue" type="radio" :value="item.lable" :disabled="disabled">
      <i class="checked"></i>
      <div class="col text row"><span>{{item.lable}}.</span> <div class="col" v-html="item.content"></div></div>
    </label>
  </div>
</template>

<script>

export default{
  name: 'RadioList',
  components: {
  },
  props: {
    disabled: [String,Boolean],
    value: {
      type: [String, Number],
      default: () => {
        return ''
      }
    },
    options: Array,
  },
  data () {
    return {
      datavalue: this.value
    }
  },
  watch: {
    datavalue (d) {
      this.$emit('input', d)
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
.radiolist{
  padding: 10px;
  .radio{
    margin-bottom: 5px;
    .input-checked{
      display: none;
    }
    .input-checked + .checked{
      width: 16px;
      height: 16px;
      margin-right: 10px;
      background: url("/images/select2@2x.png") no-repeat center center;
      background-size: 100%;
    }
    .input-checked:checked + .checked{
      background: url("/images/select@2x.png") no-repeat center center;
      background-size: 100%;
    }
    .text{
      font-size: 13px;
      color: #666666;
    }
  }
}
</style>