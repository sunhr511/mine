
import axios from '../index'

export const BasesetFinanceMenuShow = data => {
  return axios.post('Baseset/finance_menu_show', data)
}
