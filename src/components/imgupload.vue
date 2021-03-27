<template>
  <div class="z-uploader">
    <div class="z-upload" v-for="(item,index) in list">
      <div class="z-upload-del" @click="del(item,index)"></div>
      <div class="z-upload-img" :style="returnimg(item)"></div>
    </div>
    <div class="z-upload" @click="addimg()">
      <label class="z-upload-img z-upload-addbox">
        <input type="file">
      </label>
    </div>
  </div>
</template>

<script>
export default{
  name: 'textscroll',
  data () {
    return {
      list: []
    }
  },
  mounted () {
  },
  methods:{
  }
}
</script>

<style lang="less">

</style>