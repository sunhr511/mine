import axios from '../index'
export const BasesetCustomserviceMenuShow = data => {
  return axios.post('Baseset/customservice_menu_show', data)
}
