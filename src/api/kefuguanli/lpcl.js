import axios from '../index'
// 理赔申请显示
export const CompensateApplyShow = data => {
  return axios.post('Compensate/apply_show', data)
}
// 理赔受理显示
export const CompensateAcceptanceShow = data => {
  return axios.post('Compensate/acceptance_show', data)
}
// 添加理赔申请
export const CompensateApplyAdd = data => {
  return axios.post('Compensate/apply_add', data)
}
// 理赔受理
export const CompensateAcceptance = data => {
  return axios.post('Compensate/acceptance', data)
}
export const CompensatePeifu = data => {
  return axios.post('Compensate/peifu', data)
}
export const CompensateDel = data => {
  return axios.post('Compensate/del', data)
}
