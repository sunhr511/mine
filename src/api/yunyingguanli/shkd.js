import axios from '../index'
export const RecorderShow = data => {
  return axios.post('/Recorder/show', data)
}
export const RecorderAdd = data => {
  return axios.post('/Recorder/add', data)
}
export const RecorderEdit = data => {
  return axios.post('/Recorder/edit', data)
}
export const RecorderDel = data => {
  return axios.post('/Recorder/del', data)
}
export const NetInfoNet = data => {
  return axios.post('/Netinfo/net', data)
}
export const DictionaryShow = data => {
  return axios.post('/Dictionary/show', data)
}
export const ProgrammeShow = data => {
  return axios.post('/Programme/show', data)
}
export const ProgrammeXianshi = data => {
  return axios.post('Programme/xianshi', data)
}
export const CominfoShow = data => {
  return axios.post('Cominfo/show', data)
}
export const NetinfoNetin = data => {
  return axios.post('netinfo/netin', data)
}
export const RecorderTel = data => {
  return axios.post('Recorder/tel', data)
}
