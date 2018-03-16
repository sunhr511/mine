import axios from '../index'
export const StorageShow = data => {
  return axios.post('/Storage/show', data).then().catch()
}
// 派送
export const StorageSend = data => {
  return axios.post('/Storage/send', data).then().catch()
}
// 签收
export const StorageSign = data => {
  return axios.post('/Storage/sign', data).then().catch()
}
// 中转
export const StorageTransit = data => {
  return axios.post('/Storage/transit', data).then().catch()
}
// 中转同行资料
export const StoragePeerShow = data => {
  return axios.post('/Storage/peer_show', data).then().catch()
}
