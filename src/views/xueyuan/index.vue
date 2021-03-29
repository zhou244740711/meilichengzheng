<template>
  <div class="xueyuanindex">
    <div class="xueyuanindex_header">
      <img src="images/Mask@2x.png" alt="">
    </div>
    <div class="xueyuan_header2">
      <div class="xueyuan_header2_select">
        <select>
          <option value="">2021年度课程</option>
          <option value="">2021年度课程2232244244</option>
        </select>
      </div>
      <div class="row row-center xueyuan_header2_navbox">
        <div class="col navselect">
          <select>
            <option value="">请选择</option>
          </select>
        </div>
        <div class="col navselect">
          <select>
            <option value="">请选择</option>
          </select>
        </div>
        <div class="col navselect">
          <select>
            <option value="">请选择</option>
          </select>
        </div>
      </div>
    </div>
    <div class="noclass">
      <img src="images/wu1@2x.png" alt="">
      <p>请选择课程</p>
    </div>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        <img slot="icon" src="images/shouye@2x.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="tab2">
        <img slot="icon" src="images/gouwuche@2x.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="tab3">
        <img slot="icon" src="images/wode@2x.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
      selected: ''
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>
