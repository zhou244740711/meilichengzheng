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
import './plugins/wxShare';

Vue.prototype.$http = httpRequest
Vue.prototype.Toast = Mint.Toast

Vue.use(VideoPlayer)
Vue.config.productionTip = false
Vue.use(Mint);
Vue.use(moment)

const nowtime = new Date().getTime();
if (localStorage.getItem('tokensavetime') && (parseInt(nowtime) - parseInt(localStorage.getItem('tokensavetime')))/86400000 > 30){
  // this.Toast('token时间已过期，请重新登陆')
  // localStorage.clear()
  localStorage.removeItem('tokensavetime')
  localStorage.removeItem('token')
}
window.addEventListener('pageshow', function(e) {
  // https://developer.mozilla.org/zh-CN/docs/Web/Events/pageshow
  // 表示网页是否是来自缓存.
  if (e.persisted) {
    location.reload();
  }
});

document.querySelector('body').addEventListener('touchstart', function (ev) {
  ev.preventDefault();
});

// wx.config({
//   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: '', // 必填，企业号的唯一标识，此处填写企业号corpid
//   timestamp: , // 必填，生成签名的时间戳
//   nonceStr: '', // 必填，生成签名的随机串
//   signature: '',// 必填，签名，见附录1
//   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
