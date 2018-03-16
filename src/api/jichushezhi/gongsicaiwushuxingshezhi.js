import axios from '../index'

export const RelationsShow = data => {
  return axios.post('/Relations/show', data)
}
export const RelationsAdd = data => {
  return axios.post('/Relations/add', data)
}
export const RelationsEdit = data => {
  return axios.post('/Relations/edit', data)
}
export const RelationsDel = data => {
  return axios.post('/Relations/del', data)
}
export const RelationsSearch = data => {
  return axios.post('/Relations/search', data)
}
export const NetinfoNet = data => {
  return axios.post('Netinfo/net', data)
}
export const NetinfoNetin = data => {
  return axios.post('Netinfo/netin', data)
}

