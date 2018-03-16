import axios from '../index'
export const OriginalShow = data => {
  return axios.post('/Original/show', data)
}
export const OriginalAdd = data => {
  return axios.post('/Original/add', data)
}
