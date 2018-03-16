
import axios from '../index'

export const ReceiptcountShow = data => {
  return axios.post('/Receiptcount/show', data)
}
