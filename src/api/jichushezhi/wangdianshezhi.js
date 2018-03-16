import axios from '../index'
// 基础设置二级导航（8个图标）
export const NetinfoShow = data => {
  return axios.post('Netinfo/show', data)
}
export const NetinfoEdit = data => {
  return axios.post('Netinfo/edit', data)
}
export const NetinfotAdd = data => {
  return axios.post('Netinfo/add', data)
}
export const NetinfotDel = data => {
  return axios.post('Netinfo/del', data)
}
export const NetinfotSearch = data => {
  return axios.post('Netinfo/search', data)
}
export const NetinfoNet = data => {
  return axios.post('Netinfo/net', data)
}
export const DictionaryShow = data => {
  return axios.post('Dictionary/show ', data)
}
export const LoginAaa = data => {
  return axios.post('Login/aaa ', data)
}
export const LoginBbb = data => {
  return axios.post('Login/bbb ', data)
}
