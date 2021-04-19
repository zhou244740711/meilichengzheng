<template>
  <div>
    <div class="text" @click="show=true" :style="{'color':  valuenull?'':'#333'}">{{ valuenull?'省市区县、乡镇等':temp.province + ' ' + temp.city + ' ' + temp.area }}</div>
    <div class="choseplace" v-show="show">
      <v-distpicker type="mobile" :province="temp.province" :city="temp.city" :area="temp.area" @selected="onSelected"></v-distpicker>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  name: 'ChosePlace',
  props: {
    value: String
  },
  components: { VDistpicker },
  data() {
    return {
      temp: {
        province: '',
        city: '',
        area: '',
      },
      show: ''
    }
  },
  computed: {
    valuenull () {
      let t = false
      if (this.temp.province === '' && this.temp.city === '' && this.temp.area === '') {
        t = true
      }
      return t
    }
  },
  watch: {
    value (newdata) {
      const l = newdata.split(' ')
      console.log(l)
      this.temp.province = l[0]
      this.temp.city = l[1]
      this.temp.area = l[2]
    }
  },
  created () {
    // if (!this.isnull(this.value)) {
    //   const l = this.value.split(' ')
    //   console.log(l)
    //   this.temp.province = l[0]
    //   this.temp.city = l[1]
    //   this.temp.area = l[2]
    // }
  },
  methods: {
    onSelected (e) {
      this.temp.province = e.province.value
      this.temp.city = e.city.value
      this.temp.area = e.area.value
      this.$emit('input', this.temp.province + ' ' + this.temp.city + ' ' + this.temp.area)
      this.show = false
    }
  }
}
</script>

<style>
.choseplace {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  background: #FFFFFF;
  z-index: 30;
}
</style>
