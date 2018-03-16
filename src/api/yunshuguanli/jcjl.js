import axios from '../index'
export const RecordPickShow = data => {
  return axios.post('/Record/pick_show', data)
}
export const RecordPicGoodsShow = data => {
  return axios.post('/Record/pick_goods_show', data)
}
