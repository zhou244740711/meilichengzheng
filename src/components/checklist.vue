<template>
  <div class="radiolist">
    <label class="radio row" v-for="(item, index) in options" :key="index">
      <input class="input-checked" v-model="datavalue" type="checkbox" :value="item.lable">
      <i class="checked"></i>
      <div class="col text row"><span>{{item.lable}}.</span> <div class="col" v-html="item.content"></div></div>
    </label>
  </div>
</template>

<script>

export default{
  name: 'CheckList',
  components: {
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
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
      width: 13px;
      height: 13px;
      border: 1px solid #999999;
      border-radius: 50%;
      margin-top: 4px;
      margin-right: 10px;
    }
    .input-checked:checked + .checked{
      width: 13px;
      height: 13px;
      background: #10A14C;
      border: 1px solid #10A14C;
    }
    .text{
      font-size: 13px;
      color: #666666;
    }
  }
}
</style>