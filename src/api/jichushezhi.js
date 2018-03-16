import axios from './index'
// 基础设置二级导航（8个图标）
export const BasesetShow = data => {
  return axios.post('/Baseset/show', data)
}
// 公司主体信息设置显示
export const CominfoShow = data => {
  return axios.post('/Cominfo/show', data)
}
// 公司主体信息设置保存
export const CominfoEdit = data => {
  return axios.post('/Cominfo/edit', data)
}
