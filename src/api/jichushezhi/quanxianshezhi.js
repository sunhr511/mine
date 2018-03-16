import axios from '../index'

export const AuthorityPartShow = data => {
  return axios.post('Authority/part_show', data)
}
export const AuthorityShow = data => {
  return axios.post('Authority/show', data)
}
export const AuthorityAdd = data => {
  return axios.post('Authority/add', data)
}
export const AuthorityDel = data => {
  return axios.post('Authority/del', data)
}
export const AuthorityEdit = data => {
  return axios.post('Authority/edit', data)
}
export const AuthorityAddShow = data => {
  return axios.post('Authority/add_show', data)
}
