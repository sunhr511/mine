import axios from '../index'
export const TransportShow = data => {
  return axios.post('/Transport/show', data).then().catch()
}
// 装车
export const TransportLoading = data => {
  return axios.post('/Transport/loading', data).then().catch()
}
// 发车
export const TransportStart = data => {
  return axios.post('/Transport/start', data).then().catch()
}
export const VehicleShow = data => {
  return axios.post('/Vehicle/show', data).then().catch()
}
export const Dirverdshow = data => {
  return axios.post('/Dirver/dshow', data).then().catch()
}
export const TransportStartShow = data => {
  return axios.post('/Transport/start_show', data).then().catch()
}
export const TransportUnload = data => {
  return axios.post('/Transport/unload', data).then().catch()
}
export const TransportLoadingShow = data => {
  return axios.post('/Transport/loading_show', data).then().catch()
}
export const NetinfoNet = data => {
  return axios.post('/Netinfo/net', data).then().catch()
}
export const VehicleCarshow = data => {
  return axios.post('/Vehicle/carshow', data).then().catch()
}
