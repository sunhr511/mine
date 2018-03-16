import axios from '../index'

export const MessageShow = data => {
  return axios.post('Message/show', data)
}
export const MessageEdit = data => {
  return axios.post('Message/edit', data)
}
export const MespayShow = data => {
  return axios.post('Mespay/show', data)
}
export const MessageIsPayed = data => {
  return axios.post('Mespay/is_payed', data)
}
export const MespayMesnum = data => {
  return axios.post('Mespay/mesnum', data)
}
export const MespayRecord = data => {
  return axios.post('Mespay/record', data)
}
export const MespaySearch = data => {
  return axios.post('Mespay/search', data)
}
export const NetinfoNet = data => {
  return axios.post('Netinfo/net', data)
}
export const MespayDistribution = data => {
  return axios.post('Mespay/distribution', data)
}
