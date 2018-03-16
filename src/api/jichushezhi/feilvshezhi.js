import axios from '../index'

export const ProgrammeShow = data => {
  return axios.post('Programme/show', data)
}
export const ProgrammeEdit = data => {
  return axios.post('Programme/edit', data)
}
export const ProgrammeAdd = data => {
  return axios.post('Programme/add', data)
}
export const ProgrammeDel = data => {
  return axios.post('Programme/del', data)
}
export const ProgrammeDefaultShow = data => {
  return axios.post('Programme/default_show', data)
}
export const ProgrammeDef = data => {
  return axios.post('Programme/def', data)
}
