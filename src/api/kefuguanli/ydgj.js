import axios from '../index'
export const ContrailShow = data => {
  return axios.post('Contrail/show', data)
}
export const ContrailOrderInfo = data => {
  return axios.post('Contrail/order_info', data)
}
export const MaintainRecovery = data => {
  return axios.post('Maintain/recovery', data)
}
