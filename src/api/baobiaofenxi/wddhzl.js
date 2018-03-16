
import axios from '../index'

export const RetentionShow = data => {
  return axios.post('/Retention/show', data)
}
