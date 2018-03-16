import axios from '../index'
export const MaintainShow = data => {
  return axios.post('Maintain/show', data)
}
export const MaintainEdit = data => {
  return axios.post('Maintain/edit', data)
}
export const MaintainRecovery = data => {
  return axios.post('Maintain/recovery', data)
}
