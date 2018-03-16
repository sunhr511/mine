
import axios from '../index'

export const PaymentShow = data => {
  return axios.post('Payment/show', data)
}
export const PaymentContractShow = data => {
  return axios.post('Payment/contract_show', data)
}
export const PaymentCashloan = data => {
  return axios.post('Payment/cashloan', data)
}
export const PaymentLoan = data => {
  return axios.post('Payment/loan', data)
}

