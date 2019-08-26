import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios;
import '@/icons/index.js'
import moment from 'moment'
Vue.filter('time' , function(value, formatString){
  formatString = formatString || 'YYYY年MM月DD日';
  let ctime = moment(value).format(formatString) ;
  
  return ctime
})
Vue.filter('timer' , function(value, formatString){
  formatString = formatString || 'YYYY-MM-DD';
  let ctime = moment(value).format(formatString) ;
  
  return ctime
})
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
