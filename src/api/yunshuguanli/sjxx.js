import axios from '../index'
export const DirverShow = data => {
  return axios.post('/Dirver/show', data)
}
export const DirverAdd = data => {
  return axios.post('/Dirver/add', data)
}
export const DirverEdit = data => {
  return axios.post('/Dirver/edit', data)
}
export const DirverDel = data => {
  return axios.post('/Dirver/del', data)
}
