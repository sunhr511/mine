import axios from '../index'

export const CustomerShow = data => {
  return axios.post('Customer/show', data)
}
export const CustomerEdit = data => {
  return axios.post('Customer/edit', data)
}
export const CustomerAdd = data => {
  return axios.post('Customer/add', data)
}
export const CustomerDel = data => {
  return axios.post('Customer/del', data)
}
export const CustomerSearch = data => {
  return axios.post('Customer/search', data)
}
export const DictionaryShow = data => {
  return axios.post('Dictionary/show', data)
}
export const NetinfoNet = data => {
  return axios.post('Netinfo/net', data)
}
export const NetinfoNetin = data => {
  return axios.post('Netinfo/netin', data)
}
export const ProgrammeXianshi = data => {
  return axios.post('Programme/xianshi', data)
}
