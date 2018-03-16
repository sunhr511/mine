
import axios from '../index'

export const RemainingShow = data => {
  return axios.post('/Remaining/show', data)
}
