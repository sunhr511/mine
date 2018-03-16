
import axios from '../index'
// 显示
export const ExpenditureShow = data => {
  return axios.post('Expenditure/show', data)
}
// 增加
export const ExpenditureAdd = data => {
  return axios.post('Expenditure/add', data)
}
// 编辑
export const ExpenditureEdit = data => {
  return axios.post('Expenditure/edit', data)
}
// 删除
export const ExpenditureDel = data => {
  return axios.post('Expenditure/del', data)
}
export const ExpenditureShenhe = data => {
  return axios.post('Expenditure/shenhe', data)
}
export const ExpenditureNetShow = data => {
  return axios.post('Expenditure/net_show', data)
}
export const DictionaryShow = data => {
  return axios.post('Dictionary/show   ', data)
}

