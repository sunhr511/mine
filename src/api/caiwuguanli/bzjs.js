
import axios from '../index'

export const ExamineShow = data => {
  return axios.post('Examine/show', data)
}
export const ExamineEdit = data => {
  return axios.post('Examine/edit', data)
}
