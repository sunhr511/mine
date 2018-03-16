import axios from './index'
// 左侧导航栏的show
export const IndexShow = data => {
  return axios.post('Authority/menu_show', data)
}
