import axios from '../index'

export const WeixinShow = data => {
  return axios.post('Weixin/show', data)
}
export const PayShow = data => {
  return axios.post('Pay/show', data)
}
export const WeixinIsPayed = data => {
  return axios.post('Weixin/is_payed', data)
}
