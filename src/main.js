// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import cookie from 'vue-cookie'
import MyMethods from './plugins/myMethods.js'
Vue.prototype.$cookie = cookie;
axios.defaults.baseURL = 'http://119.3.167.84:8090'
//axios.defaults.baseURL = 'http://localhost:8090'
axios.defaults.baseURL = 'http://117.78.2.224:8090'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.baseURL="http://119.3.167.84:8090"
//Vue.prototype.baseURL = 'http://localhost:8090'
Vue.prototype.baseURL = 'http://117.78.2.224:8090'
Vue.prototype.chatBaseURL = '119.3.167.84:8090'
//Vue.prototype.chatBaseURL = '127.0.0.1:8090'
Vue.prototype.chatBaseURL = '117.78.2.224:8090'
/* eslint-disable no-new */

Vue.prototype.myMethods=MyMethods
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
