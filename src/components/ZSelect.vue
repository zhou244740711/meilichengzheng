<template>
  <div class="z-select">
    <div class="z-input" @click="showpopper">
<!--      <input type="text" placeholder="请选择" v-model="selectvalue" readonly autocomplete="off">-->
      <div class="text" :class="isnull(selectvalue)?'null':''">{{isnull(selectvalue)?'请选择':selectvalue}}</div>
      <i class="iconfont icon-jiantou-xia"></i>
    </div>
    <div class="z-select-dropdown z-popper" v-if="show">
      <div class="btnbox row row-center">
        <span class="cancel" @click="scrControl(1);show = false">取消</span>
        <div class="col"></div>
        <span class="ok" @click="select()">确认</span>
      </div>
      <div class="z-scrollbar">
        <div class="z-scrollbar__view z-select-dropdown__list">
          <picker :slots="slots" :valueKey="key" @change="onValuesChange"></picker>
        </div>
<!--        <div class="z-select-option" v-for="item in options" :key="item.value" :class="{'active': item.value == value}" @click="select(item)">-->
<!--          <span>{{ item.label }}</span>-->
<!--        </div>-->
      </div>
    </div>
    <div class="z-popper_bg" v-if="show" @click="scrControl(1);show=false"></div>
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
          textAlign: 'center',
          defaultIndex: 0
        }
      ],
      key: this.labelkey
    }
  },
  watch: {
    value (newdata) {
      console.log(newdata)
      if (newdata === '') {
        this.selectvalue = ''
      } else {
        this.initvalue(newdata)
      }
    },
    labelkey (newdata) {
      this.key = newdata
    },
    options (newdata, olddata) {
      // console.log(newdata)
      if (newdata !== olddata) {
        if (newdata.length <= 0) {
          this.selectvalue = ''
          // this.$set(this.slots[0], 'defaultIndex', 0)
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
    bodyScroll (event) {
      event.preventDefault()
    },
    scrControl (t) {
      if(t == 0){ // 禁止滚动
        document.body.addEventListener('touchmove', this.bodyScroll, { passive: false });
      }else if( t == 1){ // 开启滚动
        document.body.removeEventListener('touchmove',this.bodyScroll, {passive: false});
      }
    },
    initvalue (newdata) {
      this.options.forEach((e, i) => {
        if (e[this.valuekey] === newdata) {
          this.selectvalue = e[this.key]
          this.$set(this.slots[0], 'defaultIndex', i)
        }
      })
    },
    showpopper () {
      if (this.options.length > 0) {
        this.show = true
        this.scrControl(0)
      } else {
        this.Toast({
          message: '暂无数据',
          duration: 2000
        })
      }
    },
    select () {
      this.selectvalue = this.changedata[this.key]
      this.$emit('input', this.changedata[this.valuekey])
      this.$emit('change', this.changedata)
      this.show = false
      this.scrControl(1)
    },
    onValuesChange (picker, values) {
      this.changedata = values[0]
    }
  }
}
</script>
