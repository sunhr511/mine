import axios from '../index'
export const AbnormalShow = data => {
  return axios.post('Abnormal/show', data)
}
export const AbnormalEdit = data => {
  return axios.post('Abnormal/edit', data)
}
