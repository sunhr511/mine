import axios from '../index'
export const StockShow = data => {
  return axios.post('/Stock/show', data).then().catch()
}
export const StockMenushow = data => {
  return axios.post('/Stock/menushow', data).then().catch()
}
export const StockStockshow = data => {
  return axios.post('/Stock/stockshow', data).then().catch()
}
