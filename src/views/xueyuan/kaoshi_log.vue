<template>
  <div class="xueyuanindex clearfix">
    <div class="kaoshi_tip" style="text-align: left">满分 {{ logdata.totalScore}} 分，我的得分{{logdata.score}}分 </div>
    <div style="height: 37px;"></div>

    <div class="kaoshi_main">
      <div class="kaoshi_title">单选题</div>

      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in radioList" :key="index">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <radio-list v-model="item.value" :options="item.option" disabled></radio-list>
          <div class="row row-center"><div class="col">【本题{{item.score}}分】</div> <span>正确答案【{{item.selectvalue}}】<span :class="answerclass(item)">{{ answertext(item) }}</span></span></div>
        </div>
      </div>

      <div class="kaoshi_title">多选题</div>
      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in multipleList" :key="index">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <check-list v-model="item.value" :options="item.option" disabled></check-list>
          <div class="row row-center"><div class="col">【本题{{item.score}}分】</div> <span>正确答案【{{item.selectvalue}}】<span :class="answerclass(item)">{{ answertext(item) }}</span></span></div>
        </div>
      </div>

      <div class="kaoshi_title">判断题</div>
      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in estimateList" :key="index">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <panduan-list v-model="item.value" :options="item.option" disabled></panduan-list>
          <div class="row row-center"><div class="col">【本题{{item.score}}分】</div> <span>正确答案【{{item.selectvalue}}】<span :class="answerclass(item)">{{ answertext(item) }}</span></span></div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /
import RadioList from "../../components/radiolist";
import CheckList from "../../components/checklist";
import PanduanList from "../../components/Panduanlist";
// import { MessageBox } from 'mint-ui';

export default {
  name: 'MyClass',
  components: {
    PanduanList,
    CheckList,
    RadioList},
  data() {
    return {
      courseId: '',
      type: '',
      loading: false,
      pageSize: 15,
      page: 1,
      pageCount: 1,
      radioList: [],
      multipleList: [],
      estimateList: [],
      logdata: {}
    }
  },
  created: function () {
    this.courseId = this.$route.query.courseId
    this.type = this.$route.query.type
    this.GetQuestionLog()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    answerclass (item) {
      if (JSON.stringify(item.answer) === JSON.stringify(item.selectAnswer)) {
        return 'green'
      } else {
        return 'red'
      }
    },
    answertext (item) {
      if (JSON.stringify(item.answer) === JSON.stringify(item.selectAnswer)) {
        return '正确'
      } else {
        return '错误'
      }
    },
    GetQuestionLog () {
      this.radioList = []
      this.multipleList = []
      this.estimateList = []

      this.$http.get(`/api/Question/GetQuestionLog?CourseId=${this.courseId}`).then((res) => {
        if (res !== 500) {
          this.logdata = res
          res.log.forEach(e => {
            if (e.type == 1) {
              const data = e
              data.value = e.selectAnswer[0].answerOption
              data.selectvalue = e.answer[0].answerOption
              this.radioList.push(data)
            } else if (e.type == 2) {
              const data = e
              const valuelist = []
              const answervalue = []
              e.selectAnswer.forEach((a) => {
                valuelist.push(a.answerOption)
              })
              e.answer.forEach((a) => {
                answervalue.push(a.answerOption)
              })
              data.selectvalue = answervalue.join()
              data.value = valuelist
              this.multipleList.push(data)
            } else if (e.type == 3) {
              const data = e
              data.value = e.selectAnswer[0].answerOption
              data.selectvalue = e.answer[0].answerOption
              this.estimateList.push(data)
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
.red{
  color: #FD372D;
}
.green{
  color: #10A14C;
}
</style>