
import axios from '../index'
// 基础设置二级导航（8个图标）
export const RevenuecountShow = data => {
  return axios.post('/Revenuecount/show', data)
}
