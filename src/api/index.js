import {devUrl} from '../config/index'
import store from '../store/store'
import * as types from '../store/mutation-types'
import router from '../router/index'
import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'

const BASE = devUrl
axios.defaults.baseURL = BASE
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 300000

axios.interceptors.request.use(
    config => {
      if (store.state.token) {
        config.headers.Authorization = `${store.state.token}`
        config.headers.loginID = `${store.state.loginID}`
        // axios.defaults.headers.common['Authorization'] = `${store.state.token}`
        // axios.defaults.headers.common['loginID'] = `${store.state.loginID}`
      }
      if (config.method === 'post') {
        config.data = Qs.stringify(config.data)
      }
      return config
    },
    err => {
      Message.error({
        showClose: true,
        message: '网络连接超时'
      })
      return Promise.reject(err)
    })

// http response 拦截器
axios.interceptors.response.use(
    response => {
      if (response) {
        switch (response.headers.status) {
          case '401':
            if (sessionStorage.getItem('token')) {
              alert('该账号在其他地方登陆请重新登录')
            }
                    // 401 清除token信息并跳转到登录页面
            store.commit(types.LOGOUT)
            router.replace({
              path: '/',
              query: {redirect: router.currentRoute.fullPath}
            })
        }
      }
      return response
    },
    error => {
      Message.error({
        showClose: true,
        message: '网络连接超时'
      })
      // console.log(JSON.stringify(error))// console : Error: Request failed with status code 402
      return Promise.reject(error)
    })
export default axios
