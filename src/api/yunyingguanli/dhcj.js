import axios from '../index'
export const DeliveryShow = data => {
  return axios.post('/Delivery/show', data).then().catch()
}
// 筛选入库
export const DeliveryGoodShow = data => {
  return axios.post('/Delivery/goods_show', data).then().catch()
}
export const DeliveryStorage = data => {
  return axios.post('/Delivery/storage', data).then().catch()
}
export const DeliveryShaixuan = data => {
  return axios.post('/Delivery/shaixuan', data).then().catch()
}
export const DeliveryQuanbu = data => {
  return axios.post('/Delivery/quanbu', data).then().catch()
}
