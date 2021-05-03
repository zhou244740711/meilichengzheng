<template>
  <div class="information_list">
    <div class="item row row-center">
      <span class="title">姓名</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入姓名" v-model="infodata.name">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">性别</span>
      <div class="col">
        <mt-radio :options="sexlist" class="list_radio" v-model="infodata.sex"></mt-radio>
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">出生年月</span>
      <div class="col">
        <input class="input" type="date" placeholder="请选择出生年月" v-model="infodata.birth">
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">身份证号</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入身份证号" v-model="infodata.identityCard" disabled>
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">手机号</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入手机号" v-model="infodata.phone" disabled>
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">政治面貌</span>
      <div class="col">
        <select class="input" dir="rtl" v-model="infodata.politicsStatus">
          <option value="">未选择</option>
          <option value="中共党员" selected="">中共党员</option>
          <option value="中共预备党员">中共预备党员</option>
          <option value="共青团员">共青团员</option>
          <option value="民革会员">民革会员</option>
          <option value="民盟盟员">民盟盟员</option>
          <option value="民建会员">民建会员</option>
          <option value="民进会员">民进会员</option>
          <option value="农工党党员">农工党党员</option>
          <option value="致公党党员">致公党党员</option>
          <option value="九三学社社员">九三学社社员</option>
          <option value="台盟盟员">台盟盟员</option>
          <option value="无党派民主人士">无党派民主人士</option>
          <option value="群众">群众</option>
          <option value="民主党派">民主党派</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">最高学历</span>
      <div class="col">
        <select class="input" dir="rtl" v-model="infodata.maxEducation">
          <option value="">未选择</option>
          <option value="研究生教育" selected="">研究生教育</option>
          <option value="博士研究生毕业">博士研究生毕业</option>
          <option value="博士研究生结业">博士研究生结业</option>
          <option value="博士研究生肄业">博士研究生肄业</option>
          <option value="硕士研究生毕业">硕士研究生毕业</option>
          <option value="硕士研究生结业">硕士研究生结业</option>
          <option value="硕士研究生肄业">硕士研究生肄业</option>
          <option value="研究生班毕业">研究生班毕业</option>
          <option value="研究生班结业">研究生班结业</option>
          <option value="研究生班肄业">研究生班肄业</option>
          <option value="大学本科教育">大学本科教育</option>
          <option value="大学本科毕业">大学本科毕业</option>
          <option value="大学本科结业">大学本科结业</option>
          <option value="大学本科肄业">大学本科肄业</option>
          <option value="大学普通班毕业">大学普通班毕业</option>
          <option value="大学专科教育">大学专科教育</option>
          <option value="大学专科毕业">大学专科毕业</option>
          <option value="大学专科结业">大学专科结业</option>
          <option value="大学专科肄业">大学专科肄业</option>
          <option value="中等职业教育">中等职业教育</option>
          <option value="中等专科毕业">中等专科毕业</option>
          <option value="中等专科结业">中等专科结业</option>
          <option value="中等专科肄业">中等专科肄业</option>
          <option value="职业高中毕业">职业高中毕业</option>
          <option value="职业高中结业">职业高中结业</option>
          <option value="职业高中肄业">职业高中肄业</option>
          <option value="技工学校毕业">技工学校毕业</option>
          <option value="技工学校结业">技工学校结业</option>
          <option value="技工学校肄业">技工学校肄业</option>
          <option value="高中以下">高中以下</option>
          <option value="普通高级中学教育">普通高级中学教育</option>
          <option value="普通高中毕业">普通高中毕业</option>
          <option value="普通高中结业">普通高中结业</option>
          <option value="普通高中肄业">普通高中肄业</option>
          <option value="其他">其他</option>
          <option value="中等师范学校毕业">中等师范学校毕业</option>
          <option value="中等师范学校结业">中等师范学校结业</option>
          <option value="中等师范学校肄业">中等师范学校肄业</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">专业系列</span>
      <div class="col">
        <select class="input" dir="rtl" v-model="infodata.professionalSeries">
          <option value="">未选择</option>
          <option value="工程勘察（测量）" selected="">工程勘察（测量）</option>
          <option value="建筑设计">建筑设计</option>
          <option value="城乡规划">城乡规划</option>
          <option value="岩土工程">岩土工程</option>
          <option value="给排水">给排水</option>
          <option value="暖通工程">暖通工程</option>
          <option value="建筑工程管理">建筑工程管理</option>
          <option value="建筑施工">建筑施工</option>
          <option value="建筑电气（含建筑智能化）">建筑电气（含建筑智能化）</option>
          <option value="建筑结构">建筑结构</option>
          <option value="建筑装饰">建筑装饰</option>
          <option value="建筑机械">建筑机械</option>
          <option value="建筑材料">建筑材料</option>
          <option value="风景园林（含景观设计）">风景园林（含景观设计）</option>
          <option value="工程造价">工程造价</option>
          <option value="市政道路（桥梁）">市政道路（桥梁）</option>
          <option value="燃气工程">燃气工程</option>
          <option value="白蚁防治">白蚁防治</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">职称级别</span>
      <div class="col">
        <select class="input" dir="rtl" v-model="infodata.positionLevel">
          <option value="">未选择</option>
          <option value="教授级高级工程师">教授级高级工程师</option>
          <option value="高级工程师" selected="">高级工程师</option>
          <option value="工程师">工程师</option>
          <option value="助理工程师">助理工程师</option>
          <option value="技术员">技术员</option>
        </select>
      </div>
      <i class="iconfont icon-jiantou-you"></i>
    </div>
    <div class="item row row-center">
      <span class="title">职务</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入职务" v-model="infodata.duty">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">社会信用代码</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入社会信用代码" v-model="infodata.creditCode">
      </div>
    </div>
    <div class="item row row-center">
      <span class="title">工作单位</span>
      <div class="col">
        <input class="input" type="text" placeholder="请输入工作单位" v-model="infodata.orgs">
      </div>
    </div>
    <div class="item" style="height: auto;">
      <span class="title">上传照片</span>
      <img-upload ref="imgupload" :imglist="infodata.photo" :max-length="1"></img-upload>
    </div>
    <div class="login_btn" style="margin-top: 5vh;" @click="handlesubmit">完成</div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment'
import ImgUpload from "../../components/imgupload";
export default {
  name: 'Help',
  components: { ImgUpload},
  data() {
    return {
      infodata: {},
      sexlist: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ]
    }
  },
  created: function () {
    this.getmsg()
  },
  methods: {
    getmsg () {
      this.$http.get('/api/Account/GetCurrentAccount').then((res) => {
        this.infodata = res
        this.infodata.sex = this.infodata.sex.toString()
        this.infodata.birth = moment(this.infodata.birth).format('YYYY-MM-DD')
      })
    },
    // 提交
    handlesubmit() {
      if(this.infodata.name === ''){
        this.Toast("请输入姓名");
        return false;
      }
      if(this.isnull(this.infodata.sex)){
        this.Toast("请选择性别");
        return false;
      }
      if(this.isnull(this.infodata.birth)){
        this.Toast("请选择出生年月");
        return false;
      }
      if(this.isnull(this.infodata.identityCard)){
        this.Toast("请输入身份证号");
        return false;
      }
      if(!(/\d{15}(\d\d[0-9xX])?/.test(this.infodata.identityCard))){
        this.Toast("请输入正确的身份证号");
        return false;
      }
      if(this.isnull(this.infodata.phone)){
        this.Toast("请输入手机号");
        return false;
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.infodata.phone))){
        this.Toast("请输入正确的手机号");
        return false;
      }
      if(this.isnull(this.infodata.politicsStatus)){
        this.Toast("请选择政治面貌");
        return false;
      }
      if(this.isnull(this.infodata.maxEducation)){
        this.Toast("请选择最高学历");
        return false;
      }
      if(this.isnull(this.infodata.professionalSeries)){
        this.Toast("请选择专业系列");
        return false;
      }
      if(this.isnull(this.infodata.positionLevel)){
        this.Toast("请选择职称级别");
        return false;
      }
      if(this.isnull(this.infodata.duty)){
        this.Toast("请输入职务");
        return false;
      }
      if(this.isnull(this.infodata.creditCode)){
        this.Toast("请输入社会信用代码");
        return false;
      }
      if(this.isnull(this.infodata.orgs)){
        this.Toast("请输入工作单位");
        return false;
      }
      let paoto = this.$refs.imgupload.list
      if (paoto.length <= 0) {
        this.Toast("请上传图片");
        return false;
      }
      this.infodata.photo = paoto.join(',')

      this.$http.post('/api/Account/UpdateAccountInfo', this.infodata).then((res) => {
        if (res !== 500) {
          this.Toast("保存成功");
          this.$router.push({name: 'xueyuanindex'})
        }
      })
    }
  }
}
</script>
