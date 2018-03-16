import axios from '../index'
export const RecordSendShow = data => {
  return axios.post('/Record/send_show', data)
}
