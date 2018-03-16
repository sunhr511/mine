import axios from './index'

/**
 *
 *
 * @example
 * import {test} from "xxxxxxx.js"
 * let params = {xxx:'xxx'}
 * test(params).then((res) =>{
 * },(error) =>{
 * })
 *
 */
export const login = data => {
  return axios.post('/login/verify', data)
}
export const shenqing = data => {
  return axios.post('/Apply/add', data)
}
export const OpinionShow = data => {
  return axios.post('/Opinion/show', data)
}
export const OpinionAdd = data => {
  return axios.post('/Opinion/add', data)
}
export const OpinionSmsCode = data => {
  return axios.post('/Opinion/sms_code', data)
}
export const LoginSmsCodes = data => {
  return axios.post('/Login/sms_codes', data)
}
export const LoginYanzheng = data => {
  return axios.post('/Login/yanzheng', data)
}
export const LoginEditpassword = data => {
  return axios.post('Login/editpassword', data)
}
