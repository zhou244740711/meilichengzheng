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
          <picker :slots="slots" :valueKey="key" defaultIndex="defaultIndex" @change="onValuesChange"></picker>
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
    options: Array,
    labelkey: {
      type: [String, Number],
      default: 'name'
    },
    valuekey: {
      type: [String, Number],
      default: 'value'
    }
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
      ],
      key: this.labelkey,
      defaultIndex: 0
    }
  },
  watch: {
    value (newdata) {
      this.initvalue(newdata)
    },
    labelkey (newdata) {
      this.key = newdata
    },
    options (newdata, olddata) {
      console.log(newdata)
      if (newdata !== olddata) {
        if (newdata.length <= 0) {
          this.selectvalue = ''
          this.defaultIndex = 0
          return
        }
        this.slots[0].values = newdata
      }
    }
  },
  mounted () {
    this.initvalue(this.value)
  },
  methods: {
    initvalue (newdata) {
      this.options.forEach((e, i) => {
        if (e.value === newdata) {
          this.selectvalue = e[this.key]
          this.defaultIndex = i
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
      this.selectvalue = this.changedata[this.key]
      this.$emit('input', this.changedata.value)
      this.$emit('change', this.changedata)
      this.show = false
    },
    onValuesChange (picker, values) {
      this.changedata = values[0]
    }
  }
}
</script>
