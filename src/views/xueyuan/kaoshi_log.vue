<template>
  <div class="xueyuanindex clearfix">
    <div class="kaoshi_tip">满分 {{ totalScore}} </div>
    <div style="height: 37px;"></div>

    <div class="kaoshi_main">
      <div class="kaoshi_title">单选题</div>

      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in radioList" :key="index">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <radio-list v-model="item.selectAnswer" :options="item.option" disabled></radio-list>
          <div class="score row row-center"><div class="col">【本题{{item.score}}分】</div> <span>正确答案【A】<span>错误</span></span></div>
        </div>
      </div>

      <div class="kaoshi_title">多选题</div>
      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in multipleList" :key="index">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <check-list v-model="item.selectAnswer" :options="item.option" disabled></check-list>
          <div class="score row row-center"><div class="col">【本题{{item.score}}分】</div> <span>正确答案【A】<span>错误</span></span></div>
        </div>
      </div>

      <div class="kaoshi_title">判断题</div>
      <div class="kaoshi_list">
        <div class="item" v-for="(item, index) in estimateList" :key="index">
          <div class="title row"><span>{{index+1}}.</span> <div class="col" v-html="item.name"></div></div>
          <panduan-list v-model="item.selectAnswer" :options="item.option" disabled></panduan-list>
          <div class="score row row-center"><div class="col">【本题{{item.score}}分】</div> <span>正确答案【A】<span>错误</span></span></div>
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
import { MessageBox } from 'mint-ui';

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
    }
  },
  created: function () {
    this.courseId = this.$route.query.courseId
    this.type = this.$route.query.type
    this.getClass()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    GetQuestionLog () {
      this.radioList = []
      this.multipleList = []
      this.estimateList = []

      this.$http.get(`/api/Question/GetQuestionLog?CourseId=${this.courseId}`).then((res) => {
        if (res !== 500) {
          res.log.forEach(e => {
            if (e.type == 1) {
              this.radioList.push(e)
            } else if (e.type == 2) {
              this.multipleList.push(e)
            } else if (e.type == 3) {
              this.estimateList.push(e)
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