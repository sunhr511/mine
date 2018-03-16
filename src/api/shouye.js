import axios from './index'

export const MainTodayShow = data => {
  return axios.post('/Main/today_show', data)
}
export const MainShow = data => {
  return axios.post('/Main/show', data)
}
