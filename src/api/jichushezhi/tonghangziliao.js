import axios from '../index'
export const PeerShow = data => {
  return axios.post('Peer/show', data)
}
export const PeerEdit = data => {
  return axios.post('Peer/edit', data)
}
export const PeerDel = data => {
  return axios.post('Peer/del', data)
}
export const PeerSearch = data => {
  return axios.post('Peer/search', data)
}
export const PeerAdd = data => {
  return axios.post('Peer/add', data)
}
export const DictionaryShow = data => {
  return axios.post('Dictionary/show', data)
}
