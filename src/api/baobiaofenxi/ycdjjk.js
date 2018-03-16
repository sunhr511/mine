
import axios from '../index'

export const AbnormalcountShow = data => {
  return axios.post('/Abnormalcount/show', data)
}
