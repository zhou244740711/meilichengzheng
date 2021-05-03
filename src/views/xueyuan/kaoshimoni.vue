<template>
  <div class="xueyuanindex clearfix">
    <div class="kaoshi_tip"><img src="images/daojishi.png" alt="">考试倒计时 {{countDown(endDate)}}</div>
    <div style="height: 37px;"></div>

    <div class="kaoshi_main" v-show="isreqursting">
      <div class="kaoshi_title">单选题</div>

      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in radioList" :key="item.id">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <radio-list v-model="item.value" :options="item.option"></radio-list>
          <p class="score">【本题{{item.score}}分】</p>
        </div>
      </div>

      <div class="kaoshi_title">多选题</div>
      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in multipleList" :key="item.id">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <check-list v-model="item.value" :options="item.option"></check-list>
          <p class="score">【本题{{item.score}}分】</p>
        </div>
      </div>

      <div class="kaoshi_title">判断题</div>
      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in estimateList" :key="item.id">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <panduan-list v-model="item.value" :options="item.option"></panduan-list>
          <p class="score">【本题{{item.score}}分】</p>
        </div>
      </div>

      <div class="bottombtn" @click="handlepost()">提交</div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /
import moment from 'moment'
import RadioList from "../../components/radiolist";
import CheckList from "../../components/checklist";
import PanduanList from "../../components/Panduanlist";
import { MessageBox } from 'mint-ui';

export default {
  name: 'MyClass',
  components: {
    PanduanList,
    CheckList,
    RadioList},
  data() {
    return {
      id: '',
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      radioList: [],
      multipleList: [],
      estimateList: [],
      timeobj: '',
      now: moment(),
      endDate: '',
      isreqursting: false
    }
  },
  created: function () {
    this.id = this.$route.query.id
    this.endDate = moment().add(30, 'm')
    this.getClass()
    this.timeobj = setInterval(()=>{
      this.now = moment()
    },1000)
  },
  computed: {
    //计算属性，返回剩余时间
    countDown(){
      return function(endDate) {
        let m1 = this.now
        let m2 = moment(endDate)
        var du = moment.duration(m2 - m1, 'ms'),
            hours = du.get('hours'),
            mins = du.get('minutes'),
            ss = du.get('seconds');
        if(hours<=0 && mins<=0 && ss<=0) {
          return "已超时"
        }else {
          return this.PrefixInteger(hours,2) + ':' + this.PrefixInteger(mins,2) + ':' + this.PrefixInteger(ss,2)
        }
      }
    }
  },
  watch: {
    countDown (n) {
      if (n === '已超时') {
        clearInterval(this.timeobj)
        this.handlepost(2)
      }
    }
  },
  methods: {
    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    getClass () {
      this.$http.get(`/api/MockExam/GetCourseQuestionList?EId=${this.id}`).then((res) => {
        if (res !== 500) {
          this.radioList = res.radioList
          this.multipleList = res.multipleList
          this.estimateList = res.estimateList
        }
      }).finally(() => {
        this.isreqursting = true
      })
    },
    handlepost (t) {
      MessageBox.confirm('确认提交').then(action => {
        if (action) {
          const answer = []
          this.radioList.forEach(e => {
            const lable = e.value || ''
            answer.push({
              questionId: e.id,
              lable: [lable]
            })
          })
          this.multipleList.forEach(e => {
            const lable = e.value || ''
            answer.push({
              questionId: e.id,
              lable: lable
            })
          })
          this.estimateList.forEach(e => {
            const lable = e.value || ''
            answer.push({
              questionId: e.id,
              lable: [lable]
            })
          })

          const option = {
            eId: this.id,
            answer: answer
          }
          this.$http.post(`/api/MockExam/SaveQuestion`, option).then((res) => {
            if (res !== 500) {
              this.GetQuestionLog(t)
            }
          })
        }
      });
    },
    GetQuestionLog (t) {
      this.$http.get(`/api/MockExam/GetQuestionLog?EId=${this.id}`).then((res) => {
        if (res !== 500) {
          let message = ''
          if (t === 2) {
            if (res.status === 1) {
              message = `<p>考试时间已结束，恭喜您考试已通过</p><p>您的成绩是:${res.score}分</p>`
            } else {
              message = `<p>考试时间已结束，很遗憾您考试未及格</p><p>您的成绩是:${res.score}分</p>`
            }
          } else {
            if (res.status === 1) {
              message = `<p>恭喜您考试已通过</p><p>您的成绩是:${res.score}分</p>`
            } else {
              message = `<p>很遗憾您考试未及格</p><p>您的成绩是:${res.score}分</p>`
            }
          }
          MessageBox({
            message: message,
            confirmButtonText: '确定',
            showCancelButton: false
          }).then(action => {
            if (action === 'confirm') {
              this.$router.go(-1)
            }
          })
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.Stadyend_header /deep/ .z-input{
  border: none;
  height: 70px;
  line-height: 70px;
  input{
    color: #000;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>