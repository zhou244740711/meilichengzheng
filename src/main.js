import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import Mint from 'mint-ui';
import router from './router'

// import axios from "./plugins/axios";
import axios from 'axios'
Vue.prototype.$http = axios


Vue.config.productionTip = false
Vue.use(Mint);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
