/*
 *----------------------------
 * 根mutations
 *----------------------------
 * @author 梁国乾
 * @date 2017/06/27
 *
 */

// mutations
import * as types from './mutation-types.js'
const mutations = {
  [types.LOGIN]: (state, data) => {
    sessionStorage.token = data
    state.token = data
  },
  [types.LOGOUT]: (state) => {
    sessionStorage.removeItem('token')
    state.token = null
  }
}
export default {
  mutations
}
