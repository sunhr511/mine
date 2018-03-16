import axios from '../index'
export const BasesetOperateMenuShow = data => {
  return axios.post('/Baseset/operate_menu_show', data).then().catch()
}
