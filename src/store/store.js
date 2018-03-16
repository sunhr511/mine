import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: null,
    loginID: null,
    banlance: '',
    yueShow: '',
    topIndex: 0,
    Datasa: 1,
    disa: true,
    linkage: []
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      sessionStorage.token = data
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('loginID')
      state.token = null
      state.login = null
    },
    [types.LOGINID]: (state, data) => {
      sessionStorage.loginID = data
      state.loginID = data
    }
  }
})
