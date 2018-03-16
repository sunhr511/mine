import axios from './index'

export const loginloginout = data => {
  return axios.post('Login/login_out', data)
}
