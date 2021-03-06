// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './style/reset.css'
import './style/all.css'

import axios from './api'
// axios.defaults.baseURL = 'http://localhost:1661/'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
var i = 0
router.beforeEach((to,from, next)=>{
  let user = sessionStorage.getItem('user')
  console.log(++i)
  console.log(user)
  // next()
  if(user){
    next()
  }else{
    if(to.path === '/login'){
      next()
    }else{
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
