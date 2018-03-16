import axios from '../index'
export const CostShow = data => {
  return axios.post('Cost/show', data)
}
export const CostEdit = data => {
  return axios.post('Cost/edit', data)
}
export const CostAdd = data => {
  return axios.post('Cost/add', data)
}
export const CostDel = data => {
  return axios.post('Cost/del', data)
}
