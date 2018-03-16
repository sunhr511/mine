import axios from '../index'
export const ReceiptSignShow = data => {
  return axios.post('/Receipt/sign_show', data).then().catch()
}
export const ReceiptSignAdd = data => {
  return axios.post('/Receipt/sign_add', data).then().catch()
}
