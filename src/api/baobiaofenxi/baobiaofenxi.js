
import axios from '../index'

export const BasesetReportMenuShow = data => {
  return axios.post('/Baseset/report_menu_show', data)
}
export const SettlementCustom = data => {
  return axios.post('/Settlement/custom', data)
}
export const SettlementCusadd = data => {
  return axios.post('/Settlement/cusadd', data)
}
