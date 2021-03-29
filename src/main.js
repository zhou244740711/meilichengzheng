import Vue from 'vue'
import App from './App.vue'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import router from './router'
import './plugins/common'
import moment from 'moment'
import VueCoreVideoPlayer from 'vue-core-video-player'

import httpRequest from "./plugins/axios";
Vue.prototype.$http = httpRequest
Vue.prototype.Toast = Mint.Toast

Vue.config.productionTip = false
Vue.use(Mint);
Vue.use(moment)
Vue.use(VueCoreVideoPlayer)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
