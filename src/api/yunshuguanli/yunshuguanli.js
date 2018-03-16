import axios from '../index'
export const BasesetTtransportMenuShow = data => {
  return axios.post('/Baseset/transport_menu_show', data)
}
