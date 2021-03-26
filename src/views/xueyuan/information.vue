<template>
  <div class="information_list">
    <div class="item row row-center">
      <span class="title">姓名</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入姓名">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">性别</span>
      <div class="col">
        <mt-radio :options="['男', '女']" class="list_radio"></mt-radio>
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">出生年月</span>
      <div class="col">
        <input class="input" type="date" placeholder="请选择出生年月">
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">身份证号</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入身份证号">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">手机号</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入手机号">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">政治面貌</span>
      <div class="col">
        <select class="input" dir="rtl">
          <option value="">请选择政治面貌</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">最高学历</span>
      <div class="col">
        <select class="input" dir="rtl">
          <option value="">请选择最高学历</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">专业系列</span>
      <div class="col">
        <select class="input" dir="rtl">
          <option value="">请选择专业</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">职称级别</span>
      <div class="col">
        <select class="input" dir="rtl">
          <option value="">请选择职称级别</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">职务</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入职务">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">社会信用代码</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入社会信用代码">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">工作单位</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入工作单位">
      </div>
    </div>
    <div class="login_btn" style="margin-top: 5vh;">完成</div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Help',
  data() {
    return {
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>
