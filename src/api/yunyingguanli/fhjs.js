import axios from '../index'
export const SettlementShow = data => {
  return axios.post('/Settlement/show', data).then().catch()
}
export const SettlementEdit = data => {
  return axios.post('/Settlement/Edit', data).then().catch()
}
export const SettlementCustom = data => {
  return axios.post('/Settlement/custom', data).then().catch()
}
export const SettlementCusadd = data => {
  return axios.post('/Settlement/cusadd', data).then().catch()
}
export const RecorderDel = data => {
  return axios.post('/Recorder/del', data).then().catch()
}
export const SettlementJiesuan = data => {
  return axios.post('/Settlement/jiesuan', data).then().catch()
}
