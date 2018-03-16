import axios from './index'
export const StaffinfoShow = data => {
  return axios.post('Staffinfo/show', data)
}
export const StaffinfoSearch = data => {
  return axios.post('Staffinfo/search', data)
}
export const StaffinfoEdit = data => {
  return axios.post('Staffinfo/edit', data)
}
export const StaffinfoAdd = data => {
  return axios.post('Staffinfo/add', data)
}
export const StaffinfoDel = data => {
  return axios.post('Staffinfo/Del', data)
}
