// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/index'
import ElementUI from 'element-ui'
import store from './store/store'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
// import pub from './pub'
Vue.config.productionTip = false

// Vue.config.devtools = false

Vue.use(ElementUI)
Vue.use(echarts)
// Vue.use(pub)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
