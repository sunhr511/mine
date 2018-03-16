
import axios from '../index'
export const GoodscountShow = data => {
  return axios.post('/Goodscount/show', data)
}
export const SettlementPpayShow = data => {
  return axios.post('Settlement/pay_show', data)
}
