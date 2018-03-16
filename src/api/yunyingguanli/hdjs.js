import axios from '../index'
// 回单结算
export const ReceiptTransferJiesuanShow = data => {
  return axios.post('/Receipt/transfer_jiesuanshow', data)
}
export const ReceiptTransferJiesuan = data => {
  return axios.post('/Receipt/transfer_jiesuan', data)
}

