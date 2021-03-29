import Vue from 'vue'
import App from './App.vue'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import router from './router'
import './plugins/common'
import moment from 'moment'

//  全局过滤器 时间戳
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
})

import httpRequest from "./plugins/axios";
Vue.prototype.$http = httpRequest
Vue.prototype.Toast = Mint.Toast

Vue.config.productionTip = false
Vue.use(Mint);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
