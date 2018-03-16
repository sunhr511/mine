import axios from '../index'

export const OrderShow = data => {
  return axios.post('/Order/show', data).then().catch()
}
export const OrderDel = data => {
  return axios.post('/Order/del', data).then().catch()
}
export const OrderEdit = data => {
  return axios.post('/Order/edit', data).then().catch()
}
export const OrderAllshow = data => {
  return axios.post('/Order/allshow', data).then().catch()
}
export const OrderPubedit = data => {
  return axios.post('/Order/pubedit', data).then().catch()
}
export const OrderMyorder = data => {
  return axios.post('/Order/myorder', data).then().catch()
}
export const OrderDistribution = data => {
  return axios.post('/Order/distribution', data).then().catch()
}
export const NetinfoNet = data => {
  return axios.post('/Netinfo/net', data).then().catch()
}
export const NetinfoNetin = data => {
  return axios.post('/Netinfo/netin', data).then().catch()
}
export const OrderDeldel = data => {
  return axios.post('/Order/deldel', data).then().catch()
}
export const OrderZhuanjie = data => {
  return axios.post('/Order/zhuanjie', data).then().catch()
}
