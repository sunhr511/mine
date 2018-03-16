import axios from '../index'

export const PrintsShow = data => {
  return axios.post('/Prints/show', data)
}
export const PrintsEdit = data => {
  return axios.post('/Prints/edit', data)
}
