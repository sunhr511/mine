
import axios from '../index'

export const LoandetailShow = data => {
  return axios.post('/Loandetail/show', data)
}
