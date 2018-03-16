
import axios from '../index'

export const LoansummaryShow = data => {
  return axios.post('/Loansummary/show', data)
}
