import axios from '../index'
export const VehicleShow = data => {
  return axios.post('/Vehicle/show', data)
}
export const VehicleAdd = data => {
  return axios.post('/Vehicle/add', data)
}
export const VehicleEdit = data => {
  return axios.post('/Vehicle/edit', data)
}
export const VehicleDel = data => {
  return axios.post('/Vehicle/del', data)
}
