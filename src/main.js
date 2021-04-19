import Vue from 'vue'
import App from './App.vue'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import router from './router'
import './plugins/common'
import moment from 'moment'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

import httpRequest from "./plugins/axios";
Vue.prototype.$http = httpRequest
Vue.prototype.Toast = Mint.Toast

Vue.use(VideoPlayer)
Vue.config.productionTip = false
Vue.use(Mint);
Vue.use(moment)

const nowtime = new Date().getTime();
if (localStorage.tokensavetime && (parseInt(nowtime) - parseInt(localStorage.tokensavetime))/86400000 > 30){
  // this.Toast('token时间已过期，请重新登陆')
  // localStorage.clear()
  localStorage.removeItem('tokensavetime')
  localStorage.removeItem('token')
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
