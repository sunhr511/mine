import axios from '../index'
// 回单交接显示
export const ReceiptTransferShow = data => {
  return axios.post('/Receipt/transfer_show', data)
}
export const ReceiptTransferJiaojie = data => {
  return axios.post('/Receipt/transfer_jiaojie', data)
}
