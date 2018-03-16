import axios from './index'

export const cominfologinshow = data => {
  return axios.post('/Cominfo/login_show', data)
}
export const payamount = data => {
  return axios.post('/Pay/amount', data)
}
